import { useState, type ReactNode } from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@store/slice/account.slice";
import useAuth from "@hooks/useAuth";
import type { UserRole } from "@enums/UserRole";
import { useTranslation } from "react-i18next";
import type { AdminLanguage } from "../../i18n";

interface MenuItem {
  labelKey: string;
  icon: ReactNode;
  path: string;
  allowedRoles: UserRole[];
}

interface MenuGroup {
  labelKey: string;
  items: MenuItem[];
}

interface Props {
  onNavigate?: () => void;
}

const menuGroups: MenuGroup[] = [
  {
    labelKey: "groups.overview",
    items: [
      {
        labelKey: "items.dashboard",
        icon: <DashboardOutlinedIcon />,
        path: "/manager/dashboard",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    labelKey: "groups.operations",
    items: [
      {
        labelKey: "items.bookings",
        icon: <BookOnlineOutlinedIcon />,
        path: "/manager/bookings",
        allowedRoles: ["ADMIN", "MANAGER", "RECEPTIONIST"],
      },
      {
        labelKey: "items.frontDesk",
        icon: <MeetingRoomOutlinedIcon />,
        path: "/manager/front-desk",
        allowedRoles: ["RECEPTIONIST"],
      },
      {
        labelKey: "items.rooms",
        icon: <HotelOutlinedIcon />,
        path: "/manager/rooms",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
      {
        labelKey: "items.roomTypes",
        icon: <BedOutlinedIcon />,
        path: "/manager/room-types",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
      {
        labelKey: "items.housekeeping",
        icon: <CleaningServicesOutlinedIcon />,
        path: "/manager/housekeeping-tasks",
        allowedRoles: ["ADMIN", "MANAGER", "RECEPTIONIST", "HOUSEKEEPING"],
      },
      {
        labelKey: "items.schedules",
        icon: <CalendarMonthOutlinedIcon />,
        path: "/manager/shifts",
        allowedRoles: ["ADMIN", "MANAGER", "RECEPTIONIST", "HOUSEKEEPING"],
      },
    ],
  },
  {
    labelKey: "groups.business",
    items: [
      {
        labelKey: "items.promotions",
        icon: <LocalOfferOutlinedIcon />,
        path: "/manager/promotions",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
      {
        labelKey: "items.services",
        icon: <RoomServiceOutlinedIcon />,
        path: "/manager/services",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    labelKey: "groups.experience",
    items: [
      {
        labelKey: "items.reviews",
        icon: <RateReviewOutlinedIcon />,
        path: "/manager/reviews",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    labelKey: "groups.system",
    items: [
      {
        labelKey: "items.staff",
        icon: <PeopleOutlineIcon />,
        path: "/manager/employees",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
];

const AdminSideBar = ({ onNavigate }: Props) => {
  const { t, i18n } = useTranslation(["navigation", "common"]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, hasRole } = useAuth();
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<HTMLElement | null>(null);
  const accountMenuOpen = Boolean(accountMenuAnchor);
  const profileActive = location.pathname === "/manager/profile";
  const language: AdminLanguage = i18n.resolvedLanguage === "en" ? "en" : "vi";

  const visibleGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.allowedRoles.some((role) => hasRole(role)),
      ),
    }))
    .filter((group) => group.items.length > 0);

  const handleLogOut = () => {
    setAccountMenuAnchor(null);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const openMyAccount = () => {
    setAccountMenuAnchor(null);
    navigate("/manager/profile");
    onNavigate?.();
  };

  const changeLanguage = (nextLanguage: AdminLanguage) => {
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <Box
      component="aside"
      aria-label={t("aria.adminNavigation", { ns: "navigation" })}
      sx={{
        width: 236,
        height: "100dvh",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #EAECF0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          minHeight: 66,
          px: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 19,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          Diamond Sea
        </Typography>
        <Typography
          sx={{
            mt: 0.45,
            color: "#98A2B3",
            fontSize: 10,
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: "0.14em",
          }}
        >
          {t("product", { ns: "navigation" })}
        </Typography>
      </Box>

      <Box
        component="nav"
        className="admin-scrollbar"
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.125,
          pt: 1.25,
          pb: 1.5,
        }}
      >
        {visibleGroups.map((group, groupIndex) => (
          <Box key={group.labelKey} sx={{ mt: groupIndex === 0 ? 0 : 1.5 }}>
            <Typography
              component="h2"
              sx={{
                px: 1.5,
                pt: groupIndex === 0 ? 0.25 : 0.5,
                pb: 0.625,
                color: "#98A2B3",
                fontSize: 10,
                lineHeight: 1.4,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {t(group.labelKey, { ns: "navigation" })}
            </Typography>

            <List disablePadding>
              {group.items.map((item) => {
                const active = location.pathname.startsWith(item.path);

                return (
                  <ListItemButton
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    selected={active}
                    onClick={onNavigate}
                    sx={{
                      position: "relative",
                      minHeight: 40,
                      px: 1.5,
                      py: 0.5,
                      mb: 0.25,
                      borderRadius: "6px",
                      color: active ? "#2E90FA" : "#667085",
                      transition: "background-color 130ms ease, color 130ms ease",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        width: 2,
                        height: 20,
                        borderRadius: 999,
                        transform: "translateY(-50%)",
                        bgcolor: active ? "#2E90FA" : "transparent",
                      },
                      "&.Mui-selected": {
                        bgcolor: "#F0F6FD",
                        color: "#2E90FA",
                      },
                      "&.Mui-selected:hover": { bgcolor: "#F0F6FD" },
                      "&:hover": {
                        bgcolor: active ? "#F0F6FD" : "#F8FAFC",
                        color: active ? "#2E90FA" : "#344054",
                        "& .MuiListItemIcon-root": {
                          color: active ? "#2E90FA" : "#667085",
                        },
                      },
                      "&:focus-visible": {
                        outline: "2px solid #2E90FA",
                        outlineOffset: -2,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 28,
                        color: active ? "#2E90FA" : "#98A2B3",
                        transition: "color 130ms ease",
                        "& svg": { fontSize: 18 },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={t(item.labelKey, { ns: "navigation" })}
                      primaryTypographyProps={{
                        fontSize: 13,
                        lineHeight: 1.35,
                        fontWeight: active ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      <Box sx={{ borderTop: "1px solid #EAECF0", p: 1.25 }}>
        {user && (
          <ListItemButton
            aria-label={t("aria.openAccount", { ns: "navigation", name: user.fullName })}
            aria-haspopup="menu"
            aria-controls={accountMenuOpen ? "admin-account-menu" : undefined}
            aria-expanded={accountMenuOpen ? "true" : undefined}
            onClick={(event) => setAccountMenuAnchor(event.currentTarget)}
            sx={{
              minHeight: 68,
              px: 1.25,
              py: 1,
              display: "grid",
              gridTemplateColumns: "36px minmax(0, 1fr) 24px",
              columnGap: 1,
              alignItems: "center",
              borderRadius: "7px",
              bgcolor: profileActive ? "#F5F9FF" : "transparent",
              transition: "background-color 130ms ease",
              "&:hover": { bgcolor: profileActive ? "#F0F6FD" : "#F8FAFC" },
              "&:focus-visible": { outline: "2px solid #2E90FA", outlineOffset: -2 },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#EAF4FF",
                color: "#1D6FC2",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {user.fullName?.trim().charAt(0).toUpperCase() || "A"}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ color: "#1F2937", fontSize: 13, fontWeight: 650, lineHeight: 1.35 }}>
                {user.fullName}
              </Typography>
              <Typography noWrap sx={{ mt: 0.1, color: "#667085", fontSize: 11.5, lineHeight: 1.35 }}>
                {t(`roles.${user.roleName}`, { ns: "common" })}
              </Typography>
            </Box>
            <MoreVertIcon aria-hidden sx={{ color: "#98A2B3", fontSize: 19 }} />
          </ListItemButton>
        )}
      </Box>

      <Menu
        id="admin-account-menu"
        anchorEl={accountMenuAnchor}
        open={accountMenuOpen}
        onClose={() => setAccountMenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        MenuListProps={{ "aria-label": t("aria.accountOptions", { ns: "navigation" }) }}
        slotProps={{ paper: { className: "admin-scrollbar", sx: { width: 232, mb: 0.75, p: 0.75, border: "1px solid #E4E7EC", borderRadius: "9px", boxShadow: "0 10px 28px rgba(16,24,40,0.14)" } } }}
      >
        {user && <Box sx={{ px: 1.25, py: 0.75 }}><Typography noWrap sx={{ color: "#1F2937", fontSize: 13, fontWeight: 650 }}>{user.fullName}</Typography><Typography noWrap sx={{ mt: 0.15, color: "#667085", fontSize: 11.75 }}>{user.email}</Typography></Box>}
        <Divider sx={{ my: 0.5, borderColor: "#EAECF0" }} />
        <MenuItem onClick={openMyAccount} selected={profileActive} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", color: "#475467", fontSize: 13.5, "&.Mui-selected": { bgcolor: "#F5F9FF", color: "#1D6FC2" } }}><PersonOutlineIcon sx={{ color: "inherit", fontSize: 18 }} />{t("account", { ns: "navigation" })}</MenuItem>
        <Box sx={{ minHeight: 40, px: 1.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography sx={{ color: "#475467", fontSize: 13 }}>{t("language", { ns: "navigation" })}</Typography>
          <Box role="group" aria-label={t("language", { ns: "navigation" })} sx={{ display: "flex", alignItems: "center", p: 0.25, bgcolor: "#F2F4F7", borderRadius: "6px" }}>
            {(["vi", "en"] as const).map((option) => (
              <Box component="button" type="button" key={option} aria-pressed={language === option} onClick={() => changeLanguage(option)} sx={{ border: 0, minWidth: 32, height: 26, px: 0.75, borderRadius: "5px", bgcolor: language === option ? "#FFFFFF" : "transparent", color: language === option ? "#1D6FC2" : "#667085", boxShadow: language === option ? "0 1px 2px rgba(16,24,40,0.10)" : "none", font: "inherit", fontSize: 11.5, fontWeight: 700, cursor: "pointer", "&:focus-visible": { outline: "2px solid #2E90FA", outlineOffset: 1 } }}>
                {option.toUpperCase()}
              </Box>
            ))}
          </Box>
        </Box>
        <Divider sx={{ my: 0.5, borderColor: "#EAECF0" }} />
        <MenuItem onClick={handleLogOut} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", color: "#475467", fontSize: 13.5, "&:hover": { bgcolor: "#FEF3F2", color: "#C94A4A" } }}><LogoutOutlinedIcon sx={{ color: "inherit", fontSize: 18 }} />{t("logout", { ns: "navigation" })}</MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminSideBar;
