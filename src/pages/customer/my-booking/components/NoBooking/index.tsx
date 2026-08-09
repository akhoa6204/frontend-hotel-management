import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { BookingTab } from "../../useMyBooking";

const messages: Record<BookingTab, { title: string; description: string }> = {
  upcoming: { title: "Bạn chưa có kỳ nghỉ nào sắp tới.", description: "Khám phá những căn phòng phù hợp cho kỳ nghỉ tiếp theo tại Diamond Sea." },
  done: { title: "Chưa có kỳ nghỉ đã hoàn tất.", description: "Lịch sử lưu trú của bạn sẽ xuất hiện tại đây sau khi trả phòng." },
  cancelled: { title: "Bạn chưa có đặt phòng đã hủy.", description: "Các đặt phòng đã hủy sẽ được lưu tại đây để bạn dễ dàng theo dõi." },
};

const NoBooking = ({ step }: { step: BookingTab }) => {
  const navigate = useNavigate();
  const content = messages[step];
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid rgba(23, 60, 75, 0.10)" }}>
      <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 23, md: 26 } }}>{content.title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 560, lineHeight: 1.7 }}>{content.description}</Typography>
      {step === "upcoming" && <Button variant="contained" onClick={() => navigate("/search")} sx={{ mt: 2.5 }}>Khám phá phòng</Button>}
    </Box>
  );
};

export default NoBooking;
