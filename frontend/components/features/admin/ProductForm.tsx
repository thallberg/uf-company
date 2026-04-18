"use client";

import { useState } from "react";
import { Product } from "@/api/Product.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => Promise<void>;
};

export function ProductForm({ initialData, onSubmit }: Props) {
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

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="space-y-4">

      <div>
        <Label>Namn</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <Label>Kort beskrivning</Label>
        <Input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <Label>Lång beskrivning</Label>
        <Input
          value={form.longDescription ?? ""}
          onChange={(e) =>
            setForm({ ...form, longDescription: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Pris (kr)</Label>
        <Input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <Label>Reapris (valfri)</Label>
        <Input
          type="number"
          value={form.salePrice ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              salePrice: e.target.value
                ? Number(e.target.value)
                : null,
            })
          }
        />
      </div>

      <div>
        <Label>Bild URL</Label>
        <Input
          value={form.imageUrl ?? ""}
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Ursprung (t.ex. Sverige eller lokal gård)</Label>
        <Input
          value={form.origin ?? ""}
          onChange={(e) =>
            setForm({ ...form, origin: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Antal måltider</Label>
        <Input
          type="number"
          value={form.mealsCount ?? 0}
          onChange={(e) =>
            setForm({
              ...form,
              mealsCount: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <Label>Lagersaldo</Label>
        <Input
          type="number"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <Label>Typ</Label>
        <select
          className="w-full border rounded-md h-10 px-2"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value as Product["type"],
            })
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