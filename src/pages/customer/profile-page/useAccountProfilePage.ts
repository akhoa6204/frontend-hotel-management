import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { loginSuccess } from "@store/slice/account.slice";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import ProfileService from "@services/me/profile.service";
import AuthService from "@services/auth/auth.service";
import { UserUpdatePasswordRequest } from "@constant/request/UserUpdatePasswordRequest";

export type ActiveTab = "info" | "security";
export type Form = {
  fullName: string;
  phone?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateFormByTab = (form: Form, activeTab: ActiveTab) => {
  const errors: Partial<Record<keyof Form, string>> = {};

  const { password, newPassword, confirmPassword } = form;

  if (activeTab === "security") {
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu hiện tại.";
    }

    if (!newPassword) {
      errors.newPassword = "Vui lòng nhập mật khẩu mới.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    if (newPassword && newPassword.length < 6) {
      errors.newPassword = "Mật khẩu mới phải từ 6 ký tự trở lên.";
    }
  }
  if (activeTab === "info") {
    if (!form.fullName) {
      errors.fullName = "Họ và tên không được để trống.";
    }
    if (!form.email) {
      errors.email = "Email không được để trống.";
    }
    if (form.email && !emailRegex.test(form.email)) {
      errors.email = "Email không hợp lệ.";
    }
  }

  return errors;
};
const useAccountProfilePage = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const user: UserShortResponse | undefined = useAppSelector(
    (state) => state.account.user,
  );
  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();

  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    tabFromUrl === "security" ? "security" : "info",
  );
  const { form, onChangeField, updateForm, resetForm, onSubmit, errors } =
    useForm<Form>(
      {
        fullName: "",
        phone: "",
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      (f) => validateFormByTab(f, activeTab),
      async () => {
        if (activeTab === "info") {
          await mUpdateMutation.mutateAsync({
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
          });
        }
        if (activeTab === "security") {
          if (!form.newPassword || !form.password) return;
          await mChangePassword.mutateAsync({
            password: form.password,
            newPassword: form.newPassword,
          });
        }
      },
    );
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: ProfileService.getMe,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      dispatch(loginSuccess(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!user) return;
    updateForm({
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    });
  }, [user]);
  const onChangeTab = (tab: ActiveTab) => {
    if (!user) return;

    updateForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      password: "",
      newPassword: "",
      confirmPassword: "",
    });
    setActiveTab(tab);
  };

  const mUpdateMutation = useMutation({
    mutationFn: (data: Form) => ProfileService.updateMe(data),
    onSuccess: async () => {
      showSuccess(`Cập nhật thông tin người dùng thành công!`);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        `Cập nhật thông tin người dùng thất bái.`;
      showError(msg);
    },
  });

  const mChangePassword = useMutation({
    mutationFn: (payload: UserUpdatePasswordRequest) =>
      ProfileService.changePassword(payload),
    onSuccess: () => {
      showSuccess("Đổi mật khẩu thành công!");
      updateForm({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setActiveTab("info");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Lỗi khi đổi mật khẩu.";
      showError(msg);
    },
  });

  return {
    activeTab,
    onChangeTab,

    form,
    onChange: onChangeField,
    onSubmit,
    errors,

    alert,
    closeSnackbar,
  };
};

export default useAccountProfilePage;
