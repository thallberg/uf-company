"use client";

import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

type Column<T> = {
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  getId: (item: T) => number;
  selected?: number[];
  onToggle?: (id: number) => void;
  isSelectable?: (item: T) => boolean;
  onRowClick?: (item: T) => void;
  loading?: boolean;
};

export function AdminTable<T>({
  data,
  columns,
  getId,
  selected,
  onToggle,
  isSelectable,
  onRowClick,
  loading,
}: Props<T>) {
  return (
    <div className="border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            {onToggle && <TableHead />}
            {columns.map((col, i) => (
              <TableHead key={i} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onToggle ? 1 : 0)}>
                <div className="flex justify-center py-10">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onToggle ? 1 : 0)}>
                <div className="flex flex-col items-center py-10 gap-4">
                 <Spinner className="h-12 w-12 text-brand-blue" />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => {
              const id = getId(item);
              const selectable = isSelectable?.(item);

              return (
                <TableRow
                  key={id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    if (onRowClick) onRowClick(item);
                    if (onToggle && selectable) onToggle(id);
                  }}
                >
                  {onToggle && (
                    <TableCell>
                      {selectable && (
                        <input
                          type="checkbox"
                          checked={selected?.includes(id)}
                          onChange={() => onToggle(id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </TableCell>
                  )}

                  {columns.map((col, i) => (
                    <TableCell key={i} className={col.className}>
                      {col.render(item)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
