import type { UserUpdatePasswordRequest } from "@constant/request/UserUpdatePasswordRequest";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
import useSnackbar from "@hooks/useSnackbar";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import ProfileService from "@services/me/profile.service";
import { loginSuccess } from "@store/slice/account.slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

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

const validateInfo = (form: Form, t: TFunction<"client">): FormErrors => {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = t("profile.validation.fullNameRequired");
  if (!form.email.trim()) errors.email = t("profile.validation.emailRequired");
  else if (!emailRegex.test(form.email.trim())) errors.email = t("profile.validation.emailInvalid");
  return errors;
};

const validatePassword = (form: Form, t: TFunction<"client">): FormErrors => {
  const errors: FormErrors = {};
  if (!form.password) errors.password = t("profile.validation.currentPasswordRequired");
  if (!form.newPassword) errors.newPassword = t("profile.validation.newPasswordRequired");
  else if (form.newPassword.length < 6) errors.newPassword = t("profile.validation.newPasswordLength");
  if (!form.confirmPassword) errors.confirmPassword = t("profile.validation.confirmPasswordRequired");
  else if (form.newPassword !== form.confirmPassword) errors.confirmPassword = t("profile.validation.passwordMismatch");
  return errors;
};

const profileFields = (user?: UserShortResponse): Partial<Form> => ({
  fullName: user?.fullName ?? "",
  phone: user?.phone ?? "",
  email: user?.email ?? "",
});

const useAccountProfilePage = () => {
  const { t } = useTranslation("client");
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
      showSuccess(t("profile.messages.updateSuccess"));
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => showError(t("profile.messages.updateError")),
  });

  const passwordMutation = useMutation({
    mutationFn: (payload: UserUpdatePasswordRequest) => ProfileService.changePassword(payload),
    onSuccess: () => {
      setForm((current) => ({ ...current, password: "", newPassword: "", confirmPassword: "" }));
      setErrors({});
      setActiveTab("info");
      showSuccess(t("profile.messages.passwordSuccess"));
    },
    onError: () => showError(t("profile.messages.passwordError")),
  });

  const onSubmitInfo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateMutation.isPending) return;
    const nextErrors = validateInfo(form, t);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    updateMutation.mutate();
  };

  const onSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordMutation.isPending) return;
    const nextErrors = validatePassword(form, t);
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
