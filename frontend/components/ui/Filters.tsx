"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  search?: string;
  onSearchChange?: (value: string) => void;

  sort?: ReactNode;     
  filters?: ReactNode;   

  sortOrder?: "asc" | "desc";
  onToggleOrder?: () => void;

  placeholder?: string;
};

export function Filters({
  search,
  onSearchChange,
  sort,
  filters,
  sortOrder,
  onToggleOrder,
  placeholder = "Sök...",
}: Props) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* 🔍 SEARCH */}
      {onSearchChange && (
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64"
        />
      )}

      {/* 🔽 CUSTOM FILTERS */}
      {filters}

      {/* 🔽 SORT */}
      {sort}

      {/* 🔁 ORDER */}
      {onToggleOrder && (
        <Button variant="outline" size="icon" onClick={onToggleOrder}>
          {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </Button>
      )}
    </div>
  );
}