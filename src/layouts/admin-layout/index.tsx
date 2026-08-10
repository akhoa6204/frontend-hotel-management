import { useEffect, useState } from "react";
import { AdminSideBar } from "@components";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box, Drawer, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminLayout = () => {
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("diamond-sea-admin");

    return () => document.body.classList.remove("diamond-sea-admin");
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100dvh", overflow: "hidden", bgcolor: "#F6F8FA" }}>
      {desktop ? (
        <Box sx={{ position: "sticky", top: 0, width: 236, height: "100dvh", flexShrink: 0 }}>
          <AdminSideBar />
        </Box>
      ) : (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          transitionDuration={{ enter: 180, exit: 150 }}
          slotProps={{ paper: { sx: { width: 236, border: 0 } } }}
        >
          <AdminSideBar onNavigate={() => setDrawerOpen(false)} />
        </Drawer>
      )}

      <Box sx={{ flex: 1, minWidth: 0, height: "100dvh", display: "flex", flexDirection: "column" }}>
        {!desktop && (
          <Box
            component="header"
            sx={{
              height: 60,
              px: 2,
              bgcolor: "#FFFFFF",
              borderBottom: "1px solid #E4E7EC",
              display: "flex",
              alignItems: "center",
              gap: 1.25,
            }}
          >
            <IconButton
              aria-label={t("aria.openNavigation")}
              onClick={() => setDrawerOpen(true)}
              sx={{ width: 40, height: 40, borderRadius: "8px", color: "#1F2937" }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography sx={{ color: "primary.main", fontSize: 16, fontWeight: 700 }}>
              Diamond Sea
            </Typography>
          </Box>
        )}

        <Box className="admin-scrollbar" sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: { xs: 2, sm: 2.5, lg: 3 }, py: { xs: 2, lg: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
