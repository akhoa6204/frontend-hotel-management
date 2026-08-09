import { BgRoom } from "@assets/images";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const CUSTOMER_HEADER_HEIGHT = 68;

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

const AuthLayout = ({ eyebrow, title, description, children }: Props) => (
  <Box
    component="main"
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(380px, 1fr) minmax(500px, 1fr)" },
      alignItems: "stretch",
      minHeight: `calc(100dvh - ${CUSTOMER_HEADER_HEIGHT}px)`,
      bgcolor: "background.default",
    }}
  >
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        position: "relative",
        minHeight: "100%",
        overflow: "hidden",
        bgcolor: "#dce9ef",
        backgroundImage: `linear-gradient(180deg, rgba(13,52,66,.06), rgba(13,52,66,.46)), url(${BgRoom})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        alignItems: "flex-end",
        p: { md: 5, lg: 7 },
      }}
    >
      <Box sx={{ position: "relative", maxWidth: 480, color: "#fff" }}>
        <Typography sx={{ color: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 2.2 }}>DIAMOND SEA ĐÀ NẴNG</Typography>
        <Typography sx={{ mt: 2, color: "inherit", fontFamily: "Georgia, serif", fontSize: { md: 38, lg: 48 }, lineHeight: 1.12 }}>
          Một kỳ nghỉ nhẹ nhàng bắt đầu từ đây.
        </Typography>
        <Typography sx={{ mt: 2, color: "rgba(255,255,255,.84)", lineHeight: 1.75 }}>
          Quản lý đặt phòng và chuẩn bị cho hành trình bên biển trong một không gian riêng tư, thuận tiện.
        </Typography>
      </Box>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", minWidth: 0, px: { xs: 2.5, sm: 4, md: 6, lg: 9 }, py: { xs: 5, sm: 7, md: 6 } }}>
      <Box sx={{ width: 1, maxWidth: 460, mx: "auto" }}>
        <MuiLink component={Link} to="/" underline="none" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: "text.secondary", fontSize: 14, mb: { xs: 4, md: 5 }, "&:hover": { color: "primary.main" } }}>
          <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
          Về trang chủ
        </MuiLink>

        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 750, letterSpacing: 2 }}>{eyebrow}</Typography>
          <Typography component="h1" sx={{ color: "text.primary", fontFamily: "Georgia, serif", fontSize: { xs: 34, sm: 40 }, lineHeight: 1.12 }}>
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 430, lineHeight: 1.7 }}>{description}</Typography>
        </Stack>

        {children}
      </Box>
    </Box>
  </Box>
);

export default AuthLayout;
