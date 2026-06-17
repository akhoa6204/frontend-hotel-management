import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SearchFilter } from "@constant/internal/SearchFilter";
import StaffReviewService from "@services/staff/review.service";
import StaffStatService from "@services/staff/stat.service";
import { ReviewUpdateRequest } from "@constant/request/ReviewUpdateRequest";

const useReviewManagement = () => {
  const qc = useQueryClient();

  /* =================== FILTERS =================== */
  const [filters, setFilters] = useState<SearchFilter>({ page: 1, limit: 10 });

  const handleSearch = (keyword: string) =>
    setFilters((s) => ({ ...s, q: keyword, page: 1 }));

  const handleChangePage = (page: number) =>
    setFilters((s) => ({ ...s, page }));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews:list", filters],
    queryFn: () =>
      StaffReviewService.getList({
        page: filters.page,
        limit: filters.limit,
        q: filters.q?.trim() || undefined,
      }),
  });

  const rows = data?.data || [];
  const meta = data?.pagination;
  console.log("meta:", meta);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((meta?.total ?? 0) / (meta?.limit || 10))),
    [meta?.total, meta?.limit],
  );
  const currentPage = meta?.page || filters.page || 1;

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["reviews:stats"],
    queryFn: () => StaffStatService.getReviewStats(),
    staleTime: 30_000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (payload: ReviewUpdateRequest) =>
      StaffReviewService.updateActive(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews:list"] });
      qc.invalidateQueries({ queryKey: ["reviews:stats"] });
    },
  });

  const onUpdateActive = (id: number, active: boolean) =>
    updateStatusMutation.mutate({ id, active });

  return {
    rows,
    isLoading,
    isError,
    totalPages,
    currentPage,

    filters,
    handleSearch,
    handleChangePage,

    stats,
    statsLoading,

    onUpdateActive,

    meta,
  };
};

export default useReviewManagement;
