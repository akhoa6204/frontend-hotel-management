import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LockReset from "@mui/icons-material/LockReset";
import Logout from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "@hooks/useAuth";
import { useAppDispatch } from "@hooks/useRedux";
import { logout } from "@store/slice/account.slice";

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const navLinks = [
  { label: "Trang chủ", link: "/" },
  { label: "Phòng", link: "/#rooms" },
  { label: "Tiện nghi", link: "/#facilities" },
  { label: "Về chúng tôi", link: "/#about" },
  { label: "Liên hệ", link: "/#contact" },
];

function UserMenu({
  userName,
  onProfile,
  onChangePassword,
  onLogout,
}: {
  userName: string;
  onProfile: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <button
        type="button"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className="flex items-center gap-2 cursor-pointer bg-transparent border-0 outline-none"
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#2E90FA" }}>
          {userName?.[0]?.toUpperCase() ?? "U"}
        </Avatar>
        <span className="font-semibold hover:text-[#2E90FA] transition-colors">
          {userName}
        </span>
      </button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 2,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onProfile();
          }}
        >
          <ListItemIcon>
            <PersonOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onChangePassword();
          }}
        >
          <ListItemIcon>
            <LockReset fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Đổi mật khẩu" />
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </MenuItem>
      </Menu>
    </>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const transition = { type: "spring", stiffness: 260, damping: 20 } as const;

  const { user } = useAuth();

  const renderNav = (mobile = false) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        gap: mobile ? 1 : 32 / 8,
        alignItems: mobile ? "flex-start" : "center",
        width: mobile ? 1 : "auto",
      }}
    >
      {navLinks.map((n, i) => {
        const [targetPath, targetHash = ""] = n.link.split("#");
        const isActive = location.pathname === targetPath && location.hash === (targetHash ? `#${targetHash}` : "");

        return (
          <MotionBox
            key={n.link}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.06, ...transition },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{ width: mobile ? 1 : "auto" }}
          >
            <a
              href={n.link}
              onClick={() => mobile && setOpen(false)}
              className="no-underline"
              aria-current={isActive ? "page" : undefined}
              style={mobile ? { display: "flex", alignItems: "center", minHeight: 44 } : undefined}
            >
              <span
                className={[
                  "relative transition-colors",
                  mobile ? "px-0 py-1 text-lg font-medium" : "px-2 py-1 text-sm font-medium",
                  isActive
                    ? "text-[#2E90FA]"
                    : "text-slate-900 hover:text-[#2E90FA]",
                  "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-[#2E90FA] after:transition-transform after:origin-left",
                  mobile ? "after:w-6" : "after:right-0",
                  isActive ? "after:scale-x-100" : "after:scale-x-0",
                ].join(" ")}
              >
                {n.label}
              </span>
            </a>
          </MotionBox>
        );
      })}
    </Box>
  );

  const goProfile = () => navigate("/account/profile?tab=info");
  const goChangePassword = () => navigate("/account/profile?tab=security");
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: "rgba(255,255,255,.94)",
          borderBottom: "1px solid rgba(0,0,0,.06)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={{ xs: 1.5, md: 1.75 }}
          >
            {/* Logo */}
            <Typography
              variant="h5"
              color="#153746"
              fontWeight={600}
              sx={{ cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: ".02em" }}
              onClick={() => navigate("/")}
            >
              Diamond Sea
            </Typography>

            {/* Desktop nav */}
            {!isMobile && (
              <>
                <Stack direction="row" spacing={4} alignItems="center">
                  {renderNav(false)}
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                {user ? (
                  <UserMenu
                    userName={user.fullName || "User"}
                    onProfile={goProfile}
                    onChangePassword={goChangePassword}
                    onLogout={handleLogOut}
                  />
                ) : (
                  <MotionBox
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Button
                      component={Link}
                      to="/login"
                      fullWidth
                      variant="text"
                    >
                      Đăng nhập
                    </Button>
                  </MotionBox>
                )}
                <Button component={Link} to="/search" variant="contained" sx={{ borderRadius: 1, px: 2.5 }}>Đặt ngay</Button>
                </Stack>
              </>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <MotionIconButton
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Mở menu"
                aria-haspopup="dialog"
                aria-expanded={open}
                sx={{ width: 44, height: 44, color: "#153746" }}
              >
                <MenuIcon />
              </MotionIconButton>
            )}
          </Stack>
        </Container>

        {/* Drawer mobile */}
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              width: "86vw",
              maxWidth: 380,
              bgcolor: "#fcfbf8",
              backgroundImage: "none",
              borderTopLeftRadius: 1.5,
              borderBottomLeftRadius: 1.5,
              boxShadow: "-12px 0 32px rgba(13,52,66,.12)",
            },
          }}
        >
          <MotionBox
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition }}
            sx={{
              minHeight: "100dvh",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              px: { xs: 2.5, sm: 3 },
              py: 2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2.5}
            >
              <Typography
                variant="h5"
                color="#153746"
                fontWeight={600}
                sx={{ cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: ".02em" }}
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                Diamond Sea
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                aria-label="Đóng menu"
                sx={{ width: 44, height: 44, color: "#153746" }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            {renderNav(true)}

            <Box mt="auto" pt={4} pb={1}>
              {user ? (
                <Stack spacing={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setOpen(false);
                      goProfile();
                    }}
                    sx={{ minHeight: 46, borderRadius: 1, color: "#153746", borderColor: "#cbd3d5" }}
                  >
                    Thông tin cá nhân
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setOpen(false);
                      goChangePassword();
                    }}
                    sx={{ minHeight: 46, borderRadius: 1, color: "#153746", borderColor: "#cbd3d5" }}
                  >
                    Đổi mật khẩu
                  </Button>
                  <Button
                    fullWidth
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setOpen(false);
                      handleLogOut();
                    }}
                    sx={{ minHeight: 46, borderRadius: 1 }}
                  >
                    Đăng xuất
                  </Button>
                </Stack>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  fullWidth
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  sx={{ minHeight: 46, borderRadius: 1, color: "#153746", borderColor: "#cbd3d5" }}
                >
                  Đăng nhập
                </Button>
              )}
              <Button
                component={Link}
                to="/search"
                fullWidth
                variant="contained"
                onClick={() => setOpen(false)}
                sx={{ mt: 1.25, minHeight: 46, borderRadius: 1 }}
              >
                Đặt ngay
              </Button>
            </Box>
          </MotionBox>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
