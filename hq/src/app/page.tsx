import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { GovernmentHighlight } from "@/components/sections/government-highlight";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <GovernmentHighlight />
    </>
  );
}
