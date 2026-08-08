import { Customer } from "@assets/images";
import { ReviewOverviewResponse } from "@constant/response/ReviewOverviewResponse";
import { ReviewResponse } from "@constant/response/ReviewResponse";
import { Avatar, Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { formatDate } from "@utils/format";

interface Props { stats?: ReviewOverviewResponse; reviews: ReviewResponse[]; }

const ReviewSection = ({ stats, reviews }: Props) => (
  <Box sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #dcd9d1" }}>
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} spacing={2} sx={{ mb: 5 }}>
      <Box><Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>TRẢI NGHIỆM CỦA KHÁCH</Typography><Typography component="h2" sx={{ mt: 1.5, fontFamily: "Georgia, serif", fontSize: { xs: 36, md: 48 } }}>Những kỳ nghỉ được ghi nhớ.</Typography></Box>
      {stats && <Stack direction="row" spacing={1.25} alignItems="center"><Typography sx={{ fontFamily: "Georgia, serif", fontSize: 32 }}>{stats.avgOverall.toFixed(1)}</Typography><Box><Rating value={stats.avgOverall} precision={.1} readOnly size="small" sx={{ color: "#c58f37" }} /><Typography variant="body2" color="text.secondary">{stats.totalReviews} đánh giá</Typography></Box></Stack>}
    </Stack>
    <Grid container spacing={{ xs: 5, md: 6 }}>{reviews.map((review) => <Grid size={{ xs: 12, md: 4 }} key={review.id}><Stack spacing={2.25}><Rating value={review.overall} precision={1} readOnly size="small" sx={{ color: "#c58f37" }} /><Typography sx={{ lineHeight: 1.8, minHeight: { md: 86 } }}>“{review.comment || "Khách không để lại nhận xét."}”</Typography><Stack direction="row" spacing={1.5} alignItems="center"><Avatar src={Customer} alt="" sx={{ width: 40, height: 40 }} /><Box><Typography fontWeight={600}>{review.booking.guestName}</Typography><Typography variant="caption" color="text.secondary">{formatDate(review.createdAt)}</Typography></Box></Stack></Stack></Grid>)}</Grid>
  </Box>
);
export default ReviewSection;
