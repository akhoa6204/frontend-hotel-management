import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import type { RoomTypeUpdateRequest } from "@constant/request/RoomTypeUpdateRequest";
import type { AmenityResponse } from "@constant/response/AmenityResponse";
import type { RoomTypeImageResponse } from "@constant/response/RoomTypeImageResponse";
import UploadImageService from "@services/UploadImageService";
import type {
  RoomTypeCreationRequest,
  RoomTypeImageMetadata,
} from "@constant/request/RoomTypeCreationRequest";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import StaffRoomTypeService from "@services/staff/roomType.service";
import StaffAmenityService from "@services/staff/amenity.service";
import type { DialogState } from "@constant/internal/DialogState";
import { useTranslation } from "react-i18next";

export type UpsertFormRoomType = RoomTypeUpdateRequest & {
  roomTypeId?: number;
  amenitiesResponse?: AmenityResponse[];
  roomTypeImagesResponse?: RoomTypeImageResponse[];
  files: File[];
};
interface ValidationMessages {
  invalidPrice: string;
  capacityRequired: string;
  invalidCapacity: string;
}

const validateForm = (
  form: UpsertFormRoomType,
  messages: ValidationMessages,
) => {
  const errors: Partial<Record<keyof UpsertFormRoomType, string>> = {};

  if (!form.basePrice || isNaN(Number(form.basePrice))) {
    errors.basePrice = messages.invalidPrice;
  }

  if (!form.capacity) {
    errors.capacity = messages.capacityRequired;
  } else if (isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
    errors.capacity = messages.invalidCapacity;
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

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: unknown } } })
      .response;
    if (typeof response?.data?.message === "string") {
      return response.data.message;
    }
  }

  return error instanceof Error && error.message ? error.message : fallback;
};

const useRoomTypesManagement = () => {
  const { t } = useTranslation("roomTypes");
  const qc = useQueryClient();

  const [filters, setFilters] = useState<SearchFilter>({
    q: "",
    page: 1,
    limit: 6,
  });

  const [dialogState, setDialogState] = useState<DialogState>({ open: false });
  const [editingId, setEditingId] = useState<number | undefined>();
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const { form, updateForm, onChangeField, resetForm, setForm, errors, onSubmit } =
    useForm<UpsertFormRoomType>(
      initialForm,
      (values) =>
        validateForm(values, {
          invalidPrice: t("validation.invalidPrice"),
          capacityRequired: t("validation.capacityRequired"),
          invalidCapacity: t("validation.invalidCapacity"),
        }),
      async () => {
        setIsUploadingImages(form.files.length > 0);
        const uploadedImageMetadata: RoomTypeImageMetadata[] = [];
        let entityMutationStarted = false;
        try {
          await Promise.all(
            form.files.map(async (file, index) => {
              const image = await UploadImageService.upload({
                file,
                context: "room-types",
              });
              uploadedImageMetadata[index] = {
                secureUrl: image.secure_url,
                publicId: image.public_id,
              };
            }),
          );

          const existingImageMetadata = (form.roomTypeImagesResponse || [])
            .filter((image) => !image.url.startsWith("blob:"))
            .map((image) => ({
              secureUrl: image.url,
              publicId: image.publicId,
              alt: image.alt,
            }));
          const roomTypeImageMetadata = [
            ...existingImageMetadata,
            ...uploadedImageMetadata,
          ];
          const roomTypeImages = roomTypeImageMetadata.map(
            (image) => image.secureUrl,
          );

          entityMutationStarted = true;

          if (dialogState.mode === "EDIT" && editingId) {
            await updateMutation.mutateAsync({
              id: editingId,
              payload: {
                ...form,
                roomTypeImages,
                roomTypeImageMetadata,
              },
            });
          } else {
            await createMutation.mutateAsync({
              name: form.name || "",
              description: form.description || "",
              basePrice: form.basePrice || 0,
              capacity: form.capacity || 2,
              amenities: form.amenities || [],
              roomTypeImages,
              roomTypeImageMetadata,
            });
          }
        } catch (error) {
          await Promise.allSettled(
            uploadedImageMetadata
              .map((image) => image.publicId)
              .filter((publicId): publicId is string => Boolean(publicId))
              .map((publicId) =>
                UploadImageService.deleteUploadedImage(publicId),
              ),
          );

          if (!entityMutationStarted) {
            showError(
              getErrorMessage(
                error,
                dialogState.mode === "EDIT"
                  ? t("notifications.updateError")
                  : t("notifications.createError"),
              ),
            );
          }
        } finally {
          setIsUploadingImages(false);
        }
      },
    );

  const { alert, closeSnackbar, showError, showSuccess } = useSnackbar();

  const { data, isLoading, isError, refetch } = useQuery({
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

  const { data: roomTypeDetail, isLoading: isDetailLoading } = useQuery({
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
      roomTypeImageMetadata: roomTypeDetail.roomTypeImages?.map((image) => ({
        secureUrl: image.url,
        publicId: image.publicId,
        alt: image.alt,
      })),
      amenitiesResponse: roomTypeDetail.amenities || [],
      roomTypeImagesResponse: roomTypeDetail.roomTypeImages || [],
      files: [],
    });
  }, [roomTypeDetail, dialogState.mode]);

  const handlePickFiles = (files: File[]) => {
    const currentCount = form.roomTypeImagesResponse?.length ?? 0;
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
        .filter((img) => !img.url.startsWith("blob:"))
        .map((img) => img.url)
        .filter(Boolean);

      const nextRoomTypeImageMetadata = nextImages
        .filter((img) => !img.url.startsWith("blob:"))
        .map((img) => ({
          secureUrl: img.url,
          publicId: img.publicId,
          alt: img.alt,
        }));

      const uploadedCount = prev.roomTypeImagesResponse?.length || 0;

      const fileIndex = index - (uploadedCount - prev.files.length);

      const nextFiles = [...prev.files];

      if (fileIndex >= 0 && fileIndex < prev.files.length) {
        nextFiles.splice(fileIndex, 1);
      }

      return {
        ...prev,
        roomTypeImagesResponse: nextImages,
        roomTypeImages: nextRoomTypeImages,
        roomTypeImageMetadata: nextRoomTypeImageMetadata,
        files: nextFiles,
      };
    });
  };

  const createMutation = useMutation({
    mutationFn: (payload: RoomTypeCreationRequest) =>
      StaffRoomTypeService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roomTypes"] });
      showSuccess(t("notifications.createSuccess"));
      onClose();
    },
    onError: (error: unknown) => {
      showError(getErrorMessage(error, t("notifications.createError")));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; payload: RoomTypeUpdateRequest }) =>
      StaffRoomTypeService.update(vars.id, vars.payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roomTypes"] });
      showSuccess(t("notifications.updateSuccess"));
      onClose();
    },
    onError: (error: unknown) => {
      showError(getErrorMessage(error, t("notifications.updateError")));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => StaffRoomTypeService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roomTypes"] });
      showSuccess(t("notifications.deleteSuccess"));
    },
    onError: (error: unknown) => {
      showError(getErrorMessage(error, t("notifications.deleteError")));
    },
  });

  const handleDeleteRoomType = (id: number) => deleteMutation.mutateAsync(id);

  const showAddButton = (meta?.total ?? 0) < 6;

  return {
    showAddButton,

    roomTypes,
    meta,
    isLoading,
    isError,
    refetch,

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
    errors,
    onChange: onChangeField,

    onPickFiles: handlePickFiles,
    onRemoveImage: handleRemoveImage,

    handleDeleteRoomType,
    isDeleting: deleteMutation.isPending,
    isDetailLoading,

    onSubmit,
    isSaving: isUploadingImages || createMutation.isPending || updateMutation.isPending,

    alert,
    closeSnackbar,
  };
};

export default useRoomTypesManagement;
