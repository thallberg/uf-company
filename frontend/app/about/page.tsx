import { Hero } from "@/components/layout/hero/Hero";
import { AboutHero } from "@/content/hero/Hero.content";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 mt-10 px-4 max-w-3xl">
      <Hero {...AboutHero} />
    </div>
  );
}
