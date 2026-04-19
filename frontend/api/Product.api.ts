import { ApiFetch } from "./Client.api";

export type Product = {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  salePrice?: number | null;
  imageUrl?: string;
  type: "Product" | "Bundle";
  stock: number;
  origin?: string; // ✅ denna saknas
  mealsCount?: number;
  isLocalOnly?: boolean;
  isPopular: boolean;

  bundleItems?: {
    productId: number;
    quantity: number;
    product: {
      name: string;
      imageUrl?: string;
    };
  }[];
};

export async function getProducts(
  type?: string
): Promise<Product[]> {
  const query = new URLSearchParams({
    page: "1",
    pageSize: "1000",
    ...(type && { type }),
  });

  const json = await ApiFetch<{ data: Product[] }>(
    `/api/product?${query.toString()}`
  );

  return json.data;
}

export async function getProductById(id: number) {
  return ApiFetch<Product>(`/api/product/${id}`);
}

export async function deleteProduct(id: number) {
  return ApiFetch<void>(`/api/product/${id}`, {
    method: "DELETE",
  });
}

export async function updateProduct(id: number, data: Partial<Product>) {
  return ApiFetch<Product>(`/api/product/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function createProduct(data: Partial<Product>) {
  return ApiFetch<Product>("/api/product", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function addToBundle(data: {
  bundleId: number;
  productId: number;
  quantity: number;
}) {
  return ApiFetch("/api/product/bundle", {
    method: "POST",
    body: JSON.stringify(data),
  });
}