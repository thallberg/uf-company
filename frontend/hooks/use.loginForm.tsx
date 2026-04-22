"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { loginAction } from "@/api/Auth.api";
import { getMe } from "@/api/User.api";
import { useState } from "react";

export const loginSchema = z.object({
  email: z.string().trim().email().min(1),
  password: z.string().min(8),
});

export function useLoginForm() {
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
        setMessage("Inloggning lyckades.");
      } catch (error) {
        setStatus("error");
        setMessage("Fel vid inloggning.");
      }
    },
  });

  return {
    form,
    status,
    message,
  };
}