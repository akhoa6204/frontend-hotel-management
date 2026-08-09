import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import { BgRoom } from "@assets/images";
import type { BookingResponse } from "@constant/response/BookingResponse";
import { Box, Button, Stack, Typography } from "@mui/material";
import { diffNights, fmtVND } from "@utils/format";
import { getBookingReviewAction } from "@utils/bookingReview";
import { useState } from "react";

interface BookingCardProps {
  booking: BookingResponse;
  onCancel?: () => void;
  onClick?: () => void;
  onReview?: () => void;
  onViewReview?: () => void;
  onReBook?: () => void;
  reviewId?: number;
}

const statusLabels = {
  PENDING: "Đang chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CANCELLED: "Đã hủy",
  CHECKED_IN: "Đang lưu trú",
  CHECKED_OUT: "Đã hoàn tất",
} as const;

const statusColors = {
  PENDING: { color: "#8A6116", background: "#FFF6DD" },
  CONFIRMED: { color: "#176B59", background: "#EAF7F2" },
  CANCELLED: { color: "#A13D38", background: "#FCEDEC" },
  CHECKED_IN: { color: "#185E86", background: "#EAF4FA" },
  CHECKED_OUT: { color: "#565D66", background: "#EFF1F3" },
} as const;

const unsuitableImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;
const displayDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

const BookingCard = ({ booking, onCancel, onClick, onReview, onViewReview, onReBook, reviewId }: BookingCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const suitableImage = booking.room.roomType.roomTypeImages?.find((image) => image.url && !unsuitableImagePattern.test(image.url));
  const image = imageFailed || !suitableImage ? BgRoom : suitableImage.url;
  const nights = diffNights(booking.checkInDate, booking.checkOutDate);
  const roomAmount = Number(booking.roomAmount ?? 0);
  const discount = Number(booking.roomDiscountAmount ?? 0);
  const total = Number(booking.finalAmount ?? booking.roomFinalAmount ?? Math.max(0, roomAmount - discount));
  const remaining = Number(booking.remainingAmount ?? 0);
  const statusStyle = statusColors[booking.status];
  const reviewAction = getBookingReviewAction(
    booking,
    booking.id,
    reviewId === undefined ? undefined : { id: reviewId },
  );

  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(240px, 34%) minmax(0, 1fr)" },
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
        sx={{ width: 1, height: { xs: 190, sm: 228, md: 252 }, objectFit: "cover", display: "block" }}
      />

      <Stack sx={{ p: { xs: 2.25, sm: 2.75, lg: 3 }, minWidth: 0 }} justifyContent="space-between" spacing={2.25}>
        <Box>
          <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-start" }} gap={1.5}>
            <Box sx={{ minWidth: 0 }}>
              <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 23, sm: 26 }, lineHeight: 1.2, overflowWrap: "anywhere" }}>
                {booking.room.roomType.name}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5, overflowWrap: "anywhere" }}>
                Phòng {booking.room.name} · Mã đặt phòng {booking.bookingCode}
              </Typography>
            </Box>
            <Box role="status" sx={{ alignSelf: { xs: "flex-start", sm: "auto" }, display: "inline-flex", alignItems: "center", gap: 0.8, px: 1.25, py: 0.6, borderRadius: 99, bgcolor: statusStyle.background, color: statusStyle.color, fontSize: 12.5, fontWeight: 650, whiteSpace: "nowrap" }}>
              <Box aria-hidden sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "currentColor" }} />
              {statusLabels[booking.status]}
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={{ xs: 1.25, sm: 2 }} sx={{ mt: 2.25 }}>
            <Box><Typography fontSize={11.5} color="text.secondary" sx={{ letterSpacing: ".08em" }}>NHẬN PHÒNG</Typography><Typography fontWeight={600} color="#263F49" mt={0.35}>{displayDate(booking.checkInDate)}</Typography></Box>
            <ArrowForwardRounded aria-hidden sx={{ color: "primary.main", fontSize: 20, flexShrink: 0 }} />
            <Box><Typography fontSize={11.5} color="text.secondary" sx={{ letterSpacing: ".08em" }}>TRẢ PHÒNG</Typography><Typography fontWeight={600} color="#263F49" mt={0.35}>{displayDate(booking.checkOutDate)}</Typography></Box>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {nights} đêm · Sức chứa tối đa {booking.room.roomType.capacity} khách
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "flex-end" }} justifyContent="space-between" gap={2} sx={{ pt: 1.75, borderTop: "1px solid rgba(23, 60, 75, 0.09)" }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: ".06em", textTransform: "uppercase" }}>Tổng giá trị</Typography>
            <Typography sx={{ color: "text.primary", fontSize: 19, fontWeight: 700, mt: 0.25 }}>{fmtVND(total)} VND</Typography>
            {discount > 0 && <Typography variant="caption" color="success.main">Ưu đãi −{fmtVND(discount)} VND</Typography>}
            {remaining > 0 && <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>Còn lại {fmtVND(remaining)} VND</Typography>}
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ width: { xs: 1, sm: "auto" }, "& .MuiButton-root": { minHeight: 40, px: 1.75, width: { xs: 1, sm: "auto" }, whiteSpace: "nowrap" } }}>
            <Button variant="outlined" onClick={onClick}>Xem chi tiết</Button>
            {booking.status === "CONFIRMED" && onCancel && (
              <Button color="error" variant="outlined" onClick={onCancel}>Hủy đặt phòng</Button>
            )}
            {booking.status === "CHECKED_OUT" && (
              <>
                <Button variant="text" startIcon={<ReplayRounded />} onClick={onReBook}>Đặt lại</Button>
                {reviewAction.type === "write" && <Button variant="contained" startIcon={<StarOutlineRounded />} onClick={onReview}>Viết đánh giá</Button>}
                {reviewAction.type === "view" && <Button variant="outlined" startIcon={<StarOutlineRounded />} onClick={onViewReview}>Xem đánh giá</Button>}
              </>
            )}
            {booking.status === "CANCELLED" && <Button variant="outlined" startIcon={<ReplayRounded />} onClick={onReBook}>Đặt lại</Button>}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BookingCard;
