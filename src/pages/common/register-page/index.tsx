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

type RegisterForm = RegisterRequest & { confirmPassword: string };

const initialForm: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
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
      showError(error.response?.data?.message || "Không thể tạo tài khoản. Vui lòng thử lại.");
    },
  });

  const { form, errors, onChange, onSubmit } = useForm<RegisterForm>(
    initialForm,
    (values) => {
      const validationErrors: Partial<Record<keyof RegisterForm, string>> = {};
      if (!values.fullName.trim()) validationErrors.fullName = "Họ tên không được để trống";
      if (!values.email.trim()) validationErrors.email = "Email không được để trống";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) validationErrors.email = "Email không hợp lệ";
      if (!values.phone.trim()) validationErrors.phone = "Số điện thoại không được để trống";
      else if (!/^\d{9,11}$/.test(values.phone)) validationErrors.phone = "Số điện thoại không hợp lệ";
      if (!values.password.trim()) validationErrors.password = "Mật khẩu không được để trống";
      else if (values.password.length < 6) validationErrors.password = "Mật khẩu tối thiểu 6 ký tự";
      if (!values.confirmPassword.trim()) validationErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
      else if (values.confirmPassword !== values.password) validationErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
      return validationErrors;
    },
    (values) => mRegister.mutate(values),
  );

  return (
    <>
      <AuthLayout
        eyebrow="TẠO TÀI KHOẢN"
        title="Bắt đầu hành trình cùng Diamond Sea."
        description="Tạo tài khoản để lưu thông tin và quản lý các kỳ nghỉ của bạn thuận tiện hơn."
      >
        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Họ tên"
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
                label="Email"
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
                label="Số điện thoại"
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
              label="Mật khẩu"
              name="password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              autoComplete="new-password"
              disabled={mRegister.isPending}
            />
            <AuthPasswordField
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              disabled={mRegister.isPending}
            />
            <Typography variant="caption" color="text.secondary">Mật khẩu cần có ít nhất 6 ký tự.</Typography>
            <Button type="submit" variant="contained" fullWidth disabled={mRegister.isPending} sx={{ minHeight: 48, borderRadius: 1.25 }}>
              {mRegister.isPending ? "Đang tạo tài khoản..." : "Đăng ký"}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
          Đã có tài khoản?{" "}
          <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 700 }}>Đăng nhập</MuiLink>
        </Typography>
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default RegisterPage;
