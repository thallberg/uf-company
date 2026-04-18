"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function HowItWorksCard({ title, description, icon }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-center gap-3">
        {icon && (
          <div className="text-brand-yellow">
            {icon}
          </div>
        )}

        <CardTitle className="text-2xl text-brand-green">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-primary leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}