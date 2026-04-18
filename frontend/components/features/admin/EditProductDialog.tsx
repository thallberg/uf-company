"use client";

import { useState } from "react";
import { Product } from "@/api/Product.api";
import { ProductForm } from "./ProductForm";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  product: Product;
  onSave: (data: Partial<Product>) => Promise<void>;
};

export function EditProductDialog({ product, onSave }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redigera produkt</DialogTitle>
        </DialogHeader>

        <ProductForm
          initialData={product}
          onSubmit={async (data) => {
            await onSave(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}