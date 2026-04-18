"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  buttonText: string;
};

export function AboutSection({ title, description, buttonText }: Props) {
  return (
    <section className="w-full py-10"> 
      <div className="container mx-auto px-4">
        
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-4">
          
          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-green">
            {title}
          </h2>

          {/* TEXT */}
          <p className="text-primary leading-relaxed">
            {description}
          </p>

          {/* BUTTON */}
          <div className="pt-2">
            <Button asChild className="py-4 px-3">
              <Link href="/about"> 
                {buttonText}
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}