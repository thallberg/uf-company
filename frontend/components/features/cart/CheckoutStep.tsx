"use client";

import { getMe } from "@/api/User.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "../auth/login/LoginForm";

type Props = {
  onNext: (data: {
    name: string;
    email: string;
    address: string;
    postalCode: string;
  }) => void;
};

const fields = [
  { name: "name", placeholder: "Namn" },
  { name: "email", placeholder: "Email" },
  { name: "address", placeholder: "Adress" },
  { name: "postalCode", placeholder: "Postnummer" },
] as const;

export function CheckoutStep({ onNext }: Props) {
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const checkoutSchema = z.object({
    name: z.string().min(1, "Namn krävs"),
    email: z.string().email("Ogiltig email"),
    address: z.string().min(1, "Adress krävs"),
    postalCode: z.string().min(4, "Postnummer krävs"),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      postalCode: "",
    },
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: ({ value }) => {
      onNext(value);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getMe()
      .then((user) => {
        form.setFieldValue("name", user.fullName);
        form.setFieldValue("email", user.email);
        form.setFieldValue("address", user.address ?? "");
        form.setFieldValue("postalCode", user.postalCode ?? "");
      })
      .catch(() => {
        console.log("Kunde inte hämta användare");
      });
  }, [form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Kundinformation</h2>

      {/* 🔥 HINT (endast om ej inloggad) */}
      {!isLoggedIn && (
        <div className="text-sm text-muted-foreground text-center">
          Har du ett konto?{" "}
          <Dialog>
            <DialogTrigger asChild>
              <span className="underline cursor-pointer text-primary">
                Logga in
              </span>
            </DialogTrigger>

            <DialogContent className="p-0 max-w-md">
              <DialogTitle className="sr-only">Logga in</DialogTitle>
              <LoginForm />
            </DialogContent>
          </Dialog>{" "}
          för att fylla i uppgifter automatiskt.
        </div>
      )}
      {fields.map((f) => (
        <form.Field key={f.name} name={f.name}>
          {(field) => (
            <Input
              placeholder={f.placeholder}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      ))}

      <Button type="submit" className="w-full">
        Fortsätt
      </Button>
    </form>
  );
}
