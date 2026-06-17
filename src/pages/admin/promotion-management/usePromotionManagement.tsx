import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import { PromotionResponse } from "@constant/response/PromotionResponse";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { DialogState } from "@constant/internal/DialogState";
import StaffPromotionService from "@services/staff/promotion.service";
import StaffRoomTypeService from "@services/staff/roomType.service";

const initialFilters: SearchFilter = {
  q: "",
  page: 1,
  limit: 10,
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
export const getPromotionLabels = (promotion: PromotionResponse) => {
  const scopeLabel =
    promotion.scope === "ROOM"
      ? "Loại phòng"
      : promotion.scope === "SERVICE"
        ? "Dịch vụ"
        : "Toàn bộ";

  const discountTypeTransform =
    promotion.discountType === "FIXED" ? "Giá cố định" : "Phần trăm";

  const usedLabel =
    promotion.quotaTotal == null
      ? (promotion.quotaUsed ?? 0)
      : `${promotion.quotaUsed ?? 0}/${promotion.quotaTotal}`;

  const autoApplyLabel = promotion.autoApplied ? "Tự động" : "Mã code";

  return {
    scopeLabel,
    discountTypeTransform,
    usedLabel,
    autoApplyLabel,
  };
};

const usePromotionManagement = () => {
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

  const { data, isLoading } = useQuery({
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
      showSuccess("Tạo mã giảm giá thành công");
      onClose();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra";
      showError(msg);
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
      showSuccess("Cập nhật mã giảm giá thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra";
      showError(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => StaffPromotionService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["promotions"] });
      showSuccess("Xóa mã giảm giá thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra";
      showError(msg);
    },
  });

  const onSubmit = () => {
    if (!form.startDate || !form.endDate) return;
    if (dialogState.mode === "EDIT" && editingId) updateMutation.mutate();
    else createMutation.mutate();
  };

  const handleDeletePromotion = (id: number) => {
    if (window.confirm("Xóa khuyến mãi này?")) deleteMutation.mutate(id);
  };

  return {
    rows,
    meta,
    isLoading,
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
  };
};

export default usePromotionManagement;
