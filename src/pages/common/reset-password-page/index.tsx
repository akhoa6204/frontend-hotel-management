import type { AxiosError } from "axios";
import AuthLayout from "@components/auth/AuthLayout";
import AuthPasswordField from "@components/auth/AuthPasswordField";
import GlobalSnackbar from "@components/GlobalSnackbar";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import { Alert, Box, Button, Link as MuiLink, Stack, Typography } from "@mui/material";
import AuthService from "@services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const { t } = useTranslation("client");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { alert, closeSnackbar, showError } = useSnackbar();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      navigate("/login", { replace: true });
      return;
    }

    setToken(resetToken);
    const sanitizedParams = new URLSearchParams(searchParams);
    sanitizedParams.delete("token");
    const remainingQuery = sanitizedParams.toString();
    window.history.replaceState({}, "", `${location.pathname}${remainingQuery ? `?${remainingQuery}` : ""}`);
  }, [location.pathname, navigate, searchParams]);

  const mResetPassword = useMutation({
    mutationFn: (password: string) => {
      if (!token) throw new Error("Missing reset token");
      return AuthService.resetPassword({ token, password });
    },
    onSuccess: () => navigate("/login", { replace: true, state: { passwordReset: true } }),
    onError: (error: AxiosError<{ message?: string }>) => {
      showError(error.response?.data?.message || t("resetPassword.errors.resetFailed"));
    },
  });

  const { form, errors, onChange, onSubmit } = useForm<ResetPasswordForm>(
    { password: "", confirmPassword: "" },
    (values) => {
      const validationErrors: Partial<Record<keyof ResetPasswordForm, string>> = {};
      if (!values.password.trim()) validationErrors.password = t("resetPassword.validation.passwordRequired");
      else if (values.password.length < 6) validationErrors.password = t("resetPassword.validation.passwordLength");
      if (!values.confirmPassword.trim()) validationErrors.confirmPassword = t("resetPassword.validation.confirmPasswordRequired");
      else if (values.confirmPassword !== values.password) validationErrors.confirmPassword = t("resetPassword.validation.passwordMismatch");
      return validationErrors;
    },
    (values) => mResetPassword.mutate(values.password),
  );

  return (
    <>
      <AuthLayout
        eyebrow={t("resetPassword.eyebrow")}
        title={t("resetPassword.title")}
        description={t("resetPassword.description")}
      >
        <Alert severity="info" sx={{ mb: 3, borderRadius: 1.25 }}>
          {t("resetPassword.passwordRequirement")}
        </Alert>
        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2.25}>
            <AuthPasswordField
              label={t("resetPassword.fields.password")}
              name="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              autoComplete="new-password"
              disabled={mResetPassword.isPending || !token}
            />
            <AuthPasswordField
              label={t("resetPassword.fields.confirmPassword")}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              disabled={mResetPassword.isPending || !token}
            />
            <Button type="submit" variant="contained" fullWidth disabled={mResetPassword.isPending || !token} sx={{ minHeight: 48, borderRadius: 1.25 }}>
              {mResetPassword.isPending ? t("resetPassword.actions.updating") : t("resetPassword.actions.reset")}
            </Button>
          </Stack>
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
          <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 700 }}>{t("resetPassword.actions.backToLogin")}</MuiLink>
        </Typography>
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default ResetPasswordPage;
