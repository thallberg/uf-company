"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { InfoCard } from "./InfoCard";

type InfoItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type Props = {
  title: string;
  description?: string;
  items: InfoItem[];
  className?: string;
};

export function InfoSection({ title, description, items, className }: Props) {
  return (
    <section className={cn(className)}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl text-brand-green md:text-3xl font-semibold mb-2">
            {title}
          </h2>

          {description && (
            <p className="text-primary text-sm mb-4">{description}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
