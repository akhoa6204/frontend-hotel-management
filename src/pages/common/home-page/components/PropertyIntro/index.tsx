import { BgRoom } from "@assets/images";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, fadeUp, revealViewport } from "../../motion";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

const PropertyIntro = () => {
  const { t } = useTranslation("client");
  const reducedMotion = useReducedMotion();
  return (
  <Box component="section" id="about" sx={{ py: { xs: 9, md: 14 }, scrollMarginTop: 90 }}>
    <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center">
      <Grid size={{ xs: 12, md: 7 }}><MotionBox variants={fadeScale(reducedMotion)} initial="hidden" whileInView="visible" viewport={revealViewport} sx={{ overflow: "hidden" }}><Box component="img" src={BgRoom} alt={t("home.intro.imageAlt")} sx={{ display: "block", width: 1, height: { xs: 420, md: 650 }, objectFit: "cover" }} /></MotionBox></Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <MotionBox variants={fadeUp(reducedMotion, 28, 0.06)} initial="hidden" whileInView="visible" viewport={revealViewport}><Stack spacing={3}>
          <Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>{t("home.intro.eyebrow")}</Typography>
          <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 38, md: 52 }, lineHeight: 1.15 }}>{t("home.intro.title")}</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.85 }}>{t("home.intro.firstParagraph")}</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.85 }}>{t("home.intro.secondParagraph")}</Typography>
          <Button component="a" href="#facilities" endIcon={<ArrowForwardRoundedIcon />} sx={{ alignSelf: "flex-start", px: 0 }}>{t("home.intro.exploreAmenities")}</Button>
        </Stack></MotionBox>
      </Grid>
    </Grid>
  </Box>
  );
};
export default PropertyIntro;
