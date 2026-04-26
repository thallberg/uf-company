"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  cardClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  buttonClassName?: string;
};

export function Section({
  title,
  description,
  buttonText,
  buttonHref,
  className,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
  buttonClassName,
}: SectionProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="container mx-auto px-4">
        <Card
          className={cn(
            "max-w-2xl mx-auto border-0 bg-transparent text-center shadow-none ring-0",
            cardClassName,
          )}
        >
          <CardHeader
            className={cn("items-center gap-4 px-0", headerClassName)}
          >
            <CardTitle
              className={cn(
                "text-2xl md:text-3xl font-semibold text-brand-green",
                titleClassName,
              )}
            >
              {title}
            </CardTitle>

            <CardDescription
              className={cn(
                "text-primary leading-relaxed",
                descriptionClassName,
              )}
            >
              {description}
            </CardDescription>
          </CardHeader>

          {buttonText && buttonHref && (
            <CardFooter
              className={cn(
                "justify-center border-0 bg-transparent p-0 pt-2",
                footerClassName,
              )}
            >
              <Button asChild className={cn("py-4 px-3", buttonClassName)}>
                <Link aria-label="About us" href={buttonHref}>{buttonText}</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
}
