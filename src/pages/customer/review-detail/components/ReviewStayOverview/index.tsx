import { BgRoom } from "@assets/images";
import type { BookingResponse } from "@constant/response/BookingResponse";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import HotelOutlined from "@mui/icons-material/HotelOutlined";
import PeopleOutlineRounded from "@mui/icons-material/PeopleOutlineRounded";
import { Box, Stack, Typography } from "@mui/material";
import { diffNights } from "@utils/format";
import { useState } from "react";

interface ReviewStayOverviewProps {
  booking: BookingResponse;
}

const unsuitableImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;
const displayDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const ReviewStayOverview = ({ booking }: ReviewStayOverviewProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const roomImage = booking.room.roomType.roomTypeImages?.find(
    (image) => image.url && !unsuitableImagePattern.test(image.url),
  );
  const image = imageFailed || !roomImage ? BgRoom : roomImage.url;
  const nights = diffNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Box
      component="section"
      aria-label="Kỳ nghỉ được đánh giá"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "minmax(210px, 34%) minmax(0, 1fr)" },
        bgcolor: "#F2EEE7",
        borderRadius: { xs: 1.5, md: 2 },
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={image}
        onError={() => setImageFailed(true)}
        alt={`Phòng ${booking.room.roomType.name} tại Diamond Sea`}
        sx={{ width: 1, height: { xs: 210, sm: 250 }, objectFit: "cover", display: "block" }}
      />
      <Stack justifyContent="center" sx={{ p: { xs: 2.5, sm: 3.25, lg: 4 } }}>
        <Typography
          component="h2"
          sx={{
            color: "#173C4B",
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: { xs: 24, md: 28 },
            lineHeight: 1.2,
            overflowWrap: "anywhere",
          }}
        >
          {booking.room.roomType.name}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 0.65, overflowWrap: "anywhere" }}>
          Phòng {booking.room.name} · Mã đặt phòng {booking.bookingCode}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 2.25, flexWrap: "wrap", rowGap: 0.5 }}>
          <Typography fontWeight={600} color="#263F49">{displayDate(booking.checkInDate)}</Typography>
          <ArrowForwardRounded aria-hidden sx={{ color: "primary.main", fontSize: 19 }} />
          <Typography fontWeight={600} color="#263F49">{displayDate(booking.checkOutDate)}</Typography>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.8, sm: 2.5 }} sx={{ mt: 1.25, color: "text.secondary" }}>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <HotelOutlined sx={{ fontSize: 18 }} aria-hidden />
            <Typography variant="body2">{nights} đêm</Typography>
          </Stack>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <PeopleOutlineRounded sx={{ fontSize: 18 }} aria-hidden />
            <Typography variant="body2">Sức chứa tối đa {booking.room.roomType.capacity} khách</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewStayOverview;
