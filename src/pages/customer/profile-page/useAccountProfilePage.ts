import type { UserUpdatePasswordRequest } from "@constant/request/UserUpdatePasswordRequest";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
import useSnackbar from "@hooks/useSnackbar";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import ProfileService from "@services/me/profile.service";
import { loginSuccess } from "@store/slice/account.slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

export type ActiveTab = "info" | "security";

export interface Form {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

type FormErrors = Partial<Record<keyof Form, string>>;

const initialForm: Form = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateInfo = (form: Form): FormErrors => {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Họ và tên không được để trống.";
  if (!form.email.trim()) errors.email = "Email không được để trống.";
  else if (!emailRegex.test(form.email.trim())) errors.email = "Email không hợp lệ.";
  return errors;
};

const validatePassword = (form: Form): FormErrors => {
  const errors: FormErrors = {};
  if (!form.password) errors.password = "Vui lòng nhập mật khẩu hiện tại.";
  if (!form.newPassword) errors.newPassword = "Vui lòng nhập mật khẩu mới.";
  else if (form.newPassword.length < 6) errors.newPassword = "Mật khẩu mới phải từ 6 ký tự trở lên.";
  if (!form.confirmPassword) errors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
  else if (form.newPassword !== form.confirmPassword) errors.confirmPassword = "Mật khẩu xác nhận không khớp.";
  return errors;
};

const profileFields = (user?: UserShortResponse): Partial<Form> => ({
  fullName: user?.fullName ?? "",
  phone: user?.phone ?? "",
  email: user?.email ?? "",
});

const useAccountProfilePage = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const cachedUser = useAppSelector((state) => state.account.user);
  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<ActiveTab>(searchParams.get("tab") === "security" ? "security" : "info");
  const [form, setForm] = useState<Form>({ ...initialForm, ...profileFields(cachedUser) });
  const [errors, setErrors] = useState<FormErrors>({});
  const [editing, setEditing] = useState(false);

  const { data: profile, isLoading, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: ProfileService.getMe,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!profile) return;
    dispatch(loginSuccess(profile));
    if (!editing) {
      setForm((current) => ({ ...current, ...profileFields(profile) }));
    }
  }, [dispatch, editing, profile]);

  const onChange = <K extends keyof Form>(field: K, value: Form[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const restoreProfile = () => {
    const currentProfile = queryClient.getQueryData<UserShortResponse>(["user"]) ?? cachedUser;
    setForm((current) => ({ ...current, ...profileFields(currentProfile) }));
  };

  const updateMutation = useMutation({
    mutationFn: () => ProfileService.updateMe({
      fullName: form.fullName.trim(),
      phone: form.phone,
      email: form.email.trim(),
    }),
    onSuccess: async (updatedProfile) => {
      queryClient.setQueryData(["user"], updatedProfile);
      dispatch(loginSuccess(updatedProfile));
      setForm((current) => ({ ...current, ...profileFields(updatedProfile) }));
      setEditing(false);
      showSuccess("Thông tin của bạn đã được cập nhật.");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => showError("Không thể cập nhật thông tin lúc này. Vui lòng thử lại."),
  });

  const passwordMutation = useMutation({
    mutationFn: (payload: UserUpdatePasswordRequest) => ProfileService.changePassword(payload),
    onSuccess: () => {
      setForm((current) => ({ ...current, password: "", newPassword: "", confirmPassword: "" }));
      setErrors({});
      setActiveTab("info");
      showSuccess("Mật khẩu đã được cập nhật.");
    },
    onError: () => showError("Không thể đổi mật khẩu lúc này. Vui lòng kiểm tra lại và thử lại."),
  });

  const onSubmitInfo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateMutation.isPending) return;
    const nextErrors = validateInfo(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    updateMutation.mutate();
  };

  const onSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordMutation.isPending) return;
    const nextErrors = validatePassword(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    passwordMutation.mutate({ password: form.password, newPassword: form.newPassword });
  };

  const onChangeTab = (tab: ActiveTab) => {
    restoreProfile();
    setForm((current) => ({ ...current, password: "", newPassword: "", confirmPassword: "" }));
    setErrors({});
    setEditing(false);
    setActiveTab(tab);
  };

  const cancelEditing = () => {
    restoreProfile();
    setErrors({});
    setEditing(false);
  };

  return {
    activeTab,
    onChangeTab,
    form,
    onChange,
    onSubmitInfo,
    onSubmitPassword,
    errors,
    editing,
    startEditing: () => setEditing(true),
    cancelEditing,
    loading: isLoading && !cachedUser,
    loadError: isError && !cachedUser,
    retry: refetch,
    savingInfo: updateMutation.isPending,
    savingPassword: passwordMutation.isPending,
    alert,
    closeSnackbar,
  };
};

export default useAccountProfilePage;
