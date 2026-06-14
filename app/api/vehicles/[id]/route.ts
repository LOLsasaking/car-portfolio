import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { vehicleToRow } from "@/lib/vehicle-mapping";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const body = await request.json();
  const row = vehicleToRow(body);

  const { data, error } = await supabase
    .from("vehicles")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ vehicle: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
