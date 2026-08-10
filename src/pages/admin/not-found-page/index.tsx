import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminNotFoundPage = () => {
  const { t } = useTranslation("admin");
  const { hasRole } = useAuth();
  const navigate = useNavigate();

  const workspacePath = hasRole("ADMIN")
    ? "/manager/dashboard"
    : hasRole("RECEPTIONIST")
      ? "/manager/front-desk"
      : "/manager/housekeeping-tasks";

  return (
    <Box
      component="main"
      sx={{
        minHeight: { xs: "calc(100dvh - 100px)", md: "calc(100dvh - 48px)" },
        display: "grid",
        placeItems: "center",
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 680,
          bgcolor: "#FFFFFF",
          border: "1px solid #E4E7EC",
          borderRadius: "12px",
          px: { xs: 2.5, sm: 4, md: 5 },
          py: { xs: 4, sm: 5 },
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2.5, sm: 3.5 }} alignItems={{ sm: "flex-start" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "10px",
              bgcolor: "#EAF4FF",
              color: "#1D6FC2",
            }}
          >
            <SearchOffRoundedIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: "primary.main", fontSize: 13, fontWeight: 700, letterSpacing: ".08em" }}>404</Typography>
            <Typography component="h1" sx={{ mt: .75, color: "#1F2937", fontSize: { xs: 27, sm: 30 }, lineHeight: 1.25, fontWeight: 700 }}>
              {t("notFound.title")}
            </Typography>
            <Typography sx={{ mt: 1.25, color: "#667085", maxWidth: 500, fontSize: 14.5, lineHeight: 1.65 }}>
              {t("notFound.description")}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(workspacePath, { replace: true })}
              sx={{ mt: 3, minHeight: 40, borderRadius: "8px", px: 2.25 }}
            >
              {t("notFound.actions.dashboard")}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminNotFoundPage;
