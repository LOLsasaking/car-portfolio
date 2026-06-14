import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { cloudinaryConfigured, getCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const maxDuration = 60;

interface ExtractedVehicleData {
  vin: string | null;
  mileage: number | null;
  auctionResults: string | null;
  vehicleHistory: string | null;
  ownershipInformation: string | null;
  purchaseInformation: string | null;
  vehicleDescription: string | null;
}

/**
 * AI document pipeline:
 * 1. Receives a PDF (multipart) with vehicleId / title / category.
 * 2. Extracts raw text (pdf-parse) — this becomes the searchable index.
 * 3. Claude extracts structured fields; regex fallback when no API key.
 * 4. Uploads the PDF to Cloudinary and stores everything in Supabase.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File | null;
  const vehicleId = String(form.get("vehicleId") ?? "");
  const title = String(form.get("title") ?? "Document");
  const category = String(form.get("category") ?? "other");

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json({ error: "A PDF file is required." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // 1 — raw text for search
  let text = "";
  try {
    const pdfParse = (await import("pdf-parse")).default;
    const parsed = await pdfParse(buffer);
    text = (parsed.text ?? "").trim();
  } catch {
    text = "";
  }

  // 2 — structured extraction
  const extracted = process.env.ANTHROPIC_API_KEY
    ? await extractWithClaude(text)
    : extractWithRegex(text);

  // 3 — persist the PDF
  let url: string | null = null;
  if (cloudinaryConfigured()) {
    try {
      const cld = getCloudinary();
      const upload = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cld.uploader
            .upload_stream(
              {
                resource_type: "raw",
                folder: "lara-collection/documents",
                format: "pdf",
              },
              (err, result) => (err || !result ? reject(err) : resolve(result))
            )
            .end(buffer);
        }
      );
      url = upload.secure_url;
    } catch {
      url = null;
    }
  }

  // 4 — store in DB
  const supabase = getSupabaseServer();
  let stored = false;
  if (supabase && vehicleId && url) {
    const { error } = await supabase.from("vehicle_documents").insert({
      vehicle_id: vehicleId,
      url,
      title,
      category,
      extracted_data: extracted,
      search_text: text.slice(0, 100_000),
    });
    stored = !error;

    // Promote high-confidence fields onto the vehicle record itself.
    const updates: Record<string, unknown> = {};
    if (extracted.vin) updates.vin = extracted.vin;
    if (extracted.mileage) updates.mileage = extracted.mileage;
    if (Object.keys(updates).length > 0) {
      await supabase.from("vehicles").update(updates).eq("id", vehicleId);
    }
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ url, extracted, stored, textLength: text.length });
}

async function extractWithClaude(text: string): Promise<ExtractedVehicleData> {
  if (!text) return emptyExtraction();
  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Extract vehicle information from this document text. Respond with ONLY a JSON object with these keys (null when absent): "vin" (string), "mileage" (number, miles), "auctionResults" (string summary), "vehicleHistory" (string summary), "ownershipInformation" (string summary), "purchaseInformation" (string summary), "vehicleDescription" (string summary).\n\nDocument text:\n${text.slice(0, 30_000)}`,
        },
      ],
    });
    const raw =
      message.content[0].type === "text" ? message.content[0].text : "{}";
    const json = raw.replace(/^```(json)?/m, "").replace(/```$/m, "").trim();
    return { ...emptyExtraction(), ...JSON.parse(json) };
  } catch {
    return extractWithRegex(text);
  }
}

/** Offline fallback — finds VINs and odometer readings without an LLM. */
function extractWithRegex(text: string): ExtractedVehicleData {
  const result = emptyExtraction();
  if (!text) return result;

  // 17-char modern VIN (no I/O/Q); also accept shorter pre-1981 chassis numbers after "VIN"/"Chassis"
  const vinModern = text.match(/\b[A-HJ-NPR-Z0-9]{17}\b/);
  const vinLabeled = text.match(/(?:VIN|Chassis(?:\s*(?:No|Number))?)[:\s#]*([A-HJ-NPR-Z0-9-]{6,17})/i);
  result.vin = vinModern?.[0] ?? vinLabeled?.[1] ?? null;

  const mileage = text.match(/([\d,]{4,9})\s*(?:miles|mi\b|odometer)/i);
  if (mileage) {
    const n = parseInt(mileage[1].replace(/,/g, ""), 10);
    if (Number.isFinite(n) && n > 0 && n < 1_000_000) result.mileage = n;
  }

  const sold = text.match(/(?:sold|hammer|winning bid|sale price)[^.\n]{0,80}\$[\d,]+/i);
  if (sold) result.auctionResults = sold[0].trim();

  return result;
}

function emptyExtraction(): ExtractedVehicleData {
  return {
    vin: null,
    mileage: null,
    auctionResults: null,
    vehicleHistory: null,
    ownershipInformation: null,
    purchaseInformation: null,
    vehicleDescription: null,
  };
}
