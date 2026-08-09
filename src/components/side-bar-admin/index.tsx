import type { ReactNode } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@store/slice/account.slice";
import useAuth from "@hooks/useAuth";
import type { UserRole } from "@enums/UserRole";

interface MenuItem {
  label: string;
  icon: ReactNode;
  path: string;
  allowedRoles: UserRole[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

interface Props {
  onNavigate?: () => void;
}

const menuGroups: MenuGroup[] = [
  {
    label: "TỔNG QUAN",
    items: [
      {
        label: "Dashboard",
        icon: <DashboardOutlinedIcon />,
        path: "/manager/dashboard",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    label: "VẬN HÀNH",
    items: [
      {
        label: "Quản lý đặt phòng",
        icon: <BookOnlineOutlinedIcon />,
        path: "/manager/bookings",
        allowedRoles: ["ADMIN", "MANAGER", "RECEPTIONIST"],
      },
      {
        label: "Lễ tân",
        icon: <MeetingRoomOutlinedIcon />,
        path: "/manager/front-desk",
        allowedRoles: ["RECEPTIONIST"],
      },
      {
        label: "Quản lý phòng",
        icon: <HotelOutlinedIcon />,
        path: "/manager/rooms",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Quản lý loại phòng",
        icon: <BedOutlinedIcon />,
        path: "/manager/room-types",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Buồng phòng",
        icon: <CleaningServicesOutlinedIcon />,
        path: "/manager/housekeeping-tasks",
        allowedRoles: ["ADMIN", "MANAGER", "RECEPTIONIST", "HOUSEKEEPING"],
      },
      {
        label: "Quản lý lịch làm",
        icon: <CalendarMonthOutlinedIcon />,
        path: "/manager/shifts",
        allowedRoles: ["ADMIN", "MANAGER", "RECEPTIONIST", "HOUSEKEEPING"],
      },
    ],
  },
  {
    label: "KINH DOANH",
    items: [
      {
        label: "Quản lý khuyến mãi",
        icon: <LocalOfferOutlinedIcon />,
        path: "/manager/promotions",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Quản lý dịch vụ",
        icon: <RoomServiceOutlinedIcon />,
        path: "/manager/services",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    label: "TRẢI NGHIỆM",
    items: [
      {
        label: "Quản lý đánh giá",
        icon: <RateReviewOutlinedIcon />,
        path: "/manager/reviews",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    label: "HỆ THỐNG",
    items: [
      {
        label: "Quản lý nhân viên",
        icon: <PeopleOutlineIcon />,
        path: "/manager/employees",
        allowedRoles: ["ADMIN", "MANAGER"],
      },
    ],
  },
];

const AdminSideBar = ({ onNavigate }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasRole } = useAuth();

  const visibleGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.allowedRoles.some((role) => hasRole(role)),
      ),
    }))
    .filter((group) => group.items.length > 0);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Box
      component="aside"
      aria-label="Điều hướng quản trị"
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
          HOTEL OPERATIONS
        </Typography>
      </Box>

      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.125,
          pt: 1.25,
          pb: 1.5,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(152, 162, 179, 0.35) transparent",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(152, 162, 179, 0.35)",
            borderRadius: 999,
          },
          "&:hover::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(152, 162, 179, 0.55)",
          },
        }}
      >
        {visibleGroups.map((group, groupIndex) => (
          <Box key={group.label} sx={{ mt: groupIndex === 0 ? 0 : 1.5 }}>
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
              {group.label}
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
                      primary={item.label}
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
        <ListItemButton
          onClick={handleLogOut}
          sx={{
            minHeight: 40,
            px: 1.5,
            borderRadius: "6px",
            color: "#667085",
            transition: "background-color 130ms ease, color 130ms ease",
            "&:hover": {
              bgcolor: "#FFF5F5",
              color: "#C94A4A",
              "& .MuiListItemIcon-root": { color: "#C94A4A" },
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
              color: "#98A2B3",
              transition: "color 130ms ease",
              "& svg": { fontSize: 18 },
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Đăng xuất"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default AdminSideBar;
