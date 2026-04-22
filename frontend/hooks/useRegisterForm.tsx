import { registerAction } from "@/api/Auth.api";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  phoneNumber: z.string().min(1),
});

export function useRegisterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("SENDING:", value);

        const res = await registerAction(value);

        console.log("RESPONSE:", res);

        localStorage.setItem("token", res.token);
        window.dispatchEvent(new Event("auth-change"));

        setStatus("success");
        setMessage("Kontot skapades.");
        form.reset();
      } catch (err: any) {
        console.error("ERROR:", err);

        setStatus("error");
        setMessage(err?.message || "Serverfel");
      }
    },
  });

  return {
    form,
    status,
    message,
  };
}
