"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function SingleItem({ icon: Icon, title, description }: Props) {
  return (
<div className="flex items-start w-full md:flex-col md:items-center md:text-center">
  <Icon className="w-8 h-8 text-brand-blue shrink-0" />

  <div>
    <p className="font-medium text-sm">{title}</p>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
</div>
  );
}