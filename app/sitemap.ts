import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/data";
import { BRANDS } from "@/lib/seed-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lara-collection.vercel.app";
  const vehicles = await getVehicles();

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/timeline`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.8 },
    ...BRANDS.map((b) => ({
      url: `${base}/brands/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...vehicles.map((v) => ({
      url: `${base}/vehicles/${v.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
