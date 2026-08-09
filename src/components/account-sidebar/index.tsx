import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HistoryIcon from "@mui/icons-material/History";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { logout } from "@store/slice/account.slice";
import type { ReactElement } from "react";

type NavItem = {
  label: string;
  icon: ReactElement;
  to?: string;
  action?: "logout";
};

const navItems: NavItem[] = [
  {
    label: "Hồ sơ của tôi",
    icon: <PersonOutlineIcon fontSize="small" />,
    to: "/account/profile",
  },
  {
    label: "Lịch sử đặt phòng",
    icon: <HistoryIcon fontSize="small" />,
    to: "/account/bookings",
  },
  {
    label: "Đánh giá",
    icon: <ReviewsIcon fontSize="small" />,
    to: "/account/reviews",
  },
  {
    label: "Đăng xuất",
    icon: <LogoutIcon fontSize="small" />,
    action: "logout",
  },
];

const AccountSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.account.user);
  const fullName = user?.fullName || "User";

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const isActivePath = (to?: string) => {
    if (!to) return false;
    return location.pathname.startsWith(to);
  };

  return (
    <Box
      component="nav"
      aria-label="Điều hướng tài khoản khách hàng"
      sx={{
        minWidth: 0,
        borderRadius: { xs: 1.5, lg: 0 },
        border: { xs: "1px solid rgba(23, 60, 75, 0.08)", lg: "none" },
        bgcolor: { xs: "rgba(255,255,255,.62)", lg: "transparent" },
      }}
    >
      <Box sx={{ px: { xs: 1.75, lg: 1 }, pb: { xs: 1.25, lg: 2.25 }, pt: { xs: 1.25, lg: 0.5 }, display: "flex", alignItems: "center", gap: 1.25 }}>
        <Avatar sx={{ bgcolor: "#DDE9ED", color: "text.primary", width: 32, height: 32, fontSize: 13, fontWeight: 700 }}>
          {fullName[0]?.toUpperCase() ?? "U"}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: "text.primary", fontSize: 14, fontWeight: 650, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {fullName}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 11.5, mt: 0.15 }}>
            Tài khoản khách hàng
          </Typography>
        </Box>
      </Box>
      <List
        disablePadding
        sx={{
          display: { xs: "flex", lg: "block" },
          overflowX: { xs: "auto", lg: "visible" },
          borderTop: { xs: "1px solid rgba(23, 60, 75, 0.07)", lg: "none" },
          p: { xs: 0.65, lg: 0 },
          gap: { xs: 0.5, lg: 0 },
          scrollbarWidth: "thin",
        }}
      >
        {navItems.map((item) => {
          const active = isActivePath(item.to);
          const isLogout = item.action === "logout";

          const commonProps = {
            sx: {
              minWidth: { xs: "max-content", lg: "auto" },
              py: 0.95,
              px: { xs: 1.4, lg: 1.25 },
              mt: { xs: 0, lg: isLogout ? 1.5 : 0.2 },
              borderTop: { xs: "none", lg: isLogout ? "1px solid rgba(23, 60, 75, 0.08)" : "none" },
              borderRadius: 0.75,
              bgcolor: active ? "rgba(46, 144, 250, 0.075)" : "transparent",
              color: active ? "primary.main" : "text.primary",
              position: "relative",
              "& .MuiListItemIcon-root": {
                color: active ? "primary.main" : isLogout ? "#72777D" : "#6B7378",
                minWidth: 29,
                "& .MuiSvgIcon-root": { fontSize: 19 },
              },
              "& .MuiListItemText-primary": { fontSize: 13.5, fontWeight: active ? 650 : 500 },
              ...(active
                ? {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: { xs: 9, lg: 0 },
                      right: { xs: 10, lg: "auto" },
                      bottom: { xs: 0, lg: 9 },
                      width: { xs: "auto", lg: 3 },
                      height: { xs: 2, lg: 20 },
                      borderRadius: 4,
                      bgcolor: "primary.main",
                    },
                  }
                : {}),
              "&:hover": {
                bgcolor: isLogout
                  ? "rgba(180, 58, 58, 0.055)"
                  : active
                    ? "rgba(46, 144, 250, 0.11)"
                    : "rgba(46, 144, 250, 0.045)",
                color: isLogout ? "error.main" : active ? "primary.main" : "text.primary",
                "& .MuiListItemIcon-root": {
                  color: isLogout ? "#9B3B38" : active ? "primary.main" : "#53656C",
                },
              },
            },
          };

          if (item.action === "logout") {
            return (
              <ListItemButton
                key={item.label}
                onClick={handleLogOut}
                {...commonProps}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          }

          return (
            <ListItemButton
              key={item.label}
              component={RouterLink}
              to={item.to!}
              {...commonProps}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default AccountSidebar;
