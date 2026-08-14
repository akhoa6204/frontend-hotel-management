import type { RoomType } from "@constant/types";

export const mockRoomFilters: {
  key: RoomType;
  label: string;
  count?: number;
}[] = [
  { key: "all", label: "Tất cả" },
  { key: "standard", label: "Standard Room", count: 2 },
  { key: "deluxe", label: "Deluxe Room", count: 9 },
  { key: "suite", label: "Suite", count: 12 },
];
