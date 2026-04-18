"use client";

import Image from "next/image";

type Props = {
  title?: string;
  description?: string;
  images?: string[];
};

export function Hero({
  title = "Lokala råvaror, nära dig",
  description = "Upptäck noggrant utvalda produkter från lokala producenter i ditt närområde. Vi gör det enkelt att handla hållbart, stötta småskaliga verksamheter och få hem färska råvaror av hög kvalitet – direkt från källan.",
  images = [
    "/hero/hero-1.jpg",
    "/hero/hero-2.jpg",
    "/hero/hero-3.jpg",
  ],
}: Props) {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* 🔵 LEFT - IMAGES */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[200px] md:h-[250px] lg:h-[350px]">
            
            {/* 🟣 STOR vänster */}
            <div className="relative row-span-2 rounded-xl overflow-hidden">
              <Image
                src={images[0]}
                alt="Lokala råvaror"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* 🟢 Höger top */}
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={images[1]}
                alt="Produkter"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* 🟢 Höger bottom */}
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={images[2]}
                alt="Mat"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 🟢 RIGHT - TEXT */}
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