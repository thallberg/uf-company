import { InfoSection } from "@/components/features/info/InfoSection";
import { ImageOverlayCard } from "@/components/features/image-overlay-card/ImageOverlayCard";
import { Items } from "@/components/features/item/Items";
import { Section } from "@/components/Section";
import { ProductGrid } from "@/components/features/product/ProductGrid";
import { Hero } from "@/components/layout/hero/Hero";
import { aboutSectionContent } from "@/content/about/About.section.data";
import { howItWorksContent } from "@/content/how-it-works/HowItWorks.data";
import { MainHero } from "@/content/hero/Hero.content";
import { productShowcaseContent } from "@/content/product-showcase/ProductShowcase.content";
import { storeBenefitsContent } from "@/content/store-benefits/StoreBenefits.content";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero className="mt-24" {...MainHero} />

      <Section className="bg-brand-green/20 py-8" {...aboutSectionContent} />

      <div className="bg-brand-yellow/20 flex justify-center">
        <Items {...productShowcaseContent} className="py-8 max-w-md mx-auto" />
      </div>
      <ProductGrid limit={4} className="max-w-[95vw] py-8 mx-auto" />

      <InfoSection {...howItWorksContent} className="bg-brand-green/20 py-8" />

      <Items items={storeBenefitsContent.items} className="max-w-[80vw] mx-auto" />

      <ImageOverlayCard
        className="mb-8"
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
  );
}
