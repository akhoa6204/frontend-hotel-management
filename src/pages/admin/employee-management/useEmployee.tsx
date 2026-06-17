import { DialogMode, DialogState } from "@constant/internal/DialogState";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { EmployeeCreationRequest } from "@constant/request/EmployeeCreationRequest";
import { EmployeeResetPasswordRequest } from "@constant/request/EmployeeResetPasswordRequest";
import { EmployeeUpdateRequest } from "@constant/request/EmployeeUpdateRequest";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import { UserRole } from "@enums/UserRole";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import StaffEmployeeService from "@services/staff/employee.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type EmployeeForm = Partial<UserShortResponse> & {
  newPassword?: string;
  roleName: Omit<UserRole, "USER">;
};
const validateForm = (form: EmployeeForm) => {
  const errors: Partial<Record<keyof EmployeeForm, string>> = {};

  if (!form.fullName?.trim()) {
    errors.fullName = "Họ tên không được để trống";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Họ tên phải có ít nhất 2 ký tự";
  }

  const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
  if (form.phone?.trim() && !phoneRegex.test(form.phone.trim())) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email?.trim()) {
    errors.email = "Email không được để trống";
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = "Email không đúng định dạng";
  }

  return errors;
};

const useEmployee = () => {
  const queryClient = useQueryClient();
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
  });
  const { alert, showError, showSuccess, closeSnackbar } = useSnackbar();
  const [tab, setTab] = useState<"info" | "password">("info");
  const onChangeTab = (tab: "info" | "password") => setTab(tab);
  const onCloseDialog = () => {
    setTab("info");
    setDialogState((prev) => ({ ...prev, open: false }));
    setSelectedEmployeeId(null);
  };
  const onOpenDialog = (mode: DialogMode) => {
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
    onChangeField: onChangeEmployeeForm,
    updateForm: updateEmployeeForm,
    resetForm: resetEmployeeForm,
    onSubmit: onSubmitEmployeeForm,
  } = useForm<EmployeeForm>(
    {
      fullName: "",
      phone: "",
      email: "",
      active: true,
      newPassword: "",
      roleName: "RECEPTIONIST",
    },
    undefined,
    async () => {
      if (dialogState.mode === "CREATE" || tab === "info") {
        const errors = validateForm(employeeForm);
        if (Object.keys(errors).length) {
          showError("Thiếu thông tin nhân sự");
          return;
        }
      }

      if (dialogState.mode === "EDIT" && tab === "password") {
        if (!employeeForm.newPassword?.trim()) {
          showError("Mật khẩu không được để trống");
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
          await mUpdateEmployee.mutateAsync({
            id: selectedEmployeeId,
            fullName: employeeForm.fullName?.trim(),
            phone: employeeForm.phone?.trim(),
            email: employeeForm.email?.trim(),
            role: employeeForm.roleName,
            active: employeeForm.active,
          });
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

  const { data, isLoading } = useQuery({
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
      resetEmployeeForm();
    }

    if (dialogState.mode === "EDIT" && !isLoadingEmployee && employee) {
      updateEmployeeForm({
        ...employee,
        newPassword: "",
      });
    }
  }, [dialogState.open, dialogState.mode, employee, isLoadingEmployee]);

  const onEdit = (id: string) => {
    setSelectedEmployeeId(id);
    onOpenDialog("EDIT");
  };
  const onToggle = async (id: string, active: boolean) => {
    if (mUpdateEmployee.isPending) return;

    try {
      await mUpdateEmployee.mutateAsync({
        id,
        active,
      });
    } catch (error) {
      showError("Cập nhật trạng thái nhân viên thất bại");
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

      showSuccess("Cập nhật thông tin nhân sự thành công");
    },
    onError: (e: any) => {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Cập nhật thông tin nhân sự thất bại";
      showError(msg);
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

      showSuccess("Thay đổi mật khẩu thành công");
    },
    onError: (e: any) => {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Thay đổi mật khẩu thất bại";
      showError(msg);
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
      showSuccess("Tạo nhân sự thành công");
    },
    onError: (e: any) => {
      const msg =
        e?.response?.data?.message || e?.message || "Tạo nhân sự thất bại";
      showError(msg);
    },
  });

  return {
    employees,
    isLoading,
    filters,
    onChangeFilters,
    meta,
    onEdit,
    onToggle,
    employeeForm,
    isLoadingEmployee,
    onCloseDialog,
    onOpenDialog,
    alert,
    closeSnackbar,
    dialogState,
    onChangeEmployeeForm,
    onSubmitEmployeeForm,
    tab,
    onChangeTab,
  };
};
export default useEmployee;
