"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function SingleItem({ icon: Icon, title, description }: Props) {
  return (
<div className="flex gap-4 items-center justify-center w-full p-4 sm:flex-col sm:gap-2 sm:justify-center sm:text-center sm:items-center">
  <Icon className="w-8 h-8 text-brand-yellow shrink-0" />

  <div>
    <p className="font-medium text-sm py-1 text-brand-green">{title}</p>
    <p className="text-xs text-primary">{description}</p>
  </div>
</div>
  );
}