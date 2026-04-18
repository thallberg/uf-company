import { Button } from "@/components/ui/button";
import Link from "next/link";

type FilterOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  title: string;
  createHref: string;

  filter?: T;
  onFilterChange?: (value: T) => void;
  filterOptions?: FilterOption<T>[]; // 🔥 NY

  allSelected?: boolean;
  onToggleAll?: () => void;
};

export function AdminListHeader<T>({
  title,
  createHref,
  filter,
  onFilterChange,
  filterOptions,
  allSelected,
  onToggleAll,
}: Props<T>) {
  return (
    <>
      {/* 🔥 FILTER */}
      {onFilterChange && filterOptions && (
        <div className="flex gap-2">
          {filterOptions.map((opt) => (
            <Button
              key={String(opt.value)}
              variant={filter === opt.value ? "green" : "outline"}
              onClick={() => onFilterChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold">{title}</h1>

      <Link href={createHref}>
        <Button>Lägg till</Button>
      </Link>

      {onToggleAll && (
        <Button variant="outline" onClick={onToggleAll}>
          {allSelected ? "Avmarkera alla" : "Välj alla"}
        </Button>
      )}
    </>
  );
}