import type { ReviewOverviewResponse } from "@constant/response/ReviewOverviewResponse";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import { diffNights, formatDate } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props {
  stats?: ReviewOverviewResponse;
  reviews: ReviewResponse[];
}

const getInitial = (name: string) => name.trim().charAt(0).toLocaleUpperCase("vi-VN") || "K";

const ReviewSection = ({ stats, reviews }: Props) => {
  const { t } = useTranslation("client");

  return (
  <Box sx={{ py: { xs: 5.5, md: 7 }, borderTop: "1px solid #dcd9d1", borderBottom: "1px solid #dcd9d1" }}>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 650px) auto" },
        alignItems: { md: "end" },
        gap: { xs: 2.25, md: 5 },
        mb: { xs: 4, md: 5 },
      }}
    >
      <Box>
        <Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>
          {t("roomDetail.reviews.eyebrow")}
        </Typography>
        <Typography
          component="h2"
          sx={{ mt: 1.25, color: "text.primary", fontFamily: "Georgia, serif", fontSize: { xs: 32, sm: 38, md: 44 }, lineHeight: 1.16 }}
        >
          {t("roomDetail.reviews.title")}
        </Typography>
      </Box>

      {stats && (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: "fit-content" }}>
          <Typography sx={{ color: "text.primary", fontFamily: "Georgia, serif", fontSize: { xs: 30, md: 34 }, lineHeight: 1 }}>
            {stats.avgOverall.toFixed(1)}
          </Typography>
          <Box>
            <Rating value={stats.avgOverall} precision={0.1} readOnly size="small" aria-label={t("roomDetail.reviews.ratingLabel", { rating: stats.avgOverall.toFixed(1) })} sx={{ color: "rating.main", display: "flex" }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {t("roomDetail.reviews.count", { count: stats.totalReviews })}
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>

    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 2.25, md: 4 } }}>
      {reviews.map((review) => {
        const guestName = review.booking.guestName;
        const nights = diffNights(review.booking.checkInDate, review.booking.checkOutDate);

        return (
          <Stack
            component="article"
            key={review.id}
            spacing={1.75}
            sx={{
              p: { xs: 2.5, sm: 3 },
              bgcolor: "rgba(255,255,255,.58)",
              border: "1px solid rgba(23, 60, 75, 0.10)",
              borderRadius: 1.5,
            }}
          >
            <Rating value={review.overall} precision={1} readOnly size="small" aria-label={t("roomDetail.reviews.ratingLabel", { rating: review.overall })} sx={{ color: "rating.main" }} />
            <Typography
              sx={{
                color: "#263F49",
                fontFamily: "Georgia, serif",
                fontSize: { xs: 18, md: 19 },
                lineHeight: 1.65,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                overflowWrap: "anywhere",
              }}
            >
              “{review.comment || t("roomDetail.reviews.noComment")}”
            </Typography>

            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ pt: 0.25 }}>
              <Avatar
                aria-hidden
                sx={{ width: 38, height: 38, bgcolor: "rgba(47,147,245,.12)", color: "primary.main", fontSize: 15, fontWeight: 700 }}
              >
                {getInitial(guestName)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={650} color="text.primary" noWrap>{guestName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(review.createdAt)} · {review.booking.room.roomType.name} · {t("roomDetail.reviews.nights", { count: nights })}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        );
      })}
    </Box>
  </Box>
  );
};

export default ReviewSection;
