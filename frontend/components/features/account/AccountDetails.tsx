"use client";

import { getMe, updateMe } from "@/api/User.api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useForm } from "@tanstack/react-form";
import { fieldsLogin } from "../../../content/fields-content/Fields.content";

export function AccountDetails() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setError("");
        await updateMe(value);

        const user = await getMe();
        localStorage.setItem("user", JSON.stringify(user));
        setSaved(true);
      } catch {
        setError("Kunde inte spara uppgifterna.");
      }
    },
  });

  useEffect(() => {
    getMe()
      .then((user) => {
        form.setFieldValue("fullName", user.fullName ?? "");
        form.setFieldValue("address", user.address ?? "");
        form.setFieldValue("city", user.city ?? "");
        form.setFieldValue("postalCode", user.postalCode ?? "");
        form.setFieldValue("phoneNumber", user.phoneNumber ?? "");
      })
      .catch(() => {
        setError("Kunde inte hämta dina uppgifter.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);

  if (loading) {
    return (
      <div className="w-full max-w-xl bg-card p-6 rounded-2xl shadow">
        <p className="text-sm text-muted-foreground">Hämtar uppgifter...</p>
      </div>
    );
  }

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
        {fieldsLogin.map((f) => (
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

        <Button aria-label="Spara dina uppgifter" type="submit" className="w-full">
          Spara uppgifter
        </Button>

        {saved && (
          <p className="text-sm text-brand-green">Uppgifterna sparades ✅</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>
    </div>
  );
}
