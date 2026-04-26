"use client";

import Link from "next/link";
import { iconMap, type IconName } from "@/components/features/item/Item.icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SingleItem } from "./SingleItem";

type ItemType = {
  icon: IconName;
  title: string;
  description: string;
};

type Props = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  items: ItemType[];
  className?: string;
  itemsClassName?: string;
  cardClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  buttonClassName?: string;
};

export function Items({
  title,
  description,
  buttonText,
  buttonHref,
  items,
  className,
  itemsClassName,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
  buttonClassName,
}: Props) {
  return (
    <section className={cn("w-full", className)}>
      {(title || description || (buttonText && buttonHref)) && (
        <Card
          className={cn(
            "mx-auto max-w-2xl border-0 bg-transparent text-center shadow-none ring-0",
            cardClassName,
          )}
        >
          {(title || description) && (
            <CardHeader
              className={cn("items-center gap-4 px-0", headerClassName)}
            >
              {title && (
                <h2
                  className={cn(
                    "text-2xl font-semibold text-brand-green",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              )}

              {description && (
                <CardDescription
                  className={cn(
                    "text-primary leading-relaxed",
                    descriptionClassName,
                  )}
                >
                  {description}
                </CardDescription>
              )}
            </CardHeader>
          )}

          {buttonText && buttonHref && (
            <CardFooter
              className={cn(
                "justify-center border-0 p-0 bg-transparent",
                footerClassName,
              )}
            >
              <Button asChild className={buttonClassName}>
                <Link aria-label="Gå till sidan för alla produkter" href={buttonHref}>{buttonText}</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      )}

      <div
        className={cn(
          "flex flex-col divide-y gap-4 sm:flex-row sm:divide-none",
          itemsClassName,
        )}
      >
        {items.map((item, i) => {
          const Icon = iconMap[item.icon];

          return (
            <div key={i} className="flex w-full">
              <div className="w-full py-6">
                <SingleItem
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
