"use client";

import { iconMap } from "@/content/item/Item.content";
import { SingleItem } from "./SingleItem";

type ItemType = {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
};

type Props = {
  items: ItemType[];
  className?: string;
};

export function Items({ items, className }: Props) {
  return (
    <div className={`container mx-auto px-6 ${className ?? ""}`}>
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
    </div>
  );
}
