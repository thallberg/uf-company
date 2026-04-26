"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authContent } from "@/content/auth/Auth.content";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  mode: "login" | "register";
  onRegisterClick?: () => void;
  onBackClick?: () => void;
};

export function AuthBenefitsCard({
  mode,
  onRegisterClick,
  onBackClick,
}: Props) {
  const content = authContent.benefits;

  return (
    <Card className="p-6 h-full flex flex-col ring-0 rounded-none bg-brand-green">
      <CardHeader>
        <CardTitle className="text-brand-white">{content.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 justify-between gap-6 mt-4">
        {/* LIST */}
        <div className="flex flex-col gap-4">
          {content.items.map((text) => (
            <div key={text} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-brand-white mt-0.5" />
              <p className="text-sm text-brand-white">{text}</p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        {mode === "login" ? (
          <Button aria-label="Visa registrera användare" variant="outline" onClick={onRegisterClick} className="w-full">
            Registrera
          </Button>
        ) : (
          <div className="flex justify-center">
            <Button
            aria-label="Gå tillbaka"
              variant="ghost"
              onClick={onBackClick}
              className="h-16 w-16 hover:bg-opacity rounded-full"
            >
              <ArrowLeft className="w-10! h-10! text-brand-white" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
