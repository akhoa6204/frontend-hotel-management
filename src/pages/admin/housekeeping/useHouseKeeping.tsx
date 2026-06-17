import { DialogMode, DialogState } from "@constant/internal/DialogState";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { HousekeepingCreationRequest } from "@constant/request/HousekeepingCreationRequest";
import { HousekeepingUpdateRequest } from "@constant/request/HousekeepingUpdateRequest";
import { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";
import { RoomResponse } from "@constant/response/RoomResponse";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import { HousekeepingTaskType } from "@enums/HousekeepingTaskType";
import useAuth from "@hooks/useAuth";
import { useEntityPicker } from "@hooks/useEntityPickerDialog";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import StaffEmployeeService from "@services/staff/employee.service";
import StaffHousekeepingService from "@services/staff/housekeeping.service";
import StaffRoomService from "@services/staff/room.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

type Filter = SearchFilter & {
  status: HousekeepingTaskStatus | "ALL";
};
export type TaskForm = Partial<HouseKeepingTaskResponse> & {
  roomId?: number;
  staffId?: string;
  status: HousekeepingTaskStatus;
  note?: string;
};
const validateForm = (form: TaskForm) => {
  const errors: Partial<Record<keyof TaskForm, string>> = {};

  if (!form.roomId) {
    errors.roomId = "Vui lòng chọn phòng";
  }

  if (!form.staffId) {
    errors.staffId = "Vui lòng chọn nhân viên";
  }

  return errors;
};
const useHouseKeeping = () => {
  const queryClient = useQueryClient();
  const { canAccessManager, hasRole } = useAuth();
  const { alert, closeSnackbar, showError, showSuccess } = useSnackbar();
  const { form: filters, onChangeField: onChangeFilter } = useForm<Filter>({
    q: "",
    status: "ALL",
    page: 1,
    limit: 8,
  });

  const notHouseKeeping = canAccessManager() || hasRole("RECEPTIONIST");

  const { data: tasksResponse, isLoading } = useQuery({
    queryKey: ["housekeeping-tasks", notHouseKeeping ? "all" : "me", filters],
    queryFn: async () => {
      const params = {
        ...filters,
        status: filters.status === "ALL" ? undefined : filters.status,
      };

      return notHouseKeeping
        ? await StaffHousekeepingService.getList(params)
        : await StaffHousekeepingService.getMyList(params);
    },
  });

  const meta = useMemo(
    () => tasksResponse?.pagination,
    [tasksResponse?.pagination],
  );
  const tasks = useMemo(() => tasksResponse?.data || [], [tasksResponse?.data]);
  const handleChangePage = (pageNumber: number) =>
    onChangeFilter("page", pageNumber);

  const mUpdateTask = useMutation({
    mutationFn: async (data: HousekeepingUpdateRequest) =>
      await StaffHousekeepingService.update(data),
    onSuccess: () => {
      showSuccess("Cập nhật nội dung nhiệm vụ phòng thành công");
      queryClient.invalidateQueries({
        queryKey: ["housekeeping-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["housekeeping-tasks", selectedTaskId],
      });
    },
    onError(error, variables, onMutateResult, context) {
      const msg = error.message || "Cập nhật nội dung nhiệm vụ phòng thất bại";
      showError(msg);
    },
  });
  const handleUpdateTask = async (data: HousekeepingUpdateRequest) =>
    await mUpdateTask.mutateAsync(data);

  const [dialog, setDialog] = useState<DialogState>({
    open: false,
  });
  const [filtersRoom, setFiltersRoom] = useState<{
    q?: string;
    page: number;
    limit: number;
  }>({ q: "", page: 1, limit: 4 });
  const [filtersStaff, setFiltersStaff] = useState<{
    q?: string;
    page: number;
    limit: number;
  }>({ q: "", page: 1, limit: 4 });
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const { form, onChangeField, onSubmit, resetForm, updateForm } =
    useForm<TaskForm>(
      {
        roomId: undefined,
        staffId: undefined,
        type: "CLEANING",
        status: "PENDING",
        updatedAt: undefined,
        note: undefined,
      },
      validateForm,
      async () => {
        if (dialog.mode === "CREATE") {
          if (!form.roomId || !form.staffId) return;
          await mCreateTask.mutateAsync({
            roomId: form.roomId,
            staffId: form.staffId,
            type: form.type as HousekeepingTaskType,
          });
        } else {
          if (!selectedTaskId) return;
          await mUpdateTask.mutateAsync({
            id: selectedTaskId,
            roomId: form.roomId,
            staffId: form.staffId,
            type: form.type as HousekeepingTaskType,
            status: form.status,
            note: form.note,
          });
        }
        onClose();
      },
    );
  const mCreateTask = useMutation({
    mutationFn: async (data: HousekeepingCreationRequest) =>
      await StaffHousekeepingService.create(data),
    onSuccess: () => {
      showSuccess("Tạo nhiệm vụ phòng thành công");
      queryClient.invalidateQueries({
        queryKey: [
          "rooms-list",
          filtersRoom.q,
          filtersRoom.page,
          filtersRoom.limit,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["housekeeping-tasks", selectedTaskId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "staffs-list",
          filtersStaff.q,
          filtersStaff.page,
          filtersStaff.limit,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["housekeeping-tasks", filters],
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Tạo nhiệm vụ phòng thất bại";

      showError(msg);
    },
  });
  const { data: task, isLoading: loadingTask } = useQuery({
    queryKey: ["housekeeping-tasks", selectedTaskId],
    queryFn: async () => {
      if (!selectedTaskId) return;
      return await StaffHousekeepingService.getById(selectedTaskId);
    },
    enabled: !!selectedTaskId,
  });
  useEffect(() => {
    if (!task) return;
    selectRoom(task.room);
    if (task.staff) {
      selectStaff(task.staff);
    }
    updateForm({
      roomId: task.room.id,
      staffId: task.staff?.id || undefined,
      ...task,
    });
  }, [task]);

  const {
    selectedId: selectedIdRoom,
    selectedRow: selectedRowRoom,
    setSelectedId: setSelectedIdRoom,
    open: openEntityPickerRoomDialog,
    openPicker: openPickerRoom,
    closePicker: onClosePickerRoom,
    select: selectRoom,
    mergeOptions: mergeOptionsRoom,
    resetEntityPicker: resetEntityPickerRoom,
  } = useEntityPicker<RoomResponse>();

  const {
    selectedId: selectedIdStaff,
    selectedRow: selectedRowStaff,
    setSelectedId: setSelectedIdStaff,
    open: openEntityPickerStaffDialog,
    openPicker: openPickerStaff,
    closePicker: onClosePickerStaff,
    select: selectStaff,
    mergeOptions: mergeOptionsStaff,
    resetEntityPicker: resetEntityPickerStaff,
  } = useEntityPicker<UserShortResponse>();

  const openPickerRoomHandler = () => {
    setFiltersRoom((pre) => ({ ...pre, limit: 7 }));
    openPickerRoom();
  };
  const openPickerStaffHandler = () => {
    setFiltersStaff((pre) => ({ ...pre, limit: 7 }));
    openPickerStaff();
  };
  const closePickerRoomHandler = () => {
    setFiltersRoom({ limit: 4, q: "", page: 1 });
    onClosePickerRoom();
  };
  const closePickerStaffHandler = () => {
    setFiltersStaff({ limit: 4, q: "", page: 1 });
    onClosePickerStaff();
  };
  const onChange = (field: keyof TaskForm, value: any) => {
    if (field === "roomId") {
      setSelectedIdRoom(value);
    }
    if (field === "staffId") {
      setSelectedIdStaff(value);
    }
    onChangeField(field, value);
  };
  const onOpen = (mode: DialogMode, id?: number) => {
    setDialog({ open: true, mode });
    if (id) {
      setSelectedTaskId(id);
    }
  };
  const onClose = () => {
    setDialog({ open: false });
    resetForm();
    setSelectedTaskId(null);
    resetEntityPickerRoom();
    resetEntityPickerStaff();
    setFiltersRoom({ q: "", page: 1, limit: 4 });
    setFiltersStaff({ q: "", page: 1, limit: 4 });
  };
  const canEditForm = dialog.mode !== "VIEW";
  console.log(dialog);

  const { data: roomsResponse, isLoading: loadingRooms } = useQuery({
    queryKey: [
      "rooms-list",
      filtersRoom.q,
      filtersRoom.page,
      filtersRoom.limit,
    ],
    queryFn: async () => await StaffRoomService.getList(filtersRoom),
    enabled: notHouseKeeping,
  });
  const rooms = roomsResponse?.data || [];
  const metaRooms = roomsResponse?.pagination;
  const onSearchRoom = (value: string) =>
    setFiltersRoom((pre) => ({ ...pre, q: value }));
  const optionsRoom = mergeOptionsRoom(rooms);
  const isMoreRoom = (metaRooms?.totalPages || 1) > 1;

  const onPageChangeRoom = (page: number) =>
    setFiltersRoom((pre) => ({ ...pre, page }));

  const { data: staffsResponse, isLoading: loadingStaffs } = useQuery({
    queryKey: [
      "staffs-list",
      filtersStaff.q,
      filtersStaff.page,
      filtersStaff.limit,
    ],
    queryFn: async () =>
      await StaffEmployeeService.getList({
        ...filtersStaff,
        role: "HOUSEKEEPING",
      }),
  });
  const staffs: UserShortResponse[] = Array.isArray(staffsResponse?.data)
    ? staffsResponse.data
    : [];
  const metaStaffs = staffsResponse?.pagination;
  const onSearchStaff = (value: string) =>
    setFiltersStaff((pre) => ({ ...pre, q: value }));
  const optionsStaff = mergeOptionsStaff(staffs);
  const isMoreStaff = (metaStaffs?.totalPages || 1) > 1;

  const onPageChangeStaff = (page: number) => {
    setFiltersStaff((pre) => ({ ...pre, page }));
  };
  return {
    tasks,
    meta,
    notHouseKeeping,
    filters,
    onChangeFilter,
    handleChangePage,
    handleUpdateTask,

    alert,
    closeSnackbar,

    open: dialog.open,
    mode: dialog.mode,
    onOpen,
    form,
    onChange,
    onSubmit,
    onClose,
    canEditForm,
    optionsRoom,
    isMoreRoom,
    openPickerRoom: openPickerRoomHandler,
    optionsStaff,
    isMoreStaff,
    openPickerStaff: openPickerStaffHandler,
    loadingTask,

    rooms,
    openEntityPickerRoomDialog,
    onClosePickerRoom: closePickerRoomHandler,
    selectedIdRoom,
    filtersRoom,
    onSearchRoom,
    metaRooms,
    onPageChangeRoom,
    selectRoom,
    loadingRooms,

    staffs,
    openEntityPickerStaffDialog,
    onClosePickerStaff: closePickerStaffHandler,
    selectedIdStaff,
    filtersStaff,
    onSearchStaff,
    metaStaffs,
    onPageChangeStaff,
    selectStaff,
    loadingStaffs,
  };
};
export default useHouseKeeping;
