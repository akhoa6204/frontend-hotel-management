import { useCallback, useState } from "react";

export const useEntityPicker = <T extends { id: number | string | null }>() => {
  const [selectedId, setSelectedId] = useState<T["id"]>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [open, setOpen] = useState(false);

  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);

  const select = (row: T) => {
    setSelectedId(row.id);
    setSelectedRow(row);
  };
  const resetEntityPicker = () => {
    setSelectedId(null);
    setSelectedRow(null);
  };

  const mergeOptions = useCallback(
    (options: T[]) => {
      if (!selectedRow || selectedRow.id) return options;

      const exist = options.some((o) => o.id === selectedRow.id);

      if (exist) return options;

      return [selectedRow, ...options];
    },
    [selectedRow],
  );

  return {
    selectedId,
    selectedRow,
    setSelectedId,
    open,
    openPicker,
    closePicker,
    select,
    mergeOptions,
    resetEntityPicker,
  };
};
