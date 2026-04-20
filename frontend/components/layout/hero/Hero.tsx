"use client";

import Image from "next/image";
import { HeroProps } from "./types/Hero.props";
import { cn } from "@/lib/utils";

export function Hero({ title, description, images, className }: HeroProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 auto-rows-fr gap-3 h-50 md:h-62.5 lg:h-87.5">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative rounded-xl overflow-hidden ${
                  index === 0 && images.length > 2 ? "row-span-2" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} bild ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 max-w-[60vw] m-auto h-full justify-center">
            <h2 className="text-2xl text-brand-green md:text-4xl font-semibold leading-tight">
              {title}
            </h2>

            <p className="text-primary text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
