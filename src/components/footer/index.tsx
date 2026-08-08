import { Box, Container, Divider, Grid, IconButton, Link as MuiLink, Stack, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const linkSx = { color: "rgba(255,255,255,.68)", "&:hover": { color: "#fff" } } as const;
const Footer = () => (
  <Box component="footer" id="contact" sx={{ bgcolor: "#0d2936", color: "#fff", pt: { xs: 7, md: 9 }, scrollMarginTop: 90 }}>
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 6, md: 8 }}>
        <Grid size={{ xs: 12, md: 4 }}><Typography variant="h4" sx={{ fontFamily: "Georgia, serif", color: "inherit" }}>Diamond Sea</Typography><Typography sx={{ mt: 2, maxWidth: 330, lineHeight: 1.8, color: "rgba(255,255,255,.65)" }}>Một kỳ nghỉ hiện đại bên bờ biển, nơi bạn tận hưởng Đà Nẵng theo nhịp riêng.</Typography><Stack direction="row" spacing={1} sx={{ mt: 3 }}><IconButton aria-label="Facebook" sx={{ color: "#fff", border: "1px solid rgba(255,255,255,.24)" }}><FacebookRoundedIcon /></IconButton><IconButton aria-label="Instagram" sx={{ color: "#fff", border: "1px solid rgba(255,255,255,.24)" }}><InstagramIcon /></IconButton></Stack></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}><Typography fontWeight={700} sx={{ mb: 2.5, color: "inherit" }}>Khám phá</Typography><Stack spacing={1.5}><MuiLink href="/#rooms" sx={linkSx}>Phòng nghỉ</MuiLink><MuiLink href="/#facilities" sx={linkSx}>Tiện nghi</MuiLink><MuiLink href="/#about" sx={linkSx}>Về chúng tôi</MuiLink><MuiLink href="/#contact" sx={linkSx}>Liên hệ</MuiLink></Stack></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}><Typography fontWeight={700} sx={{ mb: 2.5, color: "inherit" }}>Dịch vụ khách</Typography><Stack spacing={1.5}><MuiLink component={Link} to="/search" sx={linkSx}>Tìm phòng</MuiLink><MuiLink component={Link} to="/account/bookings" sx={linkSx}>Đặt phòng của tôi</MuiLink><MuiLink href="/#contact" sx={linkSx}>Trợ giúp</MuiLink><MuiLink href="/#contact" sx={linkSx}>Câu hỏi thường gặp</MuiLink></Stack></Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4 }}><Typography fontWeight={700} sx={{ mb: 2.5, color: "inherit" }}>Liên hệ</Typography><Stack spacing={1.25} sx={{ color: "rgba(255,255,255,.68)" }}><Typography>71 Ngũ Hành Sơn, Đà Nẵng</Typography><MuiLink href="tel:+842363888999" sx={linkSx}>+84 236 3888 999</MuiLink><MuiLink href="mailto:contact@diamondsea.com" sx={linkSx}>contact@diamondsea.com</MuiLink><Typography>Lễ tân phục vụ 24/7</Typography></Stack></Grid>
      </Grid>
      <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,.14)" }} />
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ pb: 4, color: "rgba(255,255,255,.5)" }}><Typography variant="body2">© {new Date().getFullYear()} Diamond Sea Da Nang.</Typography><Stack direction="row" spacing={3}><Typography variant="body2">Điều khoản</Typography><Typography variant="body2">Quyền riêng tư</Typography></Stack></Stack>
    </Container>
  </Box>
);
export default Footer;
