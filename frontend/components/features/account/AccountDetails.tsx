"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useForm } from "@tanstack/react-form";

const fields = [
  { name: "fullName", label: "Namn", placeholder: "Fullständigt namn" },
  { name: "address", label: "Adress", placeholder: "Adress" },
  { name: "city", label: "Stad", placeholder: "Stad" },
  { name: "postalCode", label: "Postnummer", placeholder: "Postnummer" },
  { name: "phoneNumber", label: "Telefon", placeholder: "Telefonnummer" },
] as const;

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
        {fields.map((f) => (
          <form.Field key={f.name} name={f.name}>
            {(field) => (
              <FormField
                label={f.label}
                field={field}
                placeholder={f.placeholder}
              />
            )}
          </form.Field>
        ))}

        <Button type="submit" className="w-full">
          Spara uppgifter
        </Button>

        {saved && (
          <p className="text-sm text-brand-green">Uppgifterna sparades ✅</p>
        )}
      </form>
    </div>
  );
}
