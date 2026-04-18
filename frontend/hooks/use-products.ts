"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  createProduct,
  addToBundle,
  Product,
} from "@/api/Product.api";

export function useProducts(filter: "all" | "product" | "bundle") {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const type =
      filter === "all" ? "" : filter === "product" ? "Product" : "Bundle";

    getProducts(type).then(setProducts);
  }, [filter]);

  const remove = async (id: number) => {
    setLoadingId(id);
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setLoadingId(null);
  };

  const createBundleFromSelection = async (selected: number[]) => {
    const bundle = await createProduct({
      name: "Ny matkasse",
      description: "Skapad via admin",
      price: 0,
      type: "Bundle",
      stock: 10,
    });

    for (const productId of selected) {
      await addToBundle({
        bundleId: bundle.id,
        productId,
        quantity: 1,
      });
    }
  };

  return {
    products,
    setProducts,
    loadingId,
    remove,
    createBundleFromSelection,
  };
}