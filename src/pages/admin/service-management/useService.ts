import { DialogMode, DialogState } from "@constant/internal/DialogState";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import { StaffExtraServiceService } from "@services/staff/extraService.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { ServiceCreationRequest } from "@constant/request/ServiceCreationRequest";
import { ServiceUpdateRequest } from "@constant/request/ServiceUpdateRequest";
import { ServiceResponse } from "@constant/response/ServiceResponse";

export type ServiceForm = Omit<ServiceResponse, "id"> & {
  id?: number;
};
const defaultForm: ServiceForm = {
  name: "",
  basePrice: 100000,
  type: "SERVICE",
  description: "",
};
const useService = () => {
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

  const { form, resetForm, onChangeField, onSubmit, updateForm } =
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
  const { data: servicesResponse, isLoading: loadingServices } = useQuery({
    queryKey: ["services", filters.q, filters.page, filters.limit],
    queryFn: async () => await StaffExtraServiceService.getAll({ ...filters }),
  });

  const services = servicesResponse?.data || [];
  const meta = servicesResponse?.pagination;
  const onChangeFilter = (field: keyof SearchFilter, value: any) =>
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

    updateForm({
      id: selectedId,
      name: service?.name || "",
      basePrice: service?.basePrice || 0,
      type: service?.type || "SERVICE",
      description: service?.description || "",
    });
  }, [service]);

  const mUpdateService = useMutation({
    mutationFn: async (data: ServiceUpdateRequest) =>
      await StaffExtraServiceService.update(data),
    onSuccess() {
      showSuccess("Cập nhật thông tin dịch vụ thành công");
      queryClient.invalidateQueries({
        queryKey: ["services", filters.q, filters.page, filters.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ["service", selectedId],
      });
    },
    onError(error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật thông tin dịch vụ thất bại";
      showError(msg);
    },
  });
  const mRemoveService = useMutation({
    mutationFn: async (id: number) => await StaffExtraServiceService.delete(id),
    onSuccess(data, variables, onMutateResult, context) {
      showSuccess("Xóa dịch vụ thành công");
      queryClient.invalidateQueries({
        queryKey: ["services", filters.q, filters.page, filters.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ["service", selectedId],
      });
    },
    onError(error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Xóa dịch vụ thất bại";
      showError(msg);
    },
  });

  const mCreateService = useMutation({
    mutationFn: async (data: ServiceCreationRequest) =>
      await StaffExtraServiceService.create(data),
    onSuccess(data, variables, onMutateResult, context) {
      showSuccess("Tạo mới dịch vụ thành công");
      queryClient.invalidateQueries({
        queryKey: ["services", filters.q, filters.page, filters.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ["service", selectedId],
      });
    },
    onError(error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Tạo mới dịch vụ thất bại";
      showError(msg);
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
