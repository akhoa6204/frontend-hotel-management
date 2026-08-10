import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, revealViewport } from "../../motion";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

const BookingCta = () => {
  const { t } = useTranslation("client");
  const reducedMotion = useReducedMotion();
  return (
    <Box component="section" sx={{ py: { xs: 9, md: 12 }, textAlign: "center" }}>
      <MotionBox variants={fadeUp(reducedMotion, 24)} initial="hidden" whileInView="visible" viewport={revealViewport}>
        <Stack alignItems="center" spacing={3}>
          <Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>{t("home.cta.eyebrow")}</Typography>
          <Typography component="h2" sx={{ maxWidth: 720, fontFamily: "Georgia, serif", fontSize: { xs: 42, md: 62 }, lineHeight: 1.1 }}>{t("home.cta.title")}</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.8 }}>{t("home.cta.description")}</Typography>
          <Button component={Link} to="/search" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ px: 4, py: 1.45, transition: "transform .2s ease, box-shadow .2s ease", "&:hover": { transform: reducedMotion ? "none" : "translateY(-1px)", boxShadow: "0 9px 22px rgba(47,144,250,.2)" } }}>{t("home.cta.bookStay")}</Button>
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default BookingCta;
