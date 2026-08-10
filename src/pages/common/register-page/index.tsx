import type { AxiosError } from "axios";
import AuthLayout from "@components/auth/AuthLayout";
import AuthPasswordField from "@components/auth/AuthPasswordField";
import GlobalSnackbar from "@components/GlobalSnackbar";
import type { RegisterRequest } from "@constant/request/RegisterRequest";
import useForm from "@hooks/useForm";
import useSnackbar from "@hooks/useSnackbar";
import { Box, Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import AuthService from "@services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type RegisterForm = RegisterRequest & { confirmPassword: string };

const initialForm: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const { t } = useTranslation("client");
  const navigate = useNavigate();
  const { alert, closeSnackbar, showError } = useSnackbar();

  const mRegister = useMutation({
    mutationFn: (values: RegisterForm) => {
      const request: RegisterRequest = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      return AuthService.register(request);
    },
    onSuccess: () => navigate("/login", { state: { result: true } }),
    onError: (error: AxiosError<{ message?: string }>) => {
      showError(error.response?.data?.message || t("register.errors.registrationFailed"));
    },
  });

  const { form, errors, onChange, onSubmit } = useForm<RegisterForm>(
    initialForm,
    (values) => {
      const validationErrors: Partial<Record<keyof RegisterForm, string>> = {};
      if (!values.fullName.trim()) validationErrors.fullName = t("register.validation.fullNameRequired");
      if (!values.email.trim()) validationErrors.email = t("register.validation.emailRequired");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) validationErrors.email = t("register.validation.emailInvalid");
      if (!values.phone.trim()) validationErrors.phone = t("register.validation.phoneRequired");
      else if (!/^\d{9,11}$/.test(values.phone)) validationErrors.phone = t("register.validation.phoneInvalid");
      if (!values.password.trim()) validationErrors.password = t("register.validation.passwordRequired");
      else if (values.password.length < 6) validationErrors.password = t("register.validation.passwordLength");
      if (!values.confirmPassword.trim()) validationErrors.confirmPassword = t("register.validation.confirmPasswordRequired");
      else if (values.confirmPassword !== values.password) validationErrors.confirmPassword = t("register.validation.passwordMismatch");
      return validationErrors;
    },
    (values) => mRegister.mutate(values),
  );

  return (
    <>
      <AuthLayout
        eyebrow={t("register.eyebrow")}
        title={t("register.title")}
        description={t("register.description")}
      >
        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label={t("register.fields.fullName")}
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
              autoComplete="name"
              autoFocus
              disabled={mRegister.isPending}
              fullWidth
            />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField
                label={t("register.fields.email")}
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                autoComplete="email"
                disabled={mRegister.isPending}
                fullWidth
              />
              <TextField
                label={t("register.fields.phone")}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                autoComplete="tel"
                disabled={mRegister.isPending}
                fullWidth
              />
            </Box>
            <AuthPasswordField
              label={t("register.fields.password")}
              name="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              autoComplete="new-password"
              disabled={mRegister.isPending}
            />
            <AuthPasswordField
              label={t("register.fields.confirmPassword")}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              disabled={mRegister.isPending}
            />
            <Typography variant="caption" color="text.secondary">{t("register.passwordRequirement")}</Typography>
            <Button type="submit" variant="contained" fullWidth disabled={mRegister.isPending} sx={{ minHeight: 48, borderRadius: 1.25 }}>
              {mRegister.isPending ? t("register.actions.creating") : t("register.actions.signUp")}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
          {t("register.signInPrompt")}{" "}
          <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 700 }}>{t("register.actions.signIn")}</MuiLink>
        </Typography>
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default RegisterPage;
