import AuthLayout from "@components/auth/AuthLayout";
import AuthPasswordField from "@components/auth/AuthPasswordField";
import GlobalSnackbar from "@components/GlobalSnackbar";
import { Alert, Box, Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation("client");
  const { form, onChange, onSubmit, alert, closeSnackbar, errors, isPending, registrationCompleted, passwordReset } = useLogin();

  return (
    <>
      <AuthLayout
        eyebrow={t("login.eyebrow")}
        title={t("login.title")}
        description={t("login.description")}
      >
        {registrationCompleted && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 1.25 }}>
            {t("login.messages.registrationCompleted")}
          </Alert>
        )}
        {passwordReset && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 1.25 }}>
            {t("login.messages.passwordReset")}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2.25}>
            <TextField
              label={t("login.fields.email")}
              placeholder={t("login.fields.emailPlaceholder")}
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              fullWidth
              disabled={isPending}
              onChange={onChange}
              value={form.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <AuthPasswordField
              label={t("login.fields.password")}
              name="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              autoComplete="current-password"
              disabled={isPending}
            />

            <MuiLink component={Link} to="/forgot-password" underline="hover" sx={{ alignSelf: "flex-end", fontSize: 14, fontWeight: 650 }}>
              {t("login.actions.forgotPassword")}
            </MuiLink>

            <Button type="submit" variant="contained" fullWidth disabled={isPending} sx={{ minHeight: 48, borderRadius: 1.25 }}>
              {isPending ? t("login.actions.signingIn") : t("login.actions.signIn")}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
          {t("login.signUpPrompt")}{" "}
          <MuiLink component={Link} to="/register" underline="hover" sx={{ fontWeight: 700 }}>
            {t("login.actions.signUp")}
          </MuiLink>
        </Typography>
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default LoginPage;
