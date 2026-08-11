import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useMemo, useState } from "react";
import useAuth from "@hooks/useAuth";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";
import { useEntityPicker } from "@hooks/useEntityPickerDialog";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
import type { StaffShiftResponse } from "@constant/response/StaffShiftResponse";
import StaffShiftService from "@services/staff/shift.service";
import StaffEmployeeService from "@services/staff/employee.service";
import type { ShiftCreationRequest } from "@constant/request/ShiftCreationRequest";
import type { UserRole } from "@enums/UserRole";
import { useTranslation } from "react-i18next";
dayjs.extend(isoWeek);

type PositionFilter = UserRole | "ALL";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;
  const candidate = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };
  return candidate.response?.data?.message || candidate.message || fallback;
};

const useShift = () => {
  const { t } = useTranslation("schedules");
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState(() => ({
    start: dayjs().startOf("isoWeek").format("YYYY-MM-DD"),
    end: dayjs().endOf("isoWeek").format("YYYY-MM-DD"),
  }));
  const [filters, setFilters] = useState<{
    q: string;
    position: PositionFilter;
  }>({
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
    open: openEntityPickerDialog,
    openPicker,
    closePicker,
    select,
    mergeOptions,
    resetEntityPicker,
  } = useEntityPicker<UserShortResponse>();
  const start = dateRange.start;
  const end = dateRange.end;

  const canEdit = canAccessManager();

  const { data: shiftDefinitions, isLoading: isLoadingDefinitions } = useQuery({
    queryKey: ["shift-definitions"],
    queryFn: async () => await StaffShiftService.getDefinitions(),
  });

  const { user } = useAuth();
  const isManager = user?.roleName === "ADMIN" || user?.roleName === "MANAGER";
  const managerSchedule = useInfiniteQuery({
    queryKey: ["shift-list", start, end, filters],
    initialPageParam: 0,
    enabled: isManager,
    queryFn: async ({ pageParam }) =>
      await StaffShiftService.getSchedule({
        page: pageParam,
        limit: 10,
        startDate: start,
        endDate: end,
        sort: "name,asc",
        ...(filters.q ? { q: filters.q } : {}),
        ...(filters.position !== "ALL" ? { position: filters.position } : {}),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNext
        ? (lastPage.pagination.page ?? 0) + 1
        : undefined,
  });
  const personalSchedule = useQuery({
    queryKey: ["my-shift-list", start, end],
    enabled: !isManager,
    queryFn: async () => {
      return await StaffShiftService.getMySchedule({
        startDate: start,
        endDate: end,
      });
    },
  });
  const shifts = useMemo(() => {
    if (!isManager) return personalSchedule.data || [];

    const uniqueRows = new Map<string, StaffShiftResponse>();
    managerSchedule.data?.pages.forEach((response) => {
      response.data.forEach((row) => uniqueRows.set(row.staff.id, row));
    });
    return Array.from(uniqueRows.values());
  }, [isManager, managerSchedule.data, personalSchedule.data]);
  const isLoading = isManager
    ? managerSchedule.isLoading
    : personalSchedule.isLoading;
  const isError = isManager ? managerSchedule.isError : personalSchedule.isError;
  const refetch = isManager ? managerSchedule.refetch : personalSchedule.refetch;

  const mRemoveShift = useMutation({
    mutationFn: async (id: number) => {
      return await StaffShiftService.remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shift-list", start, end, filters],
      });
      showSuccess(t("notifications.removeSuccess"));
    },
    onError: (error) => {
      showError(getErrorMessage(error, t("notifications.removeError")));
    },
  });
  const mCreateShift = useMutation({
    mutationFn: async (form: ShiftCreationRequest) =>
      await StaffShiftService.create(form),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shift-list", start, end, filters],
      });
      showSuccess(t("notifications.createSuccess"));
    },
    onError: (error) => {
      showError(getErrorMessage(error, t("notifications.createError")));
    },
  });

  const shiftDateRange = (direction: 1 | -1) => {
    const dayCount = dayjs(end).diff(dayjs(start), "day") + 1;
    setDateRange((previous) => ({
      start: dayjs(previous.start).add(direction * dayCount, "day").format("YYYY-MM-DD"),
      end: dayjs(previous.end).add(direction * dayCount, "day").format("YYYY-MM-DD"),
    }));
  };
  const nextWeek = () => shiftDateRange(1);
  const prevWeek = () => shiftDateRange(-1);
  const applyDateRange = (rangeStart: string, rangeEnd: string) => {
    if (!rangeStart || !rangeEnd || dayjs(rangeEnd).isBefore(rangeStart, "day")) {
      return;
    }
    setDateRange({ start: rangeStart, end: rangeEnd });
  };
  const onRemove = async (id: number) => await mRemoveShift.mutateAsync(id);
  const onImportSuccess = (count: number) => {
    queryClient.invalidateQueries({ queryKey: ["shift-list"] });
    showSuccess(t("notifications.importSuccess", { count }));
  };
  const openDialog = (
    staff: UserShortResponse | null,
    workDate = dayjs().format("YYYY-MM-DD"),
  ) => {
    if (shiftDefinitions?.length === 0) {
      showError(t("notifications.noShiftDefinitions"));
      return;
    }
    onChangeDialog("open", true);
    updateForm({
      staff: staff || undefined,
      workDate,
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

  type ShiftForm = typeof form;
  const changeFormHandler = <K extends keyof ShiftForm>(
    field: K,
    value: ShiftForm[K],
  ) => {
    if (field === "staff" && value && typeof value === "object") {
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
    onImportSuccess,
    canEdit,
    isLoading,
    isError,
    refetch,
    isCreating: mCreateShift.isPending,
    isRemoving: mRemoveShift.isPending,
    isLoadingDefinitions,

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
    applyDateRange,
    hasNextPage: managerSchedule.hasNextPage,
    loadMore: managerSchedule.fetchNextPage,
    isLoadingMore: managerSchedule.isFetchingNextPage,

    options,
    meta,

    selectedId,
    openEntityPickerDialog,
    openPicker: handleOpenPicker,
    closePicker: handleClosePicker,
    select,
    onChangePage,
    onSearchEmployee,
    filtersEmployee,
    isLoadingEmployees,
  };
};

export default useShift;
