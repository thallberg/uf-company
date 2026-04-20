"use client";

import Link from "next/link";
import { iconMap, type IconName } from "@/components/features/item/Item.icons";
import { Button } from "@/components/ui/button";
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
};

export function Items({
  title,
  description,
  buttonText,
  buttonHref,
  items,
  className,
}: Props) {
  return (
    <section className={cn('w-full', className)}>
      {(title || description) && (
        <div className="mx-auto mb-6 max-w-2xl text-center">
          {title && (
            <h2 className="text-2xl font-semibold text-brand-green">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-4 text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="flex flex-col divide-y gap-4 sm:flex-row sm:divide-none">
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

      {buttonText && buttonHref && (
        <div className="flex justify-center mt-6">
          <Button asChild>
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
