"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  getProductById,
  updateProduct,
  Product,
} from "@/api/Product.api";
import { ProductForm } from "@/app/admin/components/ProductForm";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditProductPage({ params }: Props) {
  const { id } = use(params); 

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <div> <Spinner className="h-12 w-12 text-brand-blue" /> </div>;

  return (
    <div className="container mx-auto py-10 mt-10 max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Redigera produkt</h1>

      <ProductForm
        initialData={product}
        onSubmit={async (data) => {
          await updateProduct(product.id, data);
          router.push("/admin/products");
        }}
      />
    </div>
  );
}