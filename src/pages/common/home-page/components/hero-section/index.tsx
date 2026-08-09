import { ImageHotel } from "@assets/images";
import { SearchBar } from "@components";
import type { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "../../motion";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

interface Props {
  form: SearchBookingFilter;
  onChange: (field: keyof SearchBookingFilter, value: string | number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const HeroSection = (props: Props) => {
  const reducedMotion = useReducedMotion();
  const enter = (y: number, delay: number) => ({
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: editorialEase },
  });

  return (
  <Box component="section" sx={{ bgcolor: "#f3f0e9", pb: { xs: 7, md: 10 } }}>
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 650, sm: 720, md: 760 },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <MotionBox
        aria-hidden
        initial={{ opacity: reducedMotion ? 1 : 0.86, scale: reducedMotion ? 1 : 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1, ease: editorialEase }}
        sx={{ position: "absolute", inset: 0, backgroundImage: `url(${ImageHotel})`, backgroundSize: "cover", backgroundPosition: "center", willChange: reducedMotion ? "auto" : "transform, opacity" }}
      />
      <Box aria-hidden sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,25,37,.82) 0%, rgba(8,25,37,.48) 50%, rgba(8,25,37,.12) 100%)" }} />
      <Container maxWidth="lg" sx={{ pb: { xs: 20, md: 13 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 700, color: "#fff" }}>
          <MotionStack {...enter(14, 0.08)} direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 19, color: "#9bc4d7" }} />
            <Typography sx={{ letterSpacing: 2.8, fontSize: 12, fontWeight: 700, color: "#d9edf5" }}>
              BỜ BIỂN ĐÀ NẴNG, VIỆT NAM
            </Typography>
          </MotionStack>
          <MotionBox {...enter(24, 0.16)}>
          <Typography component="h1" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 48, sm: 66, md: 82 }, fontWeight: 400, lineHeight: 1.02, letterSpacing: "-.035em", color: "inherit" }}>
            Chạm vào nhịp sống bên biển.
          </Typography>
          </MotionBox>
          <MotionBox {...enter(16, 0.25)}>
          <Typography sx={{ mt: 3, maxWidth: 560, fontSize: { xs: 17, md: 19 }, lineHeight: 1.75, color: "rgba(255,255,255,.84)" }}>
            Một kỳ nghỉ hiện đại, thư thái giữa làn gió biển và năng lượng của thành phố Đà Nẵng.
          </Typography>
          </MotionBox>
          <MotionStack {...enter(18, 0.34)} direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4, alignItems: { xs: "stretch", sm: "center" } }}>
            <Button component={Link} to="/search" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ px: 3.5, py: 1.35 }}>
              Đặt kỳ nghỉ
            </Button>
            <Button component="a" href="#rooms" size="large" sx={{ color: "#fff", px: 2, "&:hover": { bgcolor: "rgba(255,255,255,.1)" } }}>
              Khám phá phòng
            </Button>
          </MotionStack>
        </Box>
      </Container>
    </Box>
    <MotionBox {...enter(20, 0.42)}>
    <Container maxWidth="lg" sx={{ mt: { xs: -17, md: -7 }, position: "relative", zIndex: 2 }}>
      <SearchBar {...props} />
    </Container>
    </MotionBox>
  </Box>
  );
};

export default HeroSection;
