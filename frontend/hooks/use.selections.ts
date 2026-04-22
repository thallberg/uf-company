import { useState } from "react";

export function useSelection(ids: number[]) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const allSelected =
    ids.length > 0 && ids.every((id) => selected.includes(id));

  const toggleAll = () => {
    setSelected(allSelected ? [] : ids);
  };

  return {
    selected,
    toggle,
    toggleAll,
    allSelected,
    setSelected,
  };
}