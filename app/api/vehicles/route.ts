import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { vehicleToRow } from "@/lib/vehicle-mapping";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured. Set the env vars to enable writes." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const row = vehicleToRow(body);
  if (!row.year || !row.make || !row.model) {
    return NextResponse.json(
      { error: "year, make and model are required." },
      { status: 400 }
    );
  }
  if (!row.slug) {
    row.slug = slugify(`${row.year} ${row.make} ${row.model}`);
  }

  const { data, error } = await supabase
    .from("vehicles")
    .insert(row)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ vehicle: data }, { status: 201 });
}
