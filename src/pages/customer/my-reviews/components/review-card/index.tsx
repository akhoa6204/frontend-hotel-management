import { BgRoom } from "@assets/images";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { diffNights } from "@utils/format";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ReviewCardProps {
  review: ReviewResponse;
  onView: () => void;
}

const unsuitableImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;
const ReviewCard = ({ review, onView }: ReviewCardProps) => {
  const { t, i18n } = useTranslation("client");
  const displayDate = (value: string) =>
    new Intl.DateTimeFormat(i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
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
        alt={t("reviews.stay.roomImageAlt", { room: booking.room.roomType.name })}
        loading="lazy"
        sx={{ width: 1, height: { xs: 190, sm: 225, md: 255 }, objectFit: "cover", display: "block" }}
      />

      <Stack sx={{ p: { xs: 2.25, sm: 2.75, lg: 3 }, minWidth: 0 }} spacing={2.1} justifyContent="space-between">
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 23, sm: 26 }, lineHeight: 1.2, overflowWrap: "anywhere" }}>
            {booking.room.roomType.name}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5, overflowWrap: "anywhere" }}>
            {t("reviews.stay.roomAndCode", { room: booking.room.name, code: booking.bookingCode })}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 1.8, flexWrap: "wrap", rowGap: 0.5 }}>
            <Typography fontWeight={600} color="#263F49">{displayDate(booking.checkInDate)}</Typography>
            <ArrowForwardRounded aria-hidden sx={{ color: "primary.main", fontSize: 19, flexShrink: 0 }} />
            <Typography fontWeight={600} color="#263F49">{displayDate(booking.checkOutDate)}</Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.6 }}>
            {t("reviews.stay.completedSummary", { count: nights })}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mt: 2 }}>
            <Rating
              value={review.overall}
              max={5}
              precision={1}
              readOnly
              aria-label={t("reviews.rating.aria", { value: review.overall })}
              sx={{ color: "#B78945", fontSize: 21 }}
            />
            <Typography sx={{ color: "text.primary", fontSize: 14, fontWeight: 700 }}>
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
            “{review.comment || t("reviews.comment.noComment")}”
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={1.5} sx={{ pt: 1.75, borderTop: "1px solid rgba(23, 60, 75, 0.09)" }}>
          <Typography variant="caption" color="text.secondary">
            {t("reviews.comment.reviewDate", { date: displayDate(review.createdAt) })}
          </Typography>
          <Button variant="outlined" onClick={onView} sx={{ minHeight: 40, width: { xs: 1, sm: "auto" } }}>
            {t("reviews.actions.viewDetails")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewCard;
