import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getVehicleBySlug, getVehicles } from "@/lib/data";
import VehicleHero from "@/components/vehicle/VehicleHero";
import OverviewSection from "@/components/vehicle/OverviewSection";
import StorySection from "@/components/vehicle/StorySection";
import GallerySection from "@/components/vehicle/GallerySection";
import DocumentsSection from "@/components/vehicle/DocumentsSection";
import OwnershipTimeline from "@/components/vehicle/OwnershipTimeline";
import TechSpecsSection from "@/components/vehicle/TechSpecsSection";
import HeritageSection from "@/components/vehicle/HeritageSection";
import PartsSection from "@/components/vehicle/PartsSection";
import HistorySection from "@/components/vehicle/HistorySection";
import EngineSoundSection from "@/components/vehicle/EngineSoundSection";

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const description = `${title} — ${vehicle.engine}, ${vehicle.color}. Part of The Lara Collection.`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} — The Lara Collection`,
      description,
      type: "article",
      ...(vehicle.heroImageUrl && { images: [vehicle.heroImageUrl] }),
    },
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    color: vehicle.color,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "SMI",
    },
    bodyType: vehicle.bodyStyle,
    driveWheelConfiguration: vehicle.drivetrain,
    vehicleEngine: {
      "@type": "EngineSpecification",
      name: vehicle.engine,
    },
    ...(vehicle.vin && { vehicleIdentificationNumber: vehicle.vin }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
      <VehicleHero vehicle={vehicle} />
      <OverviewSection vehicle={vehicle} />
      <EngineSoundSection
        soundUrl={vehicle.engineSoundUrl}
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      />
      <StorySection story={vehicle.story} />
      <HeritageSection heritage={vehicle.heritage} model={vehicle.model} />
      <PartsSection parts={vehicle.parts} />
      <GallerySection images={vehicle.images} />
      <HistorySection vehicle={vehicle} />
      <DocumentsSection documents={vehicle.documents} />
      <OwnershipTimeline events={vehicle.ownershipHistory} />
      <TechSpecsSection vehicle={vehicle} />

      <div className="mx-auto flex max-w-7xl justify-center px-6 py-16">
        <Link href={`/brands/${vehicle.brand}`} className="ghost-button">
          ← Back to {vehicle.make}
        </Link>
      </div>
    </>
  );
}
