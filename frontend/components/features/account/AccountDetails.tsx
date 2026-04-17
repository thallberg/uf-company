"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useForm } from "@tanstack/react-form";

export function AccountDetails() {
  const [saved, setSaved] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      console.log("SAVE USER:", value);

      // 🔥 här kommer du sen kalla API
      // await updateUser(value)

      setSaved(true);
    },
  });

  return (
    <div className="w-full max-w-xl bg-card p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Mina uppgifter</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(false);
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="fullName">
          {(field) => <FormField field={field} placeholder="Fullständigt namn" />}
        </form.Field>

        <form.Field name="address">
          {(field) => <FormField field={field} placeholder="Adress" />}
        </form.Field>

        <form.Field name="city">
          {(field) => <FormField field={field} placeholder="Stad" />}
        </form.Field>

        <form.Field name="postalCode">
          {(field) => <FormField field={field} placeholder="Postnummer" />}
        </form.Field>

        <form.Field name="phoneNumber">
          {(field) => <FormField field={field} placeholder="Telefonnummer" />}
        </form.Field>

        <Button type="submit" className="w-full">
          Spara uppgifter
        </Button>

        {saved && (
          <p className="text-sm text-brand-green">
            Uppgifterna sparades ✅
          </p>
        )}
      </form>
    </div>
  );
}