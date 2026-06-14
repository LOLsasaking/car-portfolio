import { NextResponse } from "next/server";
import { cloudinaryConfigured, signUpload } from "@/lib/cloudinary";

/** Returns a short-lived signature for a direct browser → Cloudinary upload. */
export async function POST(request: Request) {
  if (!cloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Paste a URL instead." },
      { status: 503 }
    );
  }
  const { folder = "lara-collection" } = await request.json().catch(() => ({}));
  return NextResponse.json(signUpload(folder));
}
