"use client";

import { useState } from "react";
import { Filters } from "@/components/ui/Filters";
import { useProducts } from "@/hooks/use-products";
import { useSelection } from "@/hooks/use-selections";
import { AdminListHeader } from "../AdminListHeader";
import { SelectionBar } from "../SelectionBar";
import { DeleteDialog } from "../DeleteDialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminTable } from "../AdminTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminProductsPage() {
  const [filter, setFilter] = useState<"all" | "product" | "bundle">("all");
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt" | "type">(
    "createdAt",
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 🔥 data hook
  const { products, loadingId, remove, createBundleFromSelection } =
    useProducts(filter);

  // 🔥 selection hook
  const productIds = products
    .filter((p) => p.type === "Product")
    .map((p) => p.id);

  const { selected, toggle, toggleAll, allSelected, setSelected } =
    useSelection(productIds);

  // 🔍 normalize (för åäö search)
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // 🔍 filter
  const filteredProducts = products.filter((p) => {
    if (!search) return true;

    const q = normalize(search);

    return (
      normalize(p.name).includes(q) || normalize(p.description).includes(q)
    );
  });

  // 🔄 sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  // 🔍 bundles info
  const getBundlesContainingProduct = (productId: number) => {
    return products.filter(
      (b) =>
        b.type === "Bundle" &&
        b.bundleItems?.some((item) => item.productId === productId),
    );
  };

  return (
    <div className="container mx-auto py-10 space-y-6 mt-12">
      {/* 🔥 HEADER */}
      <AdminListHeader
        title="Produkter"
        createHref="/admin/products/new"
        filter={filter}
        onFilterChange={setFilter}
        filterOptions={[
          { label: "Alla", value: "all" },
          { label: "Produkter", value: "product" },
          { label: "Kassar", value: "bundle" },
        ]}
        allSelected={allSelected}
        onToggleAll={toggleAll}
      />

      {/* 🔍 FILTERS */}
      <Filters
        search={search}
        onSearchChange={setSearch}
        sortOrder={sortOrder}
        onToggleOrder={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
        sort={
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sortera" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="name">Namn</SelectItem>
              <SelectItem value="price">Pris</SelectItem>
              <SelectItem value="createdAt">Datum</SelectItem>
              <SelectItem value="type">Typ</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* 📦 TABLE */}
      <AdminTable
        data={sortedProducts}
        getId={(p) => p.id}
        selected={selected}
        onToggle={toggle}
        isSelectable={(p) => p.type === "Product"}
        columns={[
          {
            header: "Namn",
            render: (p) => <span className="font-medium">{p.name}</span>,
          },
          {
            header: "Pris",
            render: (p) => `${p.price} kr`,
          },
          {
            header: "Typ",
            render: (p) => (
              <Badge variant={p.type === "Bundle" ? "blue" : "yellow"}>
                {p.type}
              </Badge>
            ),
          },
          {
            header: "Stock",
            render: (p) => p.stock,
          },
          {
            header: "Actions",
            className: "text-right",
            render: (p) => (
              <div
                className="flex justify-end gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/admin/product/${p.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteTarget(p)}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
      />

      {/* 🔥 FLOAT BAR */}
      <SelectionBar
        count={selected.length}
        onCreate={async () => {
          await createBundleFromSelection(selected);
          setSelected([]);
          setFilter("bundle");
        }}
      />

      {/* ❌ DELETE DIALOG */}
      <DeleteDialog
        item={deleteTarget}
        getId={(p) => p.id}
        onDelete={remove}
        onClose={() => setDeleteTarget(null)}
        getExtraInfo={(p) => (
          <>
            {getBundlesContainingProduct(p.id).length > 0 && (
              <div>Den används i bundles...</div>
            )}
          </>
        )}
      />
    </div>
  );
}
