
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number | null;
  imageUrl?: string;
  type: string;
  stock: number;

  bundleItems?: {
    productId: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5011/api/Product?type=Bundle", {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();
  return json.data;
}

export async function getProductById(id: number) {
  const res = await fetch(`http://127.0.0.1:5011/api/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed");

  return res.json();
}