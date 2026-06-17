import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";
import { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import { RoomTypeUpdateRequest } from "@constant/request/RoomTypeUpdateRequest";
import { AmenityResponse } from "@constant/response/AmenityResponse";
import { RoomTypeImageResponse } from "@constant/response/RoomTypeImageResponse";
import UploadImageService from "@services/UploadImageService";
import { RoomTypeCreationRequest } from "@constant/request/RoomTypeCreationRequest";
import { SearchFilter } from "@constant/internal/SearchFilter";
import StaffRoomTypeService from "@services/staff/roomType.service";
import StaffAmenityService from "@services/staff/amenity.service";
import { DialogState } from "@constant/internal/DialogState";

export type UpsertFormRoomType = RoomTypeUpdateRequest & {
  roomTypeId?: number;
  amenitiesResponse?: AmenityResponse[];
  roomTypeImagesResponse?: RoomTypeImageResponse[];
  files: File[];
};
const validateForm = (form: UpsertFormRoomType) => {
  const errors: Partial<Record<keyof UpsertFormRoomType, string>> = {};

  if (!form.basePrice || isNaN(Number(form.basePrice))) {
    errors.basePrice = "Giá phòng là bắt buộc và phải là một số hợp lệ.";
  }

  if (!form.capacity) {
    errors.capacity = "Số người là bắt buộc.";
  } else if (isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
    errors.capacity = "Số người phải là một số lớn hơn 0.";
  }

  return errors;
};
const initialForm: UpsertFormRoomType = {
  roomTypeId: undefined,
  name: "",
  basePrice: undefined,
  capacity: undefined,
  description: "",
  amenities: [],
  roomTypeImages: [],
  files: [],
  amenitiesResponse: [],
  roomTypeImagesResponse: [],
};

const useRoomTypesManagement = () => {
  const qc = useQueryClient();

  const [filters, setFilters] = useState<SearchFilter>({
    q: "",
    page: 1,
    limit: 6,
  });

  const [dialogState, setDialogState] = useState<DialogState>({ open: false });
  const [editingId, setEditingId] = useState<number | undefined>();
  const { form, updateForm, onChangeField, resetForm, setForm, onSubmit } =
    useForm<UpsertFormRoomType>(initialForm, validateForm, async () => {
      const uploadedImages =
        form.files.length > 0
          ? await Promise.all(
              form.files.map((file) => {
                console.log(file);

                return UploadImageService.upload({ file });
              }),
            )
          : [];
      console.log(dialogState.mode);

      if (dialogState.mode === "EDIT" && editingId) {
        updateMutation.mutateAsync({
          id: editingId,
          payload: {
            ...form,
            roomTypeImages: [
              ...(form.roomTypeImages || []),
              ...uploadedImages.map((image) => image.secure_url),
            ],
          },
        });
      } else {
        createMutation.mutateAsync({
          name: form.name || "",
          description: form.description || "",
          basePrice: form.basePrice || 0,
          capacity: form.capacity || 2,
          amenities: form.amenities || [],
          roomTypeImages: [...uploadedImages.map((image) => image.secure_url)],
        });
      }
    });

  const { alert, closeSnackbar, showError, showSuccess } = useSnackbar();

  const { data, isLoading } = useQuery({
    queryKey: ["roomTypes", filters],
    queryFn: () =>
      StaffRoomTypeService.getList({
        page: filters.page,
        limit: filters.limit,
        q: filters.q,
      }),
  });

  const roomTypes: RoomTypeResponse[] = data?.data ?? [];
  const meta = data?.pagination;

  const handleSearch = (keyword: string) =>
    setFilters((s) => ({ ...s, q: keyword, page: 1 }));

  const handleChangePage = (page: number) =>
    setFilters((s) => ({ ...s, page }));

  const {
    data: amenityOptions,
    isLoading: isAmenitiesLoading,
    error: amenitiesError,
  } = useQuery({
    queryKey: ["amenities"],
    queryFn: () => StaffAmenityService.getAll(),
  });

  const onClose = () => {
    setDialogState({ open: false });
    setEditingId(undefined);
    resetForm();
  };

  const onCreateDialog = () => {
    resetForm();
    setEditingId(undefined);
    setDialogState({ open: true, mode: "CREATE" });
  };

  const onEditDialog = (id: number) => {
    setEditingId(id);
    setDialogState({ open: true, mode: "EDIT" });
  };

  const { data: roomTypeDetail } = useQuery({
    queryKey: ["roomDetail", editingId],
    queryFn: () => StaffRoomTypeService.getById(editingId as number),
    enabled: !!editingId && dialogState.open && dialogState.mode === "EDIT",
  });

  useEffect(() => {
    if (!roomTypeDetail || dialogState.mode !== "EDIT") return;

    updateForm({
      roomTypeId: roomTypeDetail.id,
      name: roomTypeDetail.name || "",
      basePrice: roomTypeDetail.basePrice || undefined,
      capacity: roomTypeDetail.capacity || undefined,
      description: roomTypeDetail.description || "",
      amenities: roomTypeDetail.amenities.map((amenity) => amenity.id),
      roomTypeImages: roomTypeDetail.roomTypeImages?.map((image) => image.url),
      amenitiesResponse: roomTypeDetail.amenities || [],
      roomTypeImagesResponse: roomTypeDetail.roomTypeImages || [],
      files: [],
    });
  }, [roomTypeDetail, dialogState.mode]);

  const handlePickFiles = (files: File[]) => {
    const currentCount = form.roomTypeImages?.length ?? 0;
    if (currentCount >= 8) return;

    const allow = Math.max(0, 8 - currentCount);
    const toAdd = files.slice(0, allow);

    const previews = toAdd.map((f) => ({
      url: URL.createObjectURL(f),
    }));

    updateForm({
      ...form,
      files: [...form.files, ...toAdd],
      roomTypeImagesResponse: [
        ...(form.roomTypeImagesResponse || []),
        ...previews,
      ],
    });
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => {
      const nextImages = [...(prev.roomTypeImagesResponse || [])];
      nextImages.splice(index, 1);

      const nextRoomTypeImages = nextImages
        .map((img) => img.url)
        .filter(Boolean);

      const uploadedCount = prev.roomTypeImagesResponse?.length || 0;

      const fileIndex = index - (uploadedCount - prev.files.length);

      let nextFiles = [...prev.files];

      if (fileIndex >= 0 && fileIndex < prev.files.length) {
        nextFiles.splice(fileIndex, 1);
      }

      return {
        ...prev,
        roomTypeImagesResponse: nextImages,
        roomTypeImages: nextRoomTypeImages,
        files: nextFiles,
      };
    });
  };

  const createMutation = useMutation({
    mutationFn: (payload: RoomTypeCreationRequest) =>
      StaffRoomTypeService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roomTypes"] });
      showSuccess("Tạo loại phòng thành công");
      onClose();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message;
      showError(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; payload: any }) =>
      StaffRoomTypeService.update(vars.id, vars.payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roomTypes"] });
      showSuccess("Cập nhật loại phòng thành công");
      onClose();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message;
      showError(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => StaffRoomTypeService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roomTypes"] });
      showSuccess("Xóa loại phòng thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message;
      showError(msg);
    },
  });

  const handleDeleteRoomType = (id: number) => {
    deleteMutation.mutate(id);
  };

  const showAddButton = meta?.total ? meta?.total < 6 : false;

  return {
    showAddButton,

    roomTypes,
    meta,
    isLoading,

    amenityOptions,
    isAmenitiesLoading,
    amenitiesError,

    filters,
    handleSearch,
    handleChangePage,

    dialogState,
    onClose,
    onCreateDialog,
    onEditDialog,

    form,
    onChange: onChangeField,

    onPickFiles: handlePickFiles,
    onRemoveImage: handleRemoveImage,

    handleDeleteRoomType,
    isDeleting: deleteMutation.isPending,

    onSubmit,
    isSaving: createMutation.isPending || updateMutation.isPending,

    alert,
    closeSnackbar,
  };
};

export default useRoomTypesManagement;
