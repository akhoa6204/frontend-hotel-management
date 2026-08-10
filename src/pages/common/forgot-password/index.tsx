import type { AxiosError } from "axios";
import AuthLayout from "@components/auth/AuthLayout";
import GlobalSnackbar from "@components/GlobalSnackbar";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import AuthService from "@services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordPage = () => {
  const { t, i18n } = useTranslation("client");
  const [requestedEmail, setRequestedEmail] = useState("");
  const { alert, closeSnackbar, showError } = useSnackbar();

  const mRequestReset = useMutation({
    mutationFn: (email: string) => AuthService.requestResetPassword(
      email,
      i18n.resolvedLanguage === "en" ? "EN" : "VI",
    ),
    onSuccess: (_data, email) => setRequestedEmail(email),
    onError: (error: AxiosError<{ message?: string }>) => {
      showError(error.response?.data?.message || t("forgotPassword.errors.requestFailed"));
    },
  });

  const { form, errors, onChange, onSubmit } = useForm<ForgotPasswordForm>(
    { email: "" },
    (values) => {
      const validationErrors: Partial<Record<keyof ForgotPasswordForm, string>> = {};
      if (!values.email.trim()) validationErrors.email = t("forgotPassword.validation.emailRequired");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) validationErrors.email = t("forgotPassword.validation.emailInvalid");
      return validationErrors;
    },
    (values) => mRequestReset.mutate(values.email),
  );

  return (
    <>
      <AuthLayout
        eyebrow={t("forgotPassword.eyebrow")}
        title={requestedEmail ? t("forgotPassword.success.title") : t("forgotPassword.title")}
        description={requestedEmail
          ? t("forgotPassword.success.description")
          : t("forgotPassword.description")}
      >
        {requestedEmail ? (
          <Stack spacing={3} alignItems="flex-start">
            <Box sx={{ display: "grid", placeItems: "center", alignSelf: "center", width: 52, height: 52, borderRadius: "50%", bgcolor: "#edf8f1", color: "#2f7d4a" }}>
              <CheckCircleOutlineRoundedIcon sx={{ fontSize: 30 }} />
            </Box>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {t("forgotPassword.success.received", { email: requestedEmail })}
            </Typography>
            <Button component={Link} to="/login" variant="contained" fullWidth sx={{ minHeight: 48, borderRadius: 1.25 }}>
              {t("forgotPassword.actions.backToLogin")}
            </Button>
          </Stack>
        ) : (
          <>
            <Box component="form" onSubmit={onSubmit} noValidate>
              <Stack spacing={2.25}>
                <TextField
                  label={t("forgotPassword.fields.email")}
                  name="email"
                  type="email"
                  placeholder={t("forgotPassword.fields.emailPlaceholder")}
                  value={form.email}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  autoComplete="email"
                  autoFocus
                  disabled={mRequestReset.isPending}
                  fullWidth
                />
                <Button type="submit" variant="contained" fullWidth disabled={mRequestReset.isPending} sx={{ minHeight: 48, borderRadius: 1.25 }}>
                  {mRequestReset.isPending ? t("forgotPassword.actions.sending") : t("forgotPassword.actions.sendInstructions")}
                </Button>
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
              <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 700 }}>{t("forgotPassword.actions.backToLogin")}</MuiLink>
            </Typography>
          </>
        )}
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default ForgotPasswordPage;
