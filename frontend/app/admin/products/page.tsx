"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  createProduct,
  addToBundle,
  Product,
} from "@/api/Product.api";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "product" | "bundle">("all");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // 🔥 selection
  const [selected, setSelected] = useState<number[]>([]);
  const [creatingBundle, setCreatingBundle] = useState(false);

  const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt" | "type">(
    "createdAt",
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 🔥 fetch
  useEffect(() => {
    const type =
      filter === "all" ? "" : filter === "product" ? "Product" : "Bundle";

    getProducts(type).then(setProducts);
  }, [filter]);

  // 🔥 toggle checkbox
  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // 🔥 select all (endast produkter)
  const handleSelectAll = () => {
    if (allSelected) {
      // 🔻 unselect all
      setSelected([]);
    } else {
      // 🔺 select all
      setSelected(productIds);
    }
  };

  // 🔥 delete
  const handleDelete = async (id: number) => {
    setLoadingId(id);

    await deleteProduct(id);

    setProducts((prev) => prev.filter((p) => p.id !== id));

    setLoadingId(null);
  };

  const productIds = products
    .filter((p) => p.type === "Product")
    .map((p) => p.id);

  const allSelected =
    productIds.length > 0 && productIds.every((id) => selected.includes(id));

  // 🔥 CREATE BUNDLE
  const handleCreateBundle = async () => {
    if (!selected.length) return;

    setCreatingBundle(true);

    // 1. skapa bundle
    const bundle = await createProduct({
      name: "Ny matkasse",
      description: "Skapad via admin",
      price: 0,
      type: "Bundle",
      stock: 10,
    });

    // 2. koppla produkter
    for (const productId of selected) {
      await addToBundle({
        bundleId: bundle.id,
        productId,
        quantity: 1,
      });
    }

    // 3. reset
    setSelected([]);
    setCreatingBundle(false);

    // 4. refresh bundles view (valfritt)
    setFilter("bundle");
  };

  const sortedProducts = [...products].sort((a, b) => {
    let valA: any;
    let valB: any;

    switch (sortBy) {
      case "name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;

      case "price":
        valA = a.price;
        valB = b.price;
        break;

      case "type":
        valA = a.type;
        valB = b.type;
        break;

      case "createdAt":
        valA = new Date((a as any).createdAt).getTime();
        valB = new Date((b as any).createdAt).getTime();
        break;

      default:
        return 0;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;

    return 0;
  });

  const getBundlesContainingProduct = (productId: number) => {
    return products.filter(
      (b) =>
        b.type === "Bundle" &&
        b.bundleItems?.some((item) => item.productId === productId),
    );
  };

  return (
    <div className="container mx-auto py-10 space-y-6 mt-12">
      {/* 🔥 FILTER */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "green" : "outline"}
          onClick={() => setFilter("all")}
        >
          Alla
        </Button>

        <Button
          variant={filter === "product" ? "green" : "outline"}
          onClick={() => setFilter("product")}
        >
          Produkter
        </Button>

        <Button
          variant={filter === "bundle" ? "green" : "outline"}
          onClick={() => setFilter("bundle")}
        >
          Kassar
        </Button>
      </div>

      <h1 className="text-2xl font-bold">Produkter</h1>

      {/* ➕ CREATE */}
      <Link href="/admin/products/new">
        <Button>Lägg till produkt</Button>
      </Link>

      {/* 🔥 SELECT ALL */}
      {filter !== "bundle" && (
        <Button variant="outline" onClick={handleSelectAll}>
          {allSelected ? "Avmarkera alla" : "Välj alla produkter"}
        </Button>
      )}

      <div className="flex items-center gap-4">
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as typeof sortBy)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Sortera efter" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="name">Namn (A–Ö)</SelectItem>
            <SelectItem value="price">Pris</SelectItem>
            <SelectItem value="createdAt">Datum</SelectItem>
            <SelectItem value="type">Typ</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "⬆️ Stigande" : "⬇️ Fallande"}
        </Button>
      </div>

      {/* 📦 LIST */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=""></TableHead>
              <TableHead>Namn</TableHead>
              <TableHead>Pris</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedProducts.map((p) => (
              <TableRow
                key={p.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  if (p.type === "Product") toggle(p.id);
                }}
              >
                {/* ✅ CHECKBOX */}
                <TableCell>
                  {p.type === "Product" && (
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggle(p.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </TableCell>

                {/* 📦 NAME */}
                <TableCell className="font-medium">{p.name}</TableCell>

                {/* 💰 PRICE */}
                <TableCell>{p.price} kr</TableCell>

                {/* 🏷 TYPE */}
                <TableCell>
                  <Badge
                    className="w-14"
                    variant={p.type === "Bundle" ? "blue" : "yellow"}
                  >
                    {p.type}
                  </Badge>
                </TableCell>

                {/* 📦 STOCK */}
                <TableCell>{p.stock}</TableCell>

                {/* ⚙️ ACTIONS */}
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/product/${p.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={loadingId === p.id}
                      onClick={() => setDeleteTarget(p)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 🔥 FLOATING ACTION BAR */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border px-6 py-3 rounded-xl shadow flex items-center gap-4">
          <span>{selected.length} valda</span>

          <Button
            variant="green"
            onClick={handleCreateBundle}
            disabled={creatingBundle}
          >
            {creatingBundle ? "Skapar..." : "Skapa bundle"}
          </Button>
        </div>
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ta bort produkt?</AlertDialogTitle>
          </AlertDialogHeader>

          {deleteTarget && (
            <>
              {getBundlesContainingProduct(deleteTarget.id).length > 0 && (
                <div className="text-sm text-red-500 space-y-2">
                  <p>⚠️ Denna produkt används i:</p>

                  <ul className="list-disc pl-5">
                    {getBundlesContainingProduct(deleteTarget.id).map((b) => (
                      <li key={b.id}>{b.name}</li>
                    ))}
                  </ul>

                  <p>Den kommer tas bort från dessa bundles.</p>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-2">
            <AlertDialogCancel className="bg-brand-yellow/40 text-primary" variant='yellow'>Avbryt</AlertDialogCancel>

            <AlertDialogAction variant="destructive"
              onClick={async () => {
                if (!deleteTarget) return;

                await handleDelete(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Ta bort ändå
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
