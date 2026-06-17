import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import { RoomResponse } from "@constant/response/RoomResponse";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { RoomUpdateRequest } from "@constant/request/RoomUpdateRequest";
import { RoomStatus } from "../../../enums/RoomStatus";
import { RoomCreationRequest } from "@constant/request/RoomCreationRequest";
import StaffRoomTypeService from "@services/staff/roomType.service";
import StaffRoomService from "@services/staff/room.service";
import { DialogState } from "@constant/internal/DialogState";

type RoomFilter = SearchFilter & { roomTypeId?: number };

const defaultRoomFilter: RoomFilter = {
  q: "",
  roomTypeId: undefined,
  page: 1,
  limit: 6,
};

function validateForm(form: RoomUpdateRequest) {
  const errors: Partial<Record<keyof RoomUpdateRequest, string>> = {};

  if (!form.name) {
    errors.name = "Tên phòng là bắt buộc.";
  }

  if (!form.roomTypeId) {
    errors.roomTypeId = "Loại phòng là bắt buộc.";
  }

  return errors;
}
export default function useRoomManagement() {
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
    validateForm,
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
      console.log("check:", roomDetail.roomType.id);
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

      showSuccess("Cập nhật trạng thái phòng thành công");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Không thể cập nhật trạng thái phòng";
      showError(msg);
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
      showSuccess("Tạo phòng mới thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra";
      showError(msg);
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
      showSuccess("Cập nhật phòng thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra";
      showError(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (args: { id: number }) => StaffRoomService.delete(args.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
      showSuccess("Xóa phòng thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Có lỗi xảy ra";
      showError(msg);
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
