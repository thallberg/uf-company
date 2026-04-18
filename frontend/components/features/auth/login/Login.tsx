"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { CircleCheckIcon, XIcon } from "lucide-react";
import { getMe } from "@/api/User.api";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { CardContent } from "@/components/ui/card";

import { loginAction } from "@/api/Auth.api";

const loginSchema = z.object({
  email: z.string().trim().email().min(1),
  password: z.string().min(8),
});

export function LoginFormClient({ content }: any) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await loginAction(value);
        localStorage.setItem("token", res.token);
        const user = await getMe();
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("auth-change"));
        setStatus("success");
        setMessage("Inloggning lyckades."); // Notify other tabs about the login
      } catch (error) {
        setStatus("error");
        setMessage("Fel vid inloggning."); // Notify other tabs about the login
      }
    },
  });

  return (
    <>
      <CardContent className="flex flex-col flex-1 justify-between">
        {/* TOP */}
        <div className="space-y-4">
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("idle");
              setMessage("");
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field name="email">
              {(field) => (
                <FormField
                  field={field}
                  type="email"
                  placeholder={content.fields.email}
                />
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <FormField
                  field={field}
                  type="password"
                  placeholder={content.fields.password}
                />
              )}
            </form.Field>
          </form>

          {status !== "idle" && (
            <p
              className={`text-sm flex items-center gap-2 ${
                status === "success" ? "text-brand-green" : "text-destructive"
              }`}
            >
              {status === "success" ? (
                <CircleCheckIcon className="h-4 w-4" />
              ) : (
                <XIcon className="h-4 w-4" />
              )}
              {message}
            </p>
          )}
        </div>

        {/* BOTTOM */}
        <Button variant='green' type="submit" form="login-form" className="w-full mt-6">
          {content.submit}
        </Button>
      </CardContent>
    </>
  );
}
