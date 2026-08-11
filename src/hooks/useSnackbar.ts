import { useState } from "react";
import type {
  SnackbarAlertState,
  SnackbarSeverity,
} from "@components/GlobalSnackbar";

const useSnackbar = () => {
  const [alert, setAlert] = useState<SnackbarAlertState>({
    open: false,
    severity: "success",
    message: "",
  });

  const showSnackbar = (severity: SnackbarSeverity, message: string) =>
    setAlert({ open: true, severity, message });

  const showSuccess = (message: string) => showSnackbar("success", message);

  const showError = (message: string) => showSnackbar("error", message);

  const showWarning = (message: string) => showSnackbar("warning", message);

  const showInfo = (message: string) => showSnackbar("info", message);

  const closeSnackbar = () => setAlert((a) => ({ ...a, open: false }));

  return {
    alert,
    showError,
    showSuccess,
    closeSnackbar,
    showWarning,
    showInfo,
  };
};
export default useSnackbar;
