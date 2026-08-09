import { BgRoom } from "@assets/images";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, fadeUp, revealViewport } from "../../motion";

const MotionBox = motion(Box);

const PropertyIntro = () => {
  const reducedMotion = useReducedMotion();
  return (
  <Box component="section" id="about" sx={{ py: { xs: 9, md: 14 }, scrollMarginTop: 90 }}>
    <Grid container spacing={{ xs: 5, md: 10 }} alignItems="center">
      <Grid size={{ xs: 12, md: 7 }}><MotionBox variants={fadeScale(reducedMotion)} initial="hidden" whileInView="visible" viewport={revealViewport} sx={{ overflow: "hidden" }}><Box component="img" src={BgRoom} alt="Kiến trúc hiện đại của Diamond Sea Đà Nẵng" sx={{ display: "block", width: 1, height: { xs: 420, md: 650 }, objectFit: "cover" }} /></MotionBox></Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <MotionBox variants={fadeUp(reducedMotion, 28, 0.06)} initial="hidden" whileInView="visible" viewport={revealViewport}><Stack spacing={3}>
          <Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>CÂU CHUYỆN DIAMOND SEA</Typography>
          <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 38, md: 52 }, lineHeight: 1.15 }}>Một khoảng nghỉ giữa biển và thành phố.</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.85 }}>Diamond Sea mang đến một điểm dừng chân thanh lịch bên bờ biển Đà Nẵng — nơi phòng nghỉ tiện nghi, vị trí thuận tiện và sự chăm sóc chân thành cùng tạo nên một hành trình nhẹ nhàng.</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.85 }}>Từ buổi sáng đón nắng trên biển đến một ngày khám phá thành phố, mọi trải nghiệm đều được thiết kế để bạn tận hưởng Đà Nẵng theo nhịp riêng.</Typography>
          <Button component="a" href="#facilities" endIcon={<ArrowForwardRoundedIcon />} sx={{ alignSelf: "flex-start", px: 0 }}>Khám phá tiện nghi</Button>
        </Stack></MotionBox>
      </Grid>
    </Grid>
  </Box>
  );
};
export default PropertyIntro;
