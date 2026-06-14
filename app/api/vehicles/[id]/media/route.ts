import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

const TABLES: Record<string, string> = {
  image: "vehicle_images",
  video: "vehicle_videos",
  document: "vehicle_documents",
  service: "vehicle_service_records",
  ownership: "vehicle_ownership_history",
};

/** Adds a related media/history row to a vehicle. Body: { kind, data }. */
export async function POST(request: Request, { params }: Params) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const { kind, data } = await request.json();
  const table = TABLES[kind];
  if (!table) {
    return NextResponse.json({ error: `Unknown kind: ${kind}` }, { status: 400 });
  }

  const { data: row, error } = await supabase
    .from(table)
    .insert({ ...data, vehicle_id: id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ row }, { status: 201 });
}

/** Removes a related row. Body: { kind, rowId }. */
export async function DELETE(request: Request, { params }: Params) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const { kind, rowId } = await request.json();
  const table = TABLES[kind];
  if (!table) {
    return NextResponse.json({ error: `Unknown kind: ${kind}` }, { status: 400 });
  }

  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", rowId)
    .eq("vehicle_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
