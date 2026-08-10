import type { DialogMode, DialogState } from "@constant/internal/DialogState";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { EmployeeCreationRequest } from "@constant/request/EmployeeCreationRequest";
import type { EmployeeResetPasswordRequest } from "@constant/request/EmployeeResetPasswordRequest";
import type { EmployeeUpdateRequest } from "@constant/request/EmployeeUpdateRequest";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
import type { UserRole } from "@enums/UserRole";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import StaffEmployeeService from "@services/staff/employee.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

export type EmployeeForm = Partial<UserShortResponse> & {
  newPassword?: string;
  roleName: UserRole;
};

const defaultEmployeeForm: EmployeeForm = {
  fullName: "",
  phone: "",
  email: "",
  active: true,
  newPassword: "",
  roleName: "RECEPTIONIST",
};

const isStaffRole = (
  role: UserRole,
): role is Exclude<UserRole, "USER"> => role !== "USER";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;
  const candidate = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };
  return candidate.response?.data?.message || candidate.message || fallback;
};
const validateForm = (form: EmployeeForm, t: TFunction) => {
  const errors: Partial<Record<keyof EmployeeForm, string>> = {};

  if (!form.fullName?.trim()) {
    errors.fullName = t("validation.fullNameRequired", { ns: "staff" });
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = t("validation.fullNameLength", { ns: "staff" });
  }

  const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
  if (form.phone?.trim() && !phoneRegex.test(form.phone.trim())) {
    errors.phone = t("validation.phoneInvalid", { ns: "staff" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email?.trim()) {
    errors.email = t("validation.emailRequired", { ns: "staff" });
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = t("validation.emailInvalid", { ns: "staff" });
  }

  return errors;
};

const useEmployee = () => {
  const { t } = useTranslation("staff");
  const queryClient = useQueryClient();
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
  });
  const { alert, showError, showSuccess, closeSnackbar } = useSnackbar();
  const [tab, setTab] = useState<"info" | "password">("info");
  const [protectedRole, setProtectedRole] = useState<UserRole | null>(null);
  const isProtectedSystemAdmin = protectedRole === "ADMIN";
  const onChangeTab = (tab: "info" | "password") => setTab(tab);
  const onCloseDialog = () => {
    setTab("info");
    setDialogState((prev) => ({ ...prev, open: false }));
    setSelectedEmployeeId(null);
    setProtectedRole(null);
  };
  const onOpenDialog = (mode: DialogMode) => {
    setTab("info");
    setDialogState({ open: true, mode });
  };
  const { form: filters, onChangeField: onChangeFilters } =
    useForm<SearchFilter>({
      q: "",
      page: 1,
      limit: 10,
    });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const {
    form: employeeForm,
    setForm: setEmployeeForm,
    onChangeField: onChangeEmployeeForm,
    resetForm: resetEmployeeForm,
    onSubmit: onSubmitEmployeeForm,
  } = useForm<EmployeeForm>(
    defaultEmployeeForm,
    undefined,
    async () => {
      if (dialogState.mode === "CREATE" || tab === "info") {
        const errors = validateForm(employeeForm, t);
        if (Object.keys(errors).length) {
          showError(Object.values(errors)[0] || t("validation.incomplete"));
          return;
        }
      }

      if (dialogState.mode === "EDIT" && tab === "password") {
        if (!employeeForm.newPassword?.trim()) {
          showError(t("validation.passwordRequired"));
          return;
        }
      }
      if (dialogState.mode === "CREATE") {
        if (
          !employeeForm.fullName ||
          !employeeForm.phone ||
          !employeeForm.email
        )
          return;
        if (!isStaffRole(employeeForm.roleName)) return;
        await mCreateEmployee.mutateAsync({
          fullName: employeeForm.fullName.trim(),
          phone: employeeForm.phone.trim(),
          email: employeeForm.email.trim(),
          role: employeeForm.roleName,
        });
      }
      if (dialogState.mode === "EDIT") {
        if (tab === "info") {
          if (!selectedEmployeeId) return;
          if (!isStaffRole(employeeForm.roleName)) return;
          const updatePayload: EmployeeUpdateRequest = {
            id: selectedEmployeeId,
            fullName: employeeForm.fullName?.trim(),
            phone: employeeForm.phone?.trim(),
            email: employeeForm.email?.trim(),
            active: employeeForm.active,
          };
          if (!isProtectedSystemAdmin) {
            updatePayload.role = employeeForm.roleName;
          }
          await mUpdateEmployee.mutateAsync(updatePayload);
        } else {
          if (!selectedEmployeeId || !employeeForm.newPassword) return;

          await mResetPassword.mutateAsync({
            id: selectedEmployeeId,
            password: employeeForm.newPassword.trim(),
          });
        }
      }
      resetEmployeeForm();
      onCloseDialog();
    },
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", filters.limit, filters.page, filters.q],
    queryFn: async () => {
      return await StaffEmployeeService.getList({
        ...filters,
        q: filters.q?.trim(),
      });
    },
  });
  const meta = data?.pagination;
  const employees = data?.data || [];

  const { data: employee, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ["employee", selectedEmployeeId],
    queryFn: async () => {
      if (!selectedEmployeeId) return;
      return await StaffEmployeeService.getById(selectedEmployeeId);
    },
    enabled: !!selectedEmployeeId,
  });
  useEffect(() => {
    if (!dialogState.open) return;

    if (dialogState.mode === "CREATE") {
      setProtectedRole(null);
      setEmployeeForm(defaultEmployeeForm);
    }

    if (dialogState.mode === "EDIT" && !isLoadingEmployee && employee) {
      setProtectedRole(employee.roleName === "ADMIN" ? "ADMIN" : null);
      setEmployeeForm({
        ...employee,
        newPassword: "",
      });
    }
  }, [dialogState.open, dialogState.mode, employee, isLoadingEmployee, setEmployeeForm]);

  const onEdit = (id: string) => {
    setSelectedEmployeeId(id);
    setTab("info");
    onOpenDialog("EDIT");
  };
  const onResetPassword = (id: string) => {
    setSelectedEmployeeId(id);
    setDialogState({ open: true, mode: "EDIT" });
    setTab("password");
  };
  const handleChangeEmployeeForm = <K extends keyof EmployeeForm>(
    field: K,
    value: EmployeeForm[K],
  ) => {
    if (field === "roleName" && isProtectedSystemAdmin) return;
    onChangeEmployeeForm(field, value);
  };
  const onToggle = async (id: string, active: boolean) => {
    if (mUpdateEmployee.isPending) return false;

    try {
      await mUpdateEmployee.mutateAsync({
        id,
        active,
      });
      return true;
    } catch {
      return false;
    }
  };

  const mUpdateEmployee = useMutation({
    mutationFn: async (data: EmployeeUpdateRequest) => {
      return await StaffEmployeeService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees", filters.limit, filters.page, filters.q],
      });

      queryClient.invalidateQueries({
        queryKey: ["employee", selectedEmployeeId],
      });

      showSuccess(t("messages.updateSuccess"));
    },
    onError: (error) => {
      showError(getErrorMessage(error, t("messages.updateError")));
    },
  });

  const mResetPassword = useMutation({
    mutationFn: async (data: EmployeeResetPasswordRequest) => {
      return await StaffEmployeeService.resetPassword(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees", filters.limit, filters.page, filters.q],
      });

      queryClient.invalidateQueries({
        queryKey: ["employee", selectedEmployeeId],
      });

      showSuccess(t("messages.passwordSuccess"));
    },
    onError: (error) => {
      showError(getErrorMessage(error, t("messages.passwordError")));
    },
  });

  const mCreateEmployee = useMutation({
    mutationFn: async (data: EmployeeCreationRequest) => {
      return await StaffEmployeeService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees", filters.limit, filters.page, filters.q],
      });

      queryClient.invalidateQueries({
        queryKey: ["employee", selectedEmployeeId],
      });
      showSuccess(t("messages.createSuccess"));
    },
    onError: (error) => {
      showError(getErrorMessage(error, t("messages.createError")));
    },
  });

  return {
    employees,
    isLoading,
    isError,
    refetch,
    filters,
    onChangeFilters,
    meta,
    onEdit,
    onResetPassword,
    onToggle,
    employeeForm,
    isLoadingEmployee,
    onCloseDialog,
    onOpenDialog,
    alert,
    closeSnackbar,
    dialogState,
    onChangeEmployeeForm: handleChangeEmployeeForm,
    onSubmitEmployeeForm,
    tab,
    onChangeTab,
    isSaving:
      mCreateEmployee.isPending ||
      mUpdateEmployee.isPending ||
      mResetPassword.isPending,
  };
};
export default useEmployee;
