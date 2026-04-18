import { AboutSection } from "@/components/features/about/AboutSection";
import { HowItWorksSection } from "@/components/features/how-it-works/HowItWorksSection";
import { ImageOverlayCard } from "@/components/features/image-overlay-card/ImageOverlayCard";
import { Item } from "@/components/features/item/Items";
import { ProductGrid } from "@/components/features/product/ProductGrid";
import { Hero } from "@/components/layout/hero/Hero";
import { aboutSectionContent } from "@/content/about/About.section.data";

export default function Home() {
  return (
    <div className="">
      <div className="mt-24 max-w-[90vw] mx-auto">
        <Hero />
      </div>
      <div className="bg-brand-green/20 mt-10">
        <AboutSection {...aboutSectionContent} />
      </div>
      <div className="mt-12">
        <ProductGrid />
      </div>
      <div className="bg-brand-green/20 mt-10">
        <HowItWorksSection />
      </div>
      <div className="py-10 max-w-[90vw] mx-auto">
        <Item />
      </div>
      <div className="pb-8">
        <ImageOverlayCard
          image="/hero/hero-1.jpg"
          title="Lokala råvaror"
          description="Från gård till bord"
          badge="Nyhet"
          badgePosition="top-4 right-2"
          contentPosition="bottom-6 left-6"
          avatar={{
            fallback: "UF",
          }}
          avatarPosition="bottom-6 right-6"
        />
      </div>
    </div>
  );
}
