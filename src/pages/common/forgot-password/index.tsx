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

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordPage = () => {
  const [requestedEmail, setRequestedEmail] = useState("");
  const { alert, closeSnackbar, showError } = useSnackbar();

  const mRequestReset = useMutation({
    mutationFn: (email: string) => AuthService.requestResetPassword(email),
    onSuccess: (_data, email) => setRequestedEmail(email),
    onError: (error: AxiosError<{ message?: string }>) => {
      showError(error.response?.data?.message || "Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại.");
    },
  });

  const { form, errors, onChange, onSubmit } = useForm<ForgotPasswordForm>(
    { email: "" },
    (values) => {
      const validationErrors: Partial<Record<keyof ForgotPasswordForm, string>> = {};
      if (!values.email.trim()) validationErrors.email = "Email không được để trống";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) validationErrors.email = "Email không hợp lệ";
      return validationErrors;
    },
    (values) => mRequestReset.mutate(values.email),
  );

  return (
    <>
      <AuthLayout
        eyebrow="KHÔI PHỤC TÀI KHOẢN"
        title={requestedEmail ? "Kiểm tra email của bạn." : "Quên mật khẩu?"}
        description={requestedEmail
          ? "Nếu địa chỉ này khớp với tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi đến hộp thư của bạn."
          : "Nhập email gắn với tài khoản và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu."}
      >
        {requestedEmail ? (
          <Stack spacing={3} alignItems="flex-start">
            <Box sx={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: "50%", bgcolor: "#edf8f1", color: "#2f7d4a" }}>
              <CheckCircleOutlineRoundedIcon sx={{ fontSize: 30 }} />
            </Box>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Yêu cầu khôi phục cho <Box component="span" sx={{ color: "#153746", fontWeight: 700 }}>{requestedEmail}</Box> đã được tiếp nhận. Vui lòng kiểm tra cả thư mục spam.
            </Typography>
            <Button component={Link} to="/login" variant="contained" fullWidth sx={{ minHeight: 48, borderRadius: 1.25 }}>
              Quay lại đăng nhập
            </Button>
          </Stack>
        ) : (
          <>
            <Box component="form" onSubmit={onSubmit} noValidate>
              <Stack spacing={2.25}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
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
                  {mRequestReset.isPending ? "Đang gửi hướng dẫn..." : "Gửi hướng dẫn"}
                </Button>
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
              <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 700 }}>Quay lại đăng nhập</MuiLink>
            </Typography>
          </>
        )}
      </AuthLayout>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default ForgotPasswordPage;
