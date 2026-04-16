import { getProductById } from "@/api/Product.api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  if (!product) {
    return <div>Produkten hittades inte</div>;
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <p className="text-muted-foreground mt-2">
        {product.description}
      </p>
      {product.longDescription && (
  <p className="mt-4 whitespace-pre-line text-sm">
    {product.longDescription}
  </p>
)}

{product.origin && (
  <p className="mt-4 text-sm">
    Ursprung: {product.origin}
  </p>
)}

{product.mealsCount > 0 && (
  <p className="text-sm font-medium">
    {product.mealsCount} måltider
  </p>
)}

      {product.bundleItems?.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Innehåller:</h2>
          <ul className="space-y-1 text-sm">
            {product.bundleItems.map((item) => (
              <li key={item.productId}>
                {item.product.name} x{item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 text-lg font-semibold">
        {product.salePrice ? (
          <>
            <span className="line-through text-muted-foreground mr-2">
              {product.price} kr
            </span>
            <span className="text-red-500">
              {product.salePrice} kr
            </span>
          </>
        ) : (
          <span>{product.price} kr</span>
        )}
      </div>
    </div>
  );
}