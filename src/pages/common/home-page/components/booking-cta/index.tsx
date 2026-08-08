import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const BookingCta = () => <Box component="section" sx={{ py: { xs: 9, md: 12 }, textAlign: "center" }}><Stack alignItems="center" spacing={3}><Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>KỲ NGHỈ ĐANG CHỜ BẠN</Typography><Typography component="h2" sx={{ maxWidth: 720, fontFamily: "Georgia, serif", fontSize: { xs: 42, md: 62 }, lineHeight: 1.1 }}>Hành trình Đà Nẵng bắt đầu từ đây.</Typography><Typography color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.8 }}>Chọn ngày lưu trú và để Diamond Sea chuẩn bị một không gian thật thoải mái cho bạn.</Typography><Button component={Link} to="/search" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ px: 4, py: 1.45 }}>Đặt kỳ nghỉ</Button></Stack></Box>;
export default BookingCta;
