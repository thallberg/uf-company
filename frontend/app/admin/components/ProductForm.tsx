"use client";

import { useState } from "react";
import { Product } from "@/api/Product.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const fields = [
  { key: "name", label: "Namn" },
  { key: "description", label: "Kort beskrivning" },
  { key: "longDescription", label: "Lång beskrivning" },
  { key: "price", label: "Pris (kr)", type: "number" },
  { key: "salePrice", label: "Reapris", type: "number" },
  { key: "imageUrl", label: "Bild URL" },
  { key: "origin", label: "Ursprung" },
  { key: "mealsCount", label: "Antal måltider", type: "number" },
  { key: "stock", label: "Lagersaldo", type: "number" },
] as const;

export function ProductForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Product>>({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    longDescription: initialData?.longDescription ?? "",
    price: initialData?.price ?? 0,
    salePrice: initialData?.salePrice ?? null,
    imageUrl: initialData?.imageUrl ?? "",
    type: initialData?.type ?? "Product",
    stock: initialData?.stock ?? 0,
    origin: initialData?.origin ?? "",
    mealsCount: initialData?.mealsCount ?? 0,
  });

  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <FormInput
          key={f.key}
          label={f.label}
          type={f.type}
          value={form[f.key] ?? ""}
          onChange={(v) => {
            const value =
              f.type === "number" ? (v === "" ? null : Number(v)) : v;

            updateField(f.key, value as any);
          }}
        />
      ))}

      {/* SELECT */}
      <div>
        <Label>Typ</Label>
        <select
          className="w-full border rounded-md h-10 px-2"
          value={form.type}
          onChange={(e) =>
            updateField("type", e.target.value as Product["type"])
          }
        >
          <option value="Product">Produkt</option>
          <option value="Bundle">Kasse</option>
        </select>
      </div>

      <Button onClick={handleSubmit} className="w-full" disabled={loading}>
        {loading ? "Sparar..." : "Spara"}
      </Button>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
