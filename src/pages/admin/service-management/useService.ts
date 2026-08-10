import type { DialogMode, DialogState } from "@constant/internal/DialogState";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import { StaffExtraServiceService } from "@services/staff/extraService.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { ServiceCreationRequest } from "@constant/request/ServiceCreationRequest";
import type { ServiceUpdateRequest } from "@constant/request/ServiceUpdateRequest";
import type { ServiceResponse } from "@constant/response/ServiceResponse";
import { useTranslation } from "react-i18next";

export type ServiceForm = Omit<ServiceResponse, "id"> & {
  id?: number;
};
const defaultForm: ServiceForm = {
  name: "",
  basePrice: 100000,
  type: "SERVICE",
  description: "",
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;
  const candidate = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };
  return candidate.response?.data?.message || candidate.message || fallback;
};
const useService = () => {
  const { t } = useTranslation("services");
  const queryClient = useQueryClient();
  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();
  const [filters, setFilters] = useState<SearchFilter>({
    q: "",
    page: 1,
    limit: 10,
  });
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
  });

  const { form, setForm, resetForm, onChangeField, onSubmit } =
    useForm<ServiceForm>(defaultForm, undefined, async () => {
      if (dialog.mode === "CREATE") {
        await mCreateService.mutateAsync(form);
      } else {
        await mUpdateService.mutateAsync({ ...form, id: form.id || 0 });
      }

      closeDialog();
    });
  const openDialog = (mode: DialogMode) => setDialog({ open: true, mode });
  const onEdit = (id: number) => {
    setSelectedId(id);
    openDialog("EDIT");
  };
  const closeDialog = () => {
    setFilters({ q: "", page: 1, limit: 10 });
    setDialog((pre) => ({ ...pre, open: false }));
    setSelectedId(undefined);
    resetForm();
  };
  const {
    data: servicesResponse,
    isLoading: loadingServices,
    isError: servicesError,
    refetch: refetchServices,
  } = useQuery({
    queryKey: ["services", filters.q, filters.page, filters.limit],
    queryFn: async () => await StaffExtraServiceService.getAll({ ...filters }),
  });

  const services = servicesResponse?.data || [];
  const meta = servicesResponse?.pagination;
  const onChangeFilter = <K extends keyof SearchFilter>(
    field: K,
    value: SearchFilter[K],
  ) =>
    setFilters((pre) => ({ ...pre, [field]: value }));

  const { data: service, isLoading: loadingServiceDetail } = useQuery({
    queryKey: ["service", selectedId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await StaffExtraServiceService.getById(Number(selectedId));
    },
    enabled: !!selectedId,
  });
  useEffect(() => {
    if (!service) return;

    setForm({
      id: service.id,
      name: service?.name || "",
      basePrice: service?.basePrice || 0,
      type: service?.type || "SERVICE",
      description: service?.description || "",
    });
  }, [service, setForm]);

  const mUpdateService = useMutation({
    mutationFn: async (data: ServiceUpdateRequest) =>
      await StaffExtraServiceService.update(data),
    onSuccess() {
      showSuccess(t("messages.updateSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["services", filters.q, filters.page, filters.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ["service", selectedId],
      });
    },
    onError(error) {
      showError(
        getErrorMessage(error, t("messages.updateError")),
      );
    },
  });
  const mRemoveService = useMutation({
    mutationFn: async (id: number) => await StaffExtraServiceService.delete(id),
    onSuccess() {
      showSuccess(t("messages.deleteSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["services", filters.q, filters.page, filters.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ["service", selectedId],
      });
    },
    onError(error) {
      showError(getErrorMessage(error, t("messages.deleteError")));
    },
  });

  const mCreateService = useMutation({
    mutationFn: async (data: ServiceCreationRequest) =>
      await StaffExtraServiceService.create(data),
    onSuccess() {
      showSuccess(t("messages.createSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["services", filters.q, filters.page, filters.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ["service", selectedId],
      });
    },
    onError(error) {
      showError(getErrorMessage(error, t("messages.createError")));
    },
  });
  const removeServiceHandler = async (id: number) =>
    await mRemoveService.mutateAsync(id);
  return {
    services,
    meta,
    service,

    loadingServices,
    loadingServiceDetail,
    servicesError,
    refetchServices,
    creatingService: mCreateService.isPending,
    updatingService: mUpdateService.isPending,
    removingService: mRemoveService.isPending,

    filters,
    onChangeFilter,

    dialog,
    openDialog,
    onEdit,
    closeDialog,
    selectedId,
    setSelectedId,

    form,
    onChangeField,
    onSubmit,

    createService: mCreateService.mutateAsync,
    updateService: mUpdateService.mutateAsync,
    removeServiceHandler,

    alert,
    closeSnackbar,
  };
};
export default useService;
