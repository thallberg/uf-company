"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export type SectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
};

export function Section({
  title,
  description,
  buttonText,
  buttonHref,
}: SectionProps) {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-green">
            {title}
          </h2>

          <p className="text-primary leading-relaxed">{description}</p>

          {buttonText && buttonHref && (
            <div className="pt-2">
              <Button asChild className="py-4 px-3">
                <Link href={buttonHref}>{buttonText}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
