import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import type { PromotionResponse } from "@constant/response/PromotionResponse";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { DialogState } from "@constant/internal/DialogState";
import StaffPromotionService from "@services/staff/promotion.service";
import StaffRoomTypeService from "@services/staff/roomType.service";

const initialFilters: SearchFilter = {
  q: "",
  page: 1,
  limit: 10,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;
  const candidate = error as { response?: { data?: { message?: string } } };
  return candidate.response?.data?.message || fallback;
};
export type PromotionForm = Omit<
  PromotionResponse,
  "id" | "quotaUsed" | "active"
>;
const initialForm: PromotionForm = {
  name: "",
  priority: 100,
  scope: "INVOICE",
  description: "",
  minTotal: undefined,
  code: "",
  discountType: "PERCENTAGE",
  maxDiscountAmount: undefined,
  discountValue: 0,
  startDate: "",
  endDate: "",
  autoApplied: false,
  quotaTotal: 100,
  stackable: false,
};
export const getPromotionLabels = (
  promotion: PromotionResponse,
  t: TFunction,
) => {
  const scopeLabel =
    promotion.scope === "ROOM"
      ? t("scopes.ROOM", { ns: "promotions" })
      : promotion.scope === "SERVICE"
        ? t("scopes.SERVICE", { ns: "promotions" })
        : t("scopes.INVOICE", { ns: "promotions" });

  const discountTypeTransform =
    promotion.discountType === "FIXED_AMOUNT"
      ? t("discountTypes.FIXED_AMOUNT", { ns: "promotions" })
      : t("discountTypes.PERCENTAGE", { ns: "promotions" });

  const usedLabel =
    promotion.quotaTotal == null
      ? (promotion.quotaUsed ?? 0)
      : `${promotion.quotaUsed ?? 0}/${promotion.quotaTotal}`;

  const autoApplyLabel = promotion.autoApplied
    ? t("types.AUTO", { ns: "promotions" })
    : t("types.CODE", { ns: "promotions" });

  return {
    scopeLabel,
    discountTypeTransform,
    usedLabel,
    autoApplyLabel,
  };
};

const usePromotionManagement = () => {
  const { t } = useTranslation(["promotions", "common"]);
  const qc = useQueryClient();

  const { alert, showError, showSuccess, closeSnackbar } = useSnackbar();
  const [editingId, setEditingId] = useState<number | undefined>();
  const {
    form: filters,
    onChangeField: onChangeFilter,
    updateForm: updateFilter,
  } = useForm<SearchFilter>(initialFilters);
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
  });
  const { form, onChangeField, resetForm, updateForm } =
    useForm<PromotionForm>(initialForm);

  const handleSearch = (keyword: string) =>
    updateFilter({
      ...filters,
      q: keyword,
      page: 1,
    });
  const handleChangePage = (page: number) => onChangeFilter("page", page);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["promotions", filters],
    queryFn: () => StaffPromotionService.getList(filters),
  });

  const rows = useMemo(() => data?.data || [], [data?.data]);
  const meta = useMemo(() => data?.pagination, [data?.pagination]);

  const { data: promotion, isLoading: isLoadingPromotion } = useQuery({
    queryKey: ["promotion", editingId],
    queryFn: () => StaffPromotionService.getById(Number(editingId)),
    enabled: !!editingId,
  });

  const { data: roomTypeResponse } = useQuery({
    queryKey: ["roomTypes", filters.q],
    queryFn: async () => await StaffRoomTypeService.getList(),
    staleTime: 30_000,
  });

  const roomTypes = useMemo(
    () => roomTypeResponse?.data || [],
    [roomTypeResponse?.data],
  );

  const onClose = () => {
    setDialogState({ open: false, mode: "CREATE" });
    setEditingId(undefined);
    resetForm();
  };

  const onCreateDialog = () => {
    setEditingId(undefined);
    resetForm();
    setDialogState({ open: true, mode: "CREATE" });
  };

  const onEditDialog = (id: number) => {
    setEditingId(id);
    setDialogState({ open: true, mode: "EDIT" });
  };

  useEffect(() => {
    if (!promotion) return;
    updateForm(promotion);
    setDialogState({ open: true, mode: "EDIT" });
  }, [promotion]);

  const createMutation = useMutation({
    mutationFn: () =>
      StaffPromotionService.create({
        scope: form.scope,
        description: form.description,
        discountType: form.discountType,
        discountValue: Number(form.discountValue || 0),
        startDate: form.startDate,
        endDate: form.endDate,
        minTotal: Number(form.minTotal) || undefined,
        code: form.code?.trim() || undefined,
        name: form.name || "",
        autoApplied: form.autoApplied,
        priority: form.priority,
        maxDiscountAmount: Number(form.maxDiscountAmount) || undefined,
        stackable: Boolean(form.stackable),
        quotaTotal: form.quotaTotal || 100,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promotions"] });
      showSuccess(t("messages.createSuccess", { ns: "promotions" }));
      onClose();
    },
    onError: (error) => {
      showError(
        getErrorMessage(error, t("messages.genericError", { ns: "promotions" })),
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      StaffPromotionService.update(editingId!, {
        scope: form.scope,
        discountType: form.discountType,
        description: form.description,
        discountValue: Number(form.discountValue),
        startDate: form.startDate,
        endDate: form.endDate,
        minTotal: Number(form.minTotal) || undefined,
        code: form.code?.trim() || undefined,

        name: form.name,
        autoApplied: form.autoApplied,
        priority: form.priority,
        maxDiscountAmount: Number(form.maxDiscountAmount) || undefined,
        stackable: Boolean(form.stackable),
        quotaTotal: form.quotaTotal || 100,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promotions"] });
      onClose();
      showSuccess(t("messages.updateSuccess", { ns: "promotions" }));
    },
    onError: (error) => {
      showError(
        getErrorMessage(error, t("messages.genericError", { ns: "promotions" })),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => StaffPromotionService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promotions"] });
      showSuccess(t("messages.deleteSuccess", { ns: "promotions" }));
    },
    onError: (error) => {
      showError(
        getErrorMessage(error, t("messages.genericError", { ns: "promotions" })),
      );
    },
  });

  const onSubmit = () => {
    if (!form.startDate || !form.endDate) {
      showError(t("validation.dateRangeRequired", { ns: "promotions" }));
      return;
    }
    if (dialogState.mode === "EDIT" && editingId) updateMutation.mutate();
    else createMutation.mutate();
  };

  const handleDeletePromotion = async (id: number) =>
    await deleteMutation.mutateAsync(id);

  return {
    rows,
    meta,
    isLoading,
    isError,
    refetch,
    filters,
    handleSearch,
    handleChangePage,

    dialogState,
    form,
    onChangeField,
    onCreateDialog,
    onEditDialog,
    onClose,
    onSubmit,

    handleDeletePromotion,
    roomTypes,

    alert,
    closeSnackbar,

    promotion,
    isLoadingPromotion,
    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default usePromotionManagement;
