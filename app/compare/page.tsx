import type { Metadata } from "next";
import { getVehicles } from "@/lib/data";
import CompareExplorer from "@/components/compare/CompareExplorer";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "Line up any two or three vehicles from The Lara Collection — horsepower, 0–60, top speed, value, and more, side by side.",
};

export default async function ComparePage() {
  const vehicles = await getVehicles();

  return (
    <main className="pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">Head to Head</p>
        <h1 className="heading-lg mt-4 text-bone">Compare the Collection</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/60">
          Sixty-six years of engineering, side by side. Pick two or three cars
          and see exactly how a 1958 roadster measures against a modern
          turbocharged flagship.
        </p>
      </div>
      <CompareExplorer vehicles={vehicles} />
    </main>
  );
}
