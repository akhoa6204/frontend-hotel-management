import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { RoomUpdateRequest } from "@constant/request/RoomUpdateRequest";
import type { RoomStatus } from "../../../enums/RoomStatus";
import type { RoomCreationRequest } from "@constant/request/RoomCreationRequest";
import StaffRoomTypeService from "@services/staff/roomType.service";
import StaffRoomService from "@services/staff/room.service";
import type { DialogState } from "@constant/internal/DialogState";
import { useTranslation } from "react-i18next";

type RoomFilter = SearchFilter & { roomTypeId?: number };

const defaultRoomFilter: RoomFilter = {
  q: "",
  roomTypeId: undefined,
  page: 1,
  limit: 6,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null || !("response" in error)) {
    return fallback;
  }

  const response = (error as { response?: { data?: { message?: unknown } } }).response;
  return typeof response?.data?.message === "string" ? response.data.message : fallback;
};

function validateForm(
  form: RoomUpdateRequest,
  messages: { roomNameRequired: string; roomTypeRequired: string },
) {
  const errors: Partial<Record<keyof RoomUpdateRequest, string>> = {};

  if (!form.name) {
    errors.name = messages.roomNameRequired;
  }

  if (!form.roomTypeId) {
    errors.roomTypeId = messages.roomTypeRequired;
  }

  return errors;
}
export default function useRoomManagement() {
  const { t } = useTranslation("rooms");
  const queryClient = useQueryClient();

  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
  });
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
  const {
    form: filters,
    onChangeField: onChangeFilter,
    updateForm: updateFormFilter,
  } = useForm<RoomFilter>(defaultRoomFilter);
  const {
    form,
    errors: formErrors,
    updateForm,
    onChangeField,
    resetForm,
    onSubmit: submitUpsert,
  } = useForm<RoomUpdateRequest>(
    {
      roomTypeId: undefined,
      name: "",
      status: "VACANT_CLEAN",
    },
    (values) =>
      validateForm(values, {
        roomNameRequired: t("validation.roomNameRequired"),
        roomTypeRequired: t("validation.roomTypeRequired"),
      }),
    async () => {
      if (editingRoomId) {
        await updateMutation.mutateAsync({
          id: editingRoomId,
          payload: form,
        });
      } else {
        if (!form.roomTypeId || !form.name?.trim()) {
          return;
        }

        await createMutation.mutateAsync({
          roomTypeId: form.roomTypeId,
          name: form.name,
        });
      }
    },
  );

  const {
    data: roomTypeResponse,
    isLoading: isRoomTypeLoading,
    isError: isRoomTypeError,
    error: roomTypeError,
  } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => await StaffRoomTypeService.getList(),
    staleTime: 30_000,
  });

  const roomTypes = roomTypeResponse?.data ?? [];

  const {
    data: roomResponse,
    isLoading: isRoomLoading,
    isFetching: isRoomFetching,
    isError: isRoomError,
    refetch: refetchRooms,
  } = useQuery({
    queryKey: ["rooms", filters],
    queryFn: async () =>
      StaffRoomService.getList({
        ...filters,
      }),
    staleTime: 10_000,
  });

  const rooms = roomResponse?.data ?? [];
  const paginationMetadata = roomResponse?.pagination;

  const { data: roomDetail, isFetching: isRoomDetailLoading } = useQuery({
    queryKey: ["room", editingRoomId],
    queryFn: () => StaffRoomService.getById(editingRoomId!),
    enabled: !!editingRoomId && dialogState.open,
  });

  useEffect(() => {
    if (editingRoomId && roomDetail) {
      updateForm({
        roomTypeId: roomDetail.roomType.id,
        name: roomDetail.name,
        status: roomDetail.status,
      });
    }
  }, [roomDetail, editingRoomId]);

  const handleSelectRoomType = (roomTypeId?: number) =>
    updateFormFilter({ roomTypeId, page: 1, limit: 6 });

  const handleSearchByName = (keyword: string) =>
    updateFormFilter({ q: keyword, page: 1, limit: 6 });

  const handleChangePage = (pageNumber: number) =>
    onChangeFilter("page", pageNumber);

  const openCreateDialog = () => {
    setEditingRoomId(null);
    resetForm();
    setDialogState({ open: true, mode: "CREATE" });
  };

  const openEditDialog = (roomId: number) => {
    setEditingRoomId(roomId);
    setDialogState({ open: true, mode: "EDIT" });
  };

  const closeDialog = () => {
    setDialogState({ open: false, mode: "CREATE" });
    setEditingRoomId(null);
    resetForm();
  };

  const editStatusRoomHandler = async (id: number, status: RoomStatus) => {
    if (!id) return;

    try {
      await StaffRoomService.update(id, { status });

      await queryClient.invalidateQueries({ queryKey: ["rooms"] });

      showSuccess(t("notifications.statusUpdateSuccess"));
    } catch (error: unknown) {
      showError(getErrorMessage(error, t("notifications.statusUpdateError")));
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: RoomCreationRequest) =>
      StaffRoomService.create({
        roomTypeId: payload.roomTypeId,
        name: payload.name,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
      closeDialog();
      showSuccess(t("notifications.createSuccess"));
    },
    onError: (error: unknown) => {
      showError(getErrorMessage(error, t("notifications.genericError")));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (args: { id: number; payload: RoomUpdateRequest }) =>
      StaffRoomService.update(args.id, {
        name: args.payload.name,
        status: args.payload.status,
        roomTypeId: args.payload.roomTypeId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
      closeDialog();
      showSuccess(t("notifications.updateSuccess"));
    },
    onError: (error: unknown) => {
      showError(getErrorMessage(error, t("notifications.genericError")));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (args: { id: number }) => StaffRoomService.delete(args.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
      showSuccess(t("notifications.deleteSuccess"));
    },
    onError: (error: unknown) => {
      showError(getErrorMessage(error, t("notifications.genericError")));
    },
  });

  const deleteRoom = async (id: number) => {
    await deleteMutation.mutateAsync({ id });
  };

  const roomTypeLabels = useMemo(
    () => roomTypes.map((t) => t.name),
    [roomTypes],
  );

  const activeTabValue = useMemo(() => {
    const selectedType = roomTypes.find(
      (t) => t.id === filters.roomTypeId,
    )?.name;
    return selectedType || "ALL";
  }, [filters.roomTypeId, roomTypes]);

  const handleChangeTab = (tabLabel: string) => {
    const selectedTypeId =
      tabLabel === "ALL"
        ? undefined
        : roomTypes.find((t) => t.name === tabLabel)?.id;
    handleSelectRoomType(selectedTypeId);
  };

  return {
    // Data
    rooms,
    roomTypes,
    paginationMetadata,
    formValues: form,
    formErrors,

    // Filters
    filters,
    handleSearchByName,
    handleChangeTab,
    handleChangePage,

    // Dialog
    dialogState,
    openCreateDialog,
    openEditDialog,
    closeDialog,

    // Form
    handleFormChange: onChangeField,
    submitUpsert,
    deleteRoom,

    // Loading
    isRoomLoading: isRoomLoading || isRoomFetching || isRoomTypeLoading,
    isRoomError,
    refetchRooms,
    isRoomDetailLoading,
    isSubmitting: createMutation.isPending || updateMutation.isPending,

    // UI helpers
    roomTypeLabels,
    activeTabValue,
    isRoomTypeError,
    roomTypeError,

    editStatusRoomHandler,
    alert,
    closeSnackbar,
  };
}
