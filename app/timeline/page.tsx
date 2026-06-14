import type { Metadata } from "next";
import { getVehicles } from "@/lib/data";
import TimelineExplorer from "@/components/timeline/TimelineExplorer";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Collection Timeline",
  description:
    "The Lara Collection in chronological order — every automobile from 1958 to 2024.",
};

export default async function TimelinePage() {
  const vehicles = await getVehicles();
  const years = vehicles.map((v) => v.year);

  return (
    <div className="pt-32">
      <header className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <Reveal>
          <p className="eyebrow">
            {Math.min(...years)} — {Math.max(...years)}
          </p>
          <h1 className="heading-xl mt-4 text-bone">The Timeline</h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-bone/60 md:text-base">
            Every automobile in the collection, in the order history delivered
            them. Scroll to travel six decades.
          </p>
        </Reveal>
      </header>

      <TimelineExplorer vehicles={vehicles} />
    </div>
  );
}
