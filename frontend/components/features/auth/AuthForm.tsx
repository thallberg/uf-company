"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Field = {
  name: string;
  type?: string;
  placeholder: string;
};

type Props<T> = {
  fields: Field[]
  onSubmit: (data: T) => Promise<void>
  submitLabel: string
}

export function AuthForm<T>({ fields, onSubmit, submitLabel }: Props<T>) {
  const [formState, setFormState] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(formState as T);
    setLoading(false);
  };

  return (
    <div className="space-y-4 w-full">
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type || "text"}
          placeholder={field.placeholder}
          onChange={(e) => handleChange(field.name, e.target.value)}
          disabled={loading}
        />
      ))}

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            <span>{submitLabel}</span>
          </div>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
}
