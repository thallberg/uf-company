"use client";

import { AuthBenefitsCard } from "@/components/features/auth/AuthBenefitsCard";
import { LoginForm } from "@/components/features/auth/login/LoginForm";
import { RegisterForm } from "@/components/features/auth/register/RegisterForm";
import { useState } from "react";

export function AuthSection() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="container mx-auto h-full">
      <div className="grid md:grid-cols-2 mx-auto items-start">
        {/* LEFT */}
        <AuthBenefitsCard
          mode={mode}
          onRegisterClick={() => setMode("register")}
          onBackClick={() => setMode("login")}
        />

        {/* RIGHT */}
        <div className="bg-card h-full">
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
