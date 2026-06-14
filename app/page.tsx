import Hero from "@/components/home/Hero";
import BrandShowcase from "@/components/home/BrandShowcase";
import StatsSection from "@/components/home/StatsSection";
import AppreciationSection from "@/components/home/AppreciationSection";
import TimelinePreview from "@/components/home/TimelinePreview";
import ScrollFade from "@/components/motion/ScrollFade";
import { getBrands, getStats, getVehicles } from "@/lib/data";
import { HERO_VIDEO_URL } from "@/lib/seed-data";

export default async function HomePage() {
  const [vehicles, stats, brands] = await Promise.all([
    getVehicles(),
    getStats(),
    getBrands(),
  ]);

  return (
    <>
      <Hero videoUrl={HERO_VIDEO_URL} />
      <ScrollFade>
        <BrandShowcase brands={brands} vehicles={vehicles} />
      </ScrollFade>
      <ScrollFade>
        <StatsSection stats={stats} />
      </ScrollFade>
      <ScrollFade>
        <AppreciationSection vehicles={vehicles} />
      </ScrollFade>
      <ScrollFade scale>
        <TimelinePreview vehicles={vehicles} />
      </ScrollFade>
    </>
  );
}
