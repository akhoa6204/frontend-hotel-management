import { ImageHotel } from "@assets/images";
import { SearchBar } from "@components";
import { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  form: SearchBookingFilter;
  onChange: (field: keyof SearchBookingFilter, value: string | number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const HeroSection = (props: Props) => (
  <Box component="section" sx={{ bgcolor: "#f3f0e9", pb: { xs: 7, md: 10 } }}>
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 650, sm: 720, md: 760 },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `linear-gradient(90deg, rgba(8,25,37,.82) 0%, rgba(8,25,37,.48) 50%, rgba(8,25,37,.12) 100%), url(${ImageHotel})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ pb: { xs: 20, md: 13 } }}>
        <Box sx={{ maxWidth: 700, color: "#fff" }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 19, color: "#9bc4d7" }} />
            <Typography sx={{ letterSpacing: 2.8, fontSize: 12, fontWeight: 700, color: "#d9edf5" }}>
              BỜ BIỂN ĐÀ NẴNG, VIỆT NAM
            </Typography>
          </Stack>
          <Typography component="h1" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 48, sm: 66, md: 82 }, fontWeight: 400, lineHeight: 1.02, letterSpacing: "-.035em", color: "inherit" }}>
            Chạm vào nhịp sống bên biển.
          </Typography>
          <Typography sx={{ mt: 3, maxWidth: 560, fontSize: { xs: 17, md: 19 }, lineHeight: 1.75, color: "rgba(255,255,255,.84)" }}>
            Một kỳ nghỉ hiện đại, thư thái giữa làn gió biển và năng lượng của thành phố Đà Nẵng.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4, alignItems: { xs: "stretch", sm: "center" } }}>
            <Button component={Link} to="/search" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ px: 3.5, py: 1.35 }}>
              Đặt kỳ nghỉ
            </Button>
            <Button component="a" href="#rooms" size="large" sx={{ color: "#fff", px: 2, "&:hover": { bgcolor: "rgba(255,255,255,.1)" } }}>
              Khám phá phòng
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
    <Container maxWidth="lg" sx={{ mt: { xs: -17, md: -7 }, position: "relative", zIndex: 2 }}>
      <SearchBar {...props} />
    </Container>
  </Box>
);

export default HeroSection;
