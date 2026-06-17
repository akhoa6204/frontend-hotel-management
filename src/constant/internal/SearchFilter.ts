export type SearchFilter = {
  page?: number;
  limit?: number;
  q?: string;
  sortOrder?: "asc" | "desc";
  sortBy?: string;
};
