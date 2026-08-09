import type { AxiosError } from "axios";
import type { Errors } from "@constant/internal/Errors";
import useForm from "@hooks/useForm";
import { useAppDispatch } from "@hooks/useRedux";
import useSnackbar from "@hooks/useSnackbar";
import AuthService from "@services/auth/auth.service";
import { loginSuccess } from "@store/slice/account.slice";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import type { LoginRequest } from "@constant/request/LoginRequest";
import type { AuthenticationResponse } from "@constant/response/AuthenticationResponse";

const initialForm: LoginRequest = { email: "", password: "" };

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || "");
const validate = (f: LoginRequest): Errors<LoginRequest> => {
  const err: Errors<LoginRequest> = {};
  if (!isEmail(f.email)) err.email = "Email không hợp lệ";
  if (!f.password) err.password = "Mật khẩu không hợp lệ";
  return err;
};
const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { alert, closeSnackbar, showError } = useSnackbar();
  const callback = async (form: LoginRequest) => {
    await mLogin.mutateAsync(form);
  };

  const mLogin = useMutation({
    mutationFn: async (data: LoginRequest) => await AuthService.login(data),
    onSuccess: (data: AuthenticationResponse) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("authenticated", String(data.authenticated));
      const user = data.user;

      dispatch(loginSuccess(user));

      if (user.roleName === "ADMIN") {
        navigate("/manager/dashboard", { replace: true });
        return;
      }

      if (user.roleName === "RECEPTIONIST") {
        navigate("/manager/front-desk", { replace: true });
        return;
      }

      if (user.roleName === "HOUSEKEEPING") {
        navigate("/manager/housekeeping-tasks", { replace: true });
        return;
      }

      navigate("/", { replace: true });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const msg = error.response?.data?.message || "Không thể đăng nhập. Vui lòng kiểm tra thông tin và thử lại.";
      showError(msg);
    },
  });
  const location = useLocation();

  const { form, errors, onChange, onSubmit } = useForm<LoginRequest>(
    initialForm,
    validate,
    callback,
  );

  return {
    form,
    errors,
    onChange,
    onSubmit,
    alert,
    closeSnackbar,
    isPending: mLogin.isPending,
    registrationCompleted: Boolean(location.state?.result),
    passwordReset: Boolean(location.state?.passwordReset),
  };
};

export default useLogin;
