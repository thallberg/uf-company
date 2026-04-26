import { InfoSection } from "@/components/features/info/InfoSection";
import { ImageOverlayCard } from "@/components/features/image-overlay-card/ImageOverlayCard";
import { Items } from "@/components/features/item/Items";
import { Section } from "@/components/features/section/Section";
import { ProductGrid } from "@/components/features/product/ProductGrid";
import { Hero } from "@/components/layout/hero/Hero";
import { aboutSectionContent } from "@/content/about/About.section.data";
import { howItWorksContent } from "@/content/how-it-works/HowItWorks.data";
import { MainHero } from "@/content/hero/Hero.content";
import { productShowcaseContent } from "@/content/product-showcase/ProductShowcase.content";
import { storeBenefitsContent } from "@/content/store-benefits/StoreBenefits.content";

export default function Home() {
  return (
    <div className="">
      <Hero {...MainHero} />

      <div className="grid lg:grid-cols-2">
        <Section
          className="bg-brand-yellow-solid py-8 flex items-center justify-center"
          {...aboutSectionContent}
        />

        <div className="bg-brand-green-solid flex items-center justify-center">
          <Items
            {...productShowcaseContent}
            className="py-8 max-w-md mx-auto"
          />
        </div>
      </div>

      <ProductGrid limit={4} className="max-w-[95vw] py-8 mx-auto" />

      <div className="grid lg:grid-cols-2">
        <InfoSection
          {...howItWorksContent}
          className="bg-brand-yellow-solid py-8"
        />

        <div className="bg-brand-green-solid flex">
          <Items
            items={storeBenefitsContent.items}
            className="mx-auto self-center"
            itemsClassName="py-14 lg:py-0 lg:grid lg:grid-cols-2 lg:mx-auto lg:max-w-md lg:gap-1 lg:divide-y-0"
          />
        </div>
      </div>

      <ImageOverlayCard
        className=""
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
