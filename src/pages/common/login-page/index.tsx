import AuthLayout from "@components/auth/AuthLayout";
import AuthPasswordField from "@components/auth/AuthPasswordField";
import GlobalSnackbar from "@components/GlobalSnackbar";
import { Alert, Box, Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";

const LoginPage = () => {
  const { form, onChange, onSubmit, alert, closeSnackbar, errors, isPending, registrationCompleted, passwordReset } = useLogin();

  return (
    <>
      <AuthLayout
        eyebrow="TÀI KHOẢN KHÁCH HÀNG"
        title="Chào mừng bạn trở lại."
        description="Đăng nhập để xem và quản lý những kỳ nghỉ đã đặt tại Diamond Sea."
      >
        {registrationCompleted && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 1.25 }}>
            Tài khoản đã được tạo. Bạn có thể đăng nhập để tiếp tục.
          </Alert>
        )}
        {passwordReset && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 1.25 }}>
            Mật khẩu đã được cập nhật. Bạn có thể đăng nhập bằng mật khẩu mới.
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2.25}>
            <TextField
              label="Email"
              placeholder="example@email.com"
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
              label="Mật khẩu"
              name="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              autoComplete="current-password"
              disabled={isPending}
            />

            <MuiLink component={Link} to="/forgot-password" underline="hover" sx={{ alignSelf: "flex-end", fontSize: 14, fontWeight: 650 }}>
              Quên mật khẩu?
            </MuiLink>

            <Button type="submit" variant="contained" fullWidth disabled={isPending} sx={{ minHeight: 48, borderRadius: 1.25 }}>
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
          Chưa có tài khoản?{" "}
          <MuiLink component={Link} to="/register" underline="hover" sx={{ fontWeight: 700 }}>
            Đăng ký
          </MuiLink>
        </Typography>
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default LoginPage;
