"use client";

import Image from "next/image";
import { HeroProps } from "./types/Hero.props";
import { cn } from "@/lib/utils";

export function Hero({ title, description, images, className }: HeroProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="grid md:grid-cols-2">
        <div className="grid grid-cols-2 auto-rows-fr gap-3 min-h-[40vh] md:min-h-[65vh] lg:min-h-[60vh]">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`relative overflow-hidden ${index === 0 && images.length > 2 ? "col-span-2" : ""
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

        <div className="flex flex-col gap-2 max-w-[60vw] m-auto py-4 md:py-0 md:max-w-[40vw] items-center">
          <h1 className="text-2xl text-brand-green md:text-4xl font-semibold leading-tight">
            {title}
          </h1>

          <p className="text-primary text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
