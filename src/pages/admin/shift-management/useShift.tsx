import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useMemo, useState } from "react";
import useAuth from "@hooks/useAuth";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";
import { useEntityPicker } from "@hooks/useEntityPickerDialog";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import StaffShiftService from "@services/staff/shift.service";
import StaffEmployeeService from "@services/staff/employee.service";
import { ShiftCreationRequest } from "@constant/request/ShiftCreationRequest";
dayjs.extend(isoWeek);

const useShift = () => {
  const queryClient = useQueryClient();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [filters, setFilters] = useState({
    q: "",
    position: "ALL",
  });
  const { canAccessManager } = useAuth();
  const { alert, closeSnackbar, showSuccess, showError } = useSnackbar();
  const { form: dialog, onChangeField: onChangeDialog } = useForm<{
    open: boolean;
  }>({
    open: false,
  });
  const { form, onChangeField, onSubmit, resetForm, updateForm } = useForm<{
    staff?: UserShortResponse;
    workDate: string;
    shiftId: number | null;
  }>(
    {
      staff: undefined,
      workDate: "",
      shiftId: null,
    },
    undefined,
    async () => {
      if (!form.staff || !form.shiftId) return;
      await mCreateShift.mutateAsync({
        shiftId: form.shiftId,
        staffId: form.staff.id,
        workDate: form.workDate,
      });
      closeDialog();
    },
  );
  const [filtersEmployee, setFiltersEmployee] = useState<{
    q?: string;
    page: number;
    limit: number;
  }>({ q: "", page: 1, limit: 4 });
  const {
    selectedId,
    selectedRow,
    setSelectedId,
    open: openEntityPickerDialog,
    openPicker,
    closePicker,
    select,
    mergeOptions,
    resetEntityPicker,
  } = useEntityPicker();
  const start = useMemo(
    () => currentDate.startOf("isoWeek").format("YYYY-MM-DD"),
    [currentDate],
  );

  const end = useMemo(
    () => currentDate.endOf("isoWeek").format("YYYY-MM-DD"),
    [currentDate],
  );

  const canEdit = canAccessManager();

  const { data: shiftDefinitions } = useQuery({
    queryKey: ["shift-definitions"],
    queryFn: async () => await StaffShiftService.getDefinitions(),
  });

  const { user } = useAuth();
  const {
    data: shifts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shift-list", start, end, filters],
    queryFn: async () => {
      if (user?.roleName === "ADMIN" || user?.roleName === "MANAGER") {
        return await StaffShiftService.getSchedule({
          startDate: start,
          endDate: end,
          ...(filters.q ? { q: filters.q } : {}),
          ...(filters.position !== "ALL"
            ? { position: filters.position as any }
            : {}),
        });
      }

      return await StaffShiftService.getMySchedule({
        startDate: start,
        endDate: end,
      });
    },
  });

  const mRemoveShift = useMutation({
    mutationFn: async (id: number) => {
      return await StaffShiftService.remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shift-list", start, end, filters],
      });
      showSuccess("Xóa lịch làm thành công");
    },
    onError: (error) => {
      const msg = error?.message || "Xóa lịch làm thất bại";
      showError(msg);
    },
  });
  const mCreateShift = useMutation({
    mutationFn: async (form: ShiftCreationRequest) =>
      await StaffShiftService.create(form),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shift-list", start, end, filters],
      });
      showSuccess("Tạo ca làm thành công");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Tạo ca làm thất bại";
      showError(msg);
    },
  });

  const nextWeek = () => setCurrentDate((prev) => prev.add(7, "day"));
  const prevWeek = () => setCurrentDate((prev) => prev.subtract(7, "day"));
  const onRemove = async (id: number) => await mRemoveShift.mutateAsync(id);
  const openDialog = (staff: UserShortResponse | null) => {
    if (shiftDefinitions?.length === 0) {
      showError("Có lỗi xảy ra");
      return;
    }
    onChangeDialog("open", true);
    updateForm({
      staff: staff || undefined,
      workDate: dayjs().format("YYYY-MM-DD"),
      shiftId: shiftDefinitions?.[0].id || null,
    });
    if (staff?.id) {
      select(staff);
    }
  };

  const closeDialog = () => {
    onChangeDialog("open", false);
    resetForm();
    resetEntityPicker();
  };

  const { data: employeesResponse, isLoading: isLoadingEmployees } = useQuery({
    queryKey: [
      "employees",
      filtersEmployee.page,
      filtersEmployee.q,
      filtersEmployee.limit,
    ],
    queryFn: async () => await StaffEmployeeService.getList(filtersEmployee),
  });

  const employees = employeesResponse?.data || [];
  const meta = employeesResponse?.pagination;
  const options = mergeOptions(employees);
  const onChangePage = (page: number) =>
    setFiltersEmployee((prev) => ({ ...prev, page }));

  const handleOpenPicker = () => {
    setFiltersEmployee((prev) => ({ ...prev, limit: 10, page: 1, q: "" }));
    openPicker();
  };
  const handleClosePicker = () => {
    setFiltersEmployee((prev) => ({ ...prev, limit: 4, page: 1, q: "" }));
    closePicker();
  };
  const onSearchEmployee = (value: string) =>
    setFiltersEmployee((prev) => ({ ...prev, q: value }));

  const changeFormHandler = (
    field: "staff" | "workDate" | "shiftId",
    value: any,
  ) => {
    if (field === "staff") {
      select(value);
    }
    onChangeField(field, value);
  };

  return {
    shifts,
    shiftDefinitions,
    nextWeek,
    prevWeek,
    start,
    end,
    onRemove,
    canEdit,

    alert,
    closeSnackbar,

    form,
    openDialog,
    closeDialog,
    onSubmit,
    open: dialog.open,
    onChangeForm: changeFormHandler,

    filters,
    setFilters,
    currentDate,
    setCurrentDate,

    options,
    meta,

    selectedId,
    selectedRow,
    setSelectedId,
    openEntityPickerDialog,
    openPicker: handleOpenPicker,
    closePicker: handleClosePicker,
    select,
    mergeOptions,
    onChangePage,
    onSearchEmployee,
    filtersEmployee,
    isLoadingEmployees,
  };
};

export default useShift;
