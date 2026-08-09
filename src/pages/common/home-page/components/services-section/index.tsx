import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, revealViewport, stagger } from "../../motion";

const MotionBox = motion(Box);

const amenities = [
  ["Bữa sáng mỗi ngày", <FreeBreakfastOutlinedIcon />], ["Hồ bơi thư giãn", <PoolOutlinedIcon />],
  ["Wi-Fi tốc độ cao", <WifiOutlinedIcon />], ["Bãi đỗ xe", <LocalParkingOutlinedIcon />],
  ["Trung tâm thể hình", <FitnessCenterOutlinedIcon />], ["Không gian làm việc", <WorkOutlineOutlinedIcon />],
  ["Lễ tân 24/7", <AccessTimeOutlinedIcon />], ["Dịch vụ tại phòng", <RoomServiceOutlinedIcon />],
] as const;

const ServicesSection = () => {
  const reducedMotion = useReducedMotion();
  return (
  <Box component="section" id="facilities" sx={{ py: { xs: 9, md: 12 }, scrollMarginTop: 90, borderTop: "1px solid #dfddd6", borderBottom: "1px solid #dfddd6" }}>
    <Grid container spacing={{ xs: 5, md: 8 }}>
      <Grid size={{ xs: 12, md: 4 }}><MotionBox variants={fadeUp(reducedMotion)} initial="hidden" whileInView="visible" viewport={revealViewport}><Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>TIỆN NGHI ĐẶC TRƯNG</Typography><Typography component="h2" sx={{ mt: 1.5, fontFamily: "Georgia, serif", fontSize: { xs: 38, md: 48 }, lineHeight: 1.18 }}>Mọi điều bạn cần, được chăm chút vừa đủ.</Typography></MotionBox></Grid>
      <Grid size={{ xs: 12, md: 8 }}><MotionBox variants={stagger(reducedMotion, 0.05, 0.07)} initial="hidden" whileInView="visible" viewport={revealViewport}><Grid container rowSpacing={4.5} columnSpacing={4}>{amenities.map(([title, icon]) => <Grid size={{ xs: 6, sm: 3 }} key={title}><MotionBox variants={fadeUp(reducedMotion, 16)}><Stack spacing={1.5} sx={{ color: "#183746", "& svg": { fontSize: 30, color: "primary.main" } }}>{icon}<Typography fontWeight={600}>{title}</Typography></Stack></MotionBox></Grid>)}</Grid></MotionBox></Grid>
    </Grid>
  </Box>
  );
};
export default ServicesSection;
