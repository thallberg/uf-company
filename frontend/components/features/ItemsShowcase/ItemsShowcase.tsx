"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Items } from "@/components/features/item/Items";
import { iconMap } from "@/content/item/Item.content";

type ItemType = {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
};

type Props = {
  title?: string;
  description?: string;
  buttonText?: string
  items: ItemType[];
};

export function ItemsShowcase({
  title,
  description,
  buttonText,
  items,
}: Props) {
  return (
    <section className="py-10 mx-auto bg-brand-yellow/20 w-full">
      <div className="md:max-w-[60vw] md:mx-auto w-full">

        {/* title */}
        {title && (
          <h2 className="text-2xl font-semibold text-center mb-6 text-brand-green">
            {title}
          </h2>
        )}

        {/* description */}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}

        {/* items */}
        <Items items={items} className="max-w-[50vw] mx-auto" />

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <Link href="/products">
            <Button>  {buttonText}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}