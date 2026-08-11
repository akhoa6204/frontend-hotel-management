import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Alert, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import type { AlertColor } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

export type SnackbarSeverity = Extract<
  AlertColor,
  "success" | "error" | "warning" | "info"
>;

export interface SnackbarAlertState {
  open: boolean;
  severity: SnackbarSeverity;
  message: string;
}

interface GlobalSnackbarProps {
  alert: SnackbarAlertState;
  closeSnackbar: () => void;
}

const iconMapping = {
  success: <CheckCircleOutlineRoundedIcon fontSize="inherit" />,
  error: <ErrorOutlineRoundedIcon fontSize="inherit" />,
  warning: <WarningAmberRoundedIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
};

const adminSemanticTokens: Record<
  SnackbarSeverity,
  { main: string; soft: string; text: string }
> = {
  success: { main: "#2E7D5B", soft: "#EAF6F0", text: "#246548" },
  error: { main: "#C94A4A", soft: "#FDECEC", text: "#A43B3B" },
  warning: { main: "#C98520", soft: "#FFF5E5", text: "#9A6518" },
  info: { main: "#2E90FA", soft: "#EAF4FF", text: "#1D6FC2" },
};

// The responsive Header renders at up to 68px on mobile and 72px on desktop.
// These offsets retain a 16px visual gap below it in either state.
const clientHeaderOffset = { mobile: 84, desktop: 88 };

const GlobalSnackbar = ({ alert, closeSnackbar }: GlobalSnackbarProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileHeader = useMediaQuery(theme.breakpoints.down("md"));
  const isAdmin = pathname.startsWith("/manager");
  const adminSemantic = adminSemanticTokens[alert.severity];
  const semanticColor = isAdmin
    ? adminSemantic.main
    : theme.palette[alert.severity].main;

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={1000}
      onClose={closeSnackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: mobile ? "center" : "right",
      }}
      transitionDuration={{ enter: isAdmin ? 180 : 220, exit: 150 }}
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        top: isAdmin
          ? mobile
            ? 16
            : 20
          : mobileHeader
            ? clientHeaderOffset.mobile
            : clientHeaderOffset.desktop,
        ...(mobile
          ? { left: 16, right: 16, transform: "none" }
          : { right: 24 }),
      }}
    >
      <Alert
        severity={alert.severity}
        iconMapping={iconMapping}
        onClose={closeSnackbar}
        variant="standard"
        sx={{
          width: { xs: "100%", sm: "auto" },
          minWidth: { sm: isAdmin ? 300 : 0 },
          maxWidth: { sm: isAdmin ? 420 : 400 },
          alignItems: "center",
          px: isAdmin ? 1.25 : 1.125,
          py: isAdmin ? 0.625 : 0.375,
          color: isAdmin ? adminSemantic.text : "text.primary",
          bgcolor: isAdmin ? adminSemantic.soft : "background.paper",
          backgroundImage: isAdmin
            ? "none"
            : `linear-gradient(${alpha(semanticColor, 0.065)}, ${alpha(semanticColor, 0.065)})`,
          border: "1px solid",
          borderColor: alpha(semanticColor, isAdmin ? 0.4 : 0.34),
          borderRadius: isAdmin ? "10px" : `${theme.shape.borderRadius}px`,
          boxShadow: isAdmin
            ? "0 10px 28px rgba(16, 24, 40, 0.18)"
            : "0 10px 26px rgba(13, 52, 66, 0.18), 0 2px 8px rgba(13, 52, 66, 0.08)",
          whiteSpace: "pre-line",
          overflowWrap: "anywhere",
          "& .MuiAlert-icon": {
            alignItems: "center",
            mr: isAdmin ? 1 : 0.75,
            p: 0,
            color: semanticColor,
            bgcolor: "transparent",
            fontSize: isAdmin ? 20 : 18,
          },
          "& .MuiAlert-message": {
            minWidth: 0,
            py: isAdmin ? 0.375 : 0.25,
            fontSize: isAdmin ? 13.5 : 14,
            fontWeight: isAdmin ? 600 : 500,
            lineHeight: isAdmin ? 1.45 : 1.4,
          },
          "& .MuiAlert-action": {
            alignItems: "center",
            ml: isAdmin ? 0.75 : 0.5,
            mr: -0.375,
            py: 0,
            color: isAdmin ? alpha(adminSemantic.text, 0.72) : "text.secondary",
            "& .MuiIconButton-root": {
              width: isAdmin ? 32 : 30,
              height: isAdmin ? 32 : 30,
              borderRadius: isAdmin ? "8px" : "7px",
              transition: "background-color 150ms ease, color 150ms ease",
              "& svg": { fontSize: isAdmin ? 18 : 16 },
              "&:hover": {
                color: semanticColor,
                bgcolor: alpha(semanticColor, 0.08),
              },
            },
          },
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
