import { BgRoom } from "@assets/images";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { diffNights } from "@utils/format";
import { useState } from "react";

interface ReviewCardProps {
  review: ReviewResponse;
  onView: () => void;
}

const unsuitableImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;
const displayDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

const ReviewCard = ({ review, onView }: ReviewCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const { booking } = review;
  const suitableImage = booking.room.roomType.roomTypeImages?.find(
    (image) => image.url && !unsuitableImagePattern.test(image.url),
  );
  const image = imageFailed || !suitableImage ? BgRoom : suitableImage.url;
  const nights = diffNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(230px, 32%) minmax(0, 1fr)" },
        bgcolor: "rgba(255,255,255,.68)",
        border: "1px solid rgba(23, 60, 75, 0.10)",
        borderRadius: 1.5,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={image}
        onError={() => setImageFailed(true)}
        alt={`Phòng ${booking.room.roomType.name} tại Diamond Sea`}
        loading="lazy"
        sx={{ width: 1, height: { xs: 190, sm: 225, md: 255 }, objectFit: "cover", display: "block" }}
      />

      <Stack sx={{ p: { xs: 2.25, sm: 2.75, lg: 3 }, minWidth: 0 }} spacing={2.1} justifyContent="space-between">
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h2" sx={{ color: "#173C4B", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 23, sm: 26 }, lineHeight: 1.2, overflowWrap: "anywhere" }}>
            {booking.room.roomType.name}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5, overflowWrap: "anywhere" }}>
            Phòng {booking.room.name} · Mã đặt phòng {booking.bookingCode}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 1.8, flexWrap: "wrap", rowGap: 0.5 }}>
            <Typography fontWeight={600} color="#263F49">{displayDate(booking.checkInDate)}</Typography>
            <ArrowForwardRounded aria-hidden sx={{ color: "primary.main", fontSize: 19, flexShrink: 0 }} />
            <Typography fontWeight={600} color="#263F49">{displayDate(booking.checkOutDate)}</Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.6 }}>
            {nights} đêm · Kỳ nghỉ đã hoàn tất
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mt: 2 }}>
            <Rating
              value={review.overall}
              max={5}
              precision={1}
              readOnly
              aria-label={`${review.overall} trên 5 điểm`}
              sx={{ color: "#B78945", fontSize: 21 }}
            />
            <Typography sx={{ color: "#173C4B", fontSize: 14, fontWeight: 700 }}>
              {review.overall}/5
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 1.3,
              color: "#465960",
              fontSize: 15,
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              overflowWrap: "anywhere",
            }}
          >
            “{review.comment || "Bạn chưa để lại nhận xét bằng văn bản cho kỳ nghỉ này."}”
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={1.5} sx={{ pt: 1.75, borderTop: "1px solid rgba(23, 60, 75, 0.09)" }}>
          <Typography variant="caption" color="text.secondary">
            Đánh giá ngày {displayDate(review.createdAt)}
          </Typography>
          <Button variant="outlined" onClick={onView} sx={{ minHeight: 40, width: { xs: 1, sm: "auto" } }}>
            Xem chi tiết
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewCard;
