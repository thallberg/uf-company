"use client";

import { howItWorksData } from "@/content/how-it-works/HowItWorks.data";
import { HowItWorksCard } from "./HowItWorksCard";

export function HowItWorksSection() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        
        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-2xl text-brand-green md:text-3xl font-semibold mb-2">
            Så fungerar det
          </h2>
          <p className="text-primary text-sm mb-4">
            Enkelt, lokalt och hållbart
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          {howItWorksData.map((item, index) => (
            <HowItWorksCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}