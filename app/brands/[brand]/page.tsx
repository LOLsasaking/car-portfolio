import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBrand, getVehiclesByBrand } from "@/lib/data";
import { BRANDS } from "@/lib/seed-data";
import type { BrandSlug } from "@/lib/types";
import VehicleCard from "@/components/VehicleCard";
import Reveal from "@/components/motion/Reveal";

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} Collection`,
    description: brand.description,
    openGraph: {
      title: `${brand.name} — The Lara Collection`,
      description: brand.description,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const vehicles = await getVehiclesByBrand(slug as BrandSlug);
  const years = vehicles.map((v) => v.year);
  const range =
    years.length > 1
      ? `${Math.min(...years)} — ${Math.max(...years)}`
      : String(years[0] ?? "");

  return (
    <div className="pt-24">
      {/* Brand hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 text-center lg:px-10 lg:py-28">
          <Reveal>
            <Image
              src={`/images/brands/${brand.slug}-logo.png`}
              alt={`${brand.name} emblem`}
              width={280}
              height={160}
              className="mx-auto h-28 w-auto object-contain md:h-36"
              priority
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow">{range}</p>
            <h1 className="heading-xl mt-4 text-bone">{brand.name}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-bone/60 md:text-base">
              {brand.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="mb-12 flex items-end justify-between">
          <p className="eyebrow">
            {vehicles.length}{" "}
            {vehicles.length === 1 ? "Automobile" : "Automobiles"}
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
