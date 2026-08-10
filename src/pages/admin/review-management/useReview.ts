import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import StaffReviewService from "@services/staff/review.service";
import StaffStatService from "@services/staff/stat.service";
import type { ReviewUpdateRequest } from "@constant/request/ReviewUpdateRequest";
import useSnackbar from "@hooks/useSnackbar";
import { useTranslation } from "react-i18next";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;

  const candidate = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };

  return candidate.response?.data?.message || candidate.message || fallback;
};

const useReviewManagement = () => {
  const { t } = useTranslation("reviews");
  const qc = useQueryClient();
  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();

  /* =================== FILTERS =================== */
  const [filters, setFilters] = useState<SearchFilter>({ page: 1, limit: 10 });

  const handleSearch = (keyword: string) =>
    setFilters((s) => ({ ...s, q: keyword, page: 1 }));

  const handleChangePage = (page: number) =>
    setFilters((s) => ({ ...s, page }));

  const { data, isLoading, isError, refetch } = useQuery({
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
    onSuccess: async (_data, payload) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["reviews:list"] }),
        qc.invalidateQueries({ queryKey: ["reviews:stats"] }),
      ]);
      showSuccess(
        payload.active
          ? t("messages.showSuccess")
          : t("messages.hideSuccess"),
      );
    },
    onError: (error) => {
      showError(getErrorMessage(error, t("messages.updateError")));
    },
  });

  const onUpdateActive = (id: number, active: boolean) =>
    updateStatusMutation.mutateAsync({ id, active });

  return {
    rows,
    isLoading,
    isError,
    refetch,
    totalPages,
    currentPage,

    filters,
    handleSearch,
    handleChangePage,

    stats,
    statsLoading,

    onUpdateActive,
    isUpdatingStatus: updateStatusMutation.isPending,

    alert,
    closeSnackbar,

    meta,
  };
};

export default useReviewManagement;
