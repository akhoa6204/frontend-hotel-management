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

export type AdminProfileTab = "info" | "security";

export interface AdminProfileForm {
  fullName: string;
  phone: string;
  email: string;
}

export interface AdminPasswordForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export type AdminProfileErrors = Partial<
  Record<keyof AdminProfileForm, string>
>;
export type AdminPasswordErrors = Partial<
  Record<keyof AdminPasswordForm, string>
>;

const emptyPasswordForm: AdminPasswordForm = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toProfileForm = (user?: UserShortResponse): AdminProfileForm => ({
  fullName: user?.fullName ?? "",
  phone: user?.phone ?? "",
  email: user?.email ?? "",
});

const validateProfile = (form: AdminProfileForm, t: TFunction): AdminProfileErrors => {
  const errors: AdminProfileErrors = {};
  if (!form.fullName.trim()) errors.fullName = t("validation.fullNameRequired", { ns: "profile" });
  if (!form.email.trim()) errors.email = t("validation.emailRequired", { ns: "profile" });
  else if (!emailRegex.test(form.email.trim()))
    errors.email = t("validation.emailInvalid", { ns: "profile" });
  return errors;
};

const validatePassword = (form: AdminPasswordForm, t: TFunction): AdminPasswordErrors => {
  const errors: AdminPasswordErrors = {};
  if (!form.password) errors.password = t("validation.currentPasswordRequired", { ns: "profile" });
  if (!form.newPassword) errors.newPassword = t("validation.newPasswordRequired", { ns: "profile" });
  else if (form.newPassword.length < 6)
    errors.newPassword = t("validation.newPasswordLength", { ns: "profile" });
  if (!form.confirmPassword)
    errors.confirmPassword = t("validation.confirmPasswordRequired", { ns: "profile" });
  else if (form.newPassword !== form.confirmPassword)
    errors.confirmPassword = t("validation.passwordMismatch", { ns: "profile" });
  return errors;
};

const useAdminProfile = () => {
  const { t } = useTranslation(["profile", "common"]);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const cachedUser = useAppSelector((state) => state.account.user);
  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<AdminProfileTab>(
    searchParams.get("tab") === "security" ? "security" : "info",
  );
  const [profileForm, setProfileForm] = useState<AdminProfileForm>(() =>
    toProfileForm(cachedUser),
  );
  const [passwordForm, setPasswordForm] =
    useState<AdminPasswordForm>(emptyPasswordForm);
  const [profileErrors, setProfileErrors] = useState<AdminProfileErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<AdminPasswordErrors>({});
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user", cachedUser?.id],
    queryFn: ProfileService.getMe,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!profile) return;
    dispatch(loginSuccess(profile));
    if (!isEditing) setProfileForm(toProfileForm(profile));
  }, [dispatch, isEditing, profile]);

  const currentProfile = profile ?? cachedUser;
  const roleLabel = currentProfile?.roleName ? t(`roles.${currentProfile.roleName}`, { ns: "common" }) : "—";
  const serverForm = toProfileForm(currentProfile);
  const isProfileDirty =
    profileForm.fullName.trim() !== serverForm.fullName.trim() ||
    profileForm.phone !== serverForm.phone ||
    profileForm.email.trim() !== serverForm.email.trim();

  const updateProfileField = <K extends keyof AdminProfileForm>(
    field: K,
    value: AdminProfileForm[K],
  ) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
    setProfileErrors((current) => ({ ...current, [field]: undefined }));
  };

  const updatePasswordField = <K extends keyof AdminPasswordForm>(
    field: K,
    value: AdminPasswordForm[K],
  ) => {
    setPasswordForm((current) => ({ ...current, [field]: value }));
    setPasswordErrors((current) => ({ ...current, [field]: undefined }));
  };

  const updateProfileMutation = useMutation({
    mutationFn: () =>
      ProfileService.updateMe({
        fullName: profileForm.fullName.trim(),
        phone: profileForm.phone,
        email: profileForm.email.trim(),
      }),
    onSuccess: async (updatedProfile) => {
      queryClient.setQueryData(["user"], updatedProfile);
      dispatch(loginSuccess(updatedProfile));
      setProfileForm(toProfileForm(updatedProfile));
      setIsEditing(false);
      showSuccess(t("messages.updateSuccess", { ns: "profile" }));
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () =>
      showError(t("messages.updateError", { ns: "profile" })),
  });

  const passwordMutation = useMutation({
    mutationFn: (payload: UserUpdatePasswordRequest) =>
      ProfileService.changePassword(payload),
    onSuccess: () => {
      setPasswordForm(emptyPasswordForm);
      setPasswordErrors({});
      setActiveTab("info");
      showSuccess(t("messages.passwordSuccess", { ns: "profile" }));
    },
    onError: () =>
      showError(
        t("messages.passwordError", { ns: "profile" }),
      ),
  });

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateProfileMutation.isPending || !isProfileDirty) return;
    const errors = validateProfile(profileForm, t);
    setProfileErrors(errors);
    if (Object.keys(errors).length === 0) updateProfileMutation.mutate();
  };

  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordMutation.isPending) return;
    const errors = validatePassword(passwordForm, t);
    setPasswordErrors(errors);
    if (Object.keys(errors).length === 0) {
      passwordMutation.mutate({
        password: passwordForm.password,
        newPassword: passwordForm.newPassword,
      });
    }
  };

  const changeTab = (tab: AdminProfileTab) => {
    setProfileForm(toProfileForm(currentProfile));
    setPasswordForm(emptyPasswordForm);
    setProfileErrors({});
    setPasswordErrors({});
    setIsEditing(false);
    setActiveTab(tab);
  };

  const cancelEditing = () => {
    setProfileForm(toProfileForm(currentProfile));
    setProfileErrors({});
    setIsEditing(false);
  };

  return {
    activeTab,
    changeTab,
    profileForm,
    passwordForm,
    profileErrors,
    passwordErrors,
    updateProfileField,
    updatePasswordField,
    submitProfile,
    submitPassword,
    isEditing,
    startEditing: () => setIsEditing(true),
    cancelEditing,
    isProfileDirty,
    roleLabel,
    isProfileLoading: isLoading && !cachedUser,
    isProfileError: isError && !cachedUser,
    retryProfile: refetch,
    isProfileSaving: updateProfileMutation.isPending,
    isPasswordChanging: passwordMutation.isPending,
    alert,
    closeSnackbar,
  };
};

export default useAdminProfile;
