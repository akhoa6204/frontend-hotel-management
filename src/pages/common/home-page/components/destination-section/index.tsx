import { ImageHotel } from "@assets/images";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { fadeScale, fadeUp, revealViewport } from "../../motion";

const MotionBox = motion(Box);

const directions = "https://www.google.com/maps/search/?api=1&query=Diamond+Sea+Hotel+Da+Nang";
const DestinationSection = () => {
  const reducedMotion = useReducedMotion();
  return (
  <Box component="section" id="location" sx={{ py: { xs: 9, md: 14 } }}>
    <Grid container spacing={{ xs: 5, md: 0 }} alignItems="stretch">
      <Grid size={{ xs: 12, md: 5 }} sx={{ bgcolor: "#123443", color: "#fff", p: { xs: 4, sm: 6, md: 8 } }}>
        <MotionBox variants={fadeUp(reducedMotion, 26)} initial="hidden" whileInView="visible" viewport={revealViewport} sx={{ height: 1 }}><Stack justifyContent="center" sx={{ height: 1 }}><LocationOnOutlinedIcon sx={{ color: "#94c7dd", fontSize: 34 }} /><Typography component="h2" sx={{ mt: 3, fontFamily: "Georgia, serif", fontSize: { xs: 38, md: 50 }, color: "inherit" }}>Đà Nẵng ngay ngoài ô cửa.</Typography><Typography sx={{ mt: 2.5, lineHeight: 1.8, color: "rgba(255,255,255,.74)" }}>Gần bờ biển, thuận tiện kết nối trung tâm thành phố và những điểm đến đặc trưng của miền Trung.</Typography><Stack spacing={1.25} sx={{ my: 4, color: "rgba(255,255,255,.9)" }}><Typography>• Biển Mỹ Khê — vài phút di chuyển</Typography><Typography>• Cầu Rồng — khoảng 10 phút</Typography><Typography>• Phố cổ Hội An — khoảng 35 phút</Typography></Stack><Button component="a" href={directions} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<ArrowOutwardRoundedIcon />} sx={{ alignSelf: "flex-start", transition: "transform .2s ease", "&:hover": { transform: reducedMotion ? "none" : "translateY(-1px)" } }}>Xem đường đi</Button></Stack></MotionBox>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}><MotionBox variants={fadeScale(reducedMotion)} initial="hidden" whileInView="visible" viewport={revealViewport} sx={{ height: 1, overflow: "hidden" }}><Box component="img" src={ImageHotel} alt="Không gian nghỉ dưỡng và hồ bơi" sx={{ display: "block", width: 1, height: { xs: 420, md: 620 }, objectFit: "cover" }} /></MotionBox></Grid>
    </Grid>
  </Box>
  );
};
export default DestinationSection;
