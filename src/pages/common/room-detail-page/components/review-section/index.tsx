import { Customer } from "@assets/images";
import { ReviewOverviewResponse } from "@constant/response/ReviewOverviewResponse";
import { ReviewResponse } from "@constant/response/ReviewResponse";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Avatar,
  LinearProgress,
  Rating,
} from "@mui/material";
import { formatDate } from "@utils/format";

type Props = {
  stats?: ReviewOverviewResponse;
  reviews: ReviewResponse[];
};

export default function ReviewSection({ stats, reviews }: Props) {
  return (
    <Box mt={4}>
      {/* Header + overall score */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Typography variant="h6" fontWeight={700}>
          Đánh giá
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {stats?.avgOverall.toFixed(1)}
        </Typography>
        <Rating
          value={Number(stats?.avgOverall)}
          max={5}
          precision={0.5}
          readOnly
          size="small"
          sx={{ color: "#FFD700" }}
        />
        {stats?.totalReviews && (
          <Typography variant="body2" color="text.secondary">
            ({Number(stats.totalReviews)} đánh giá)
          </Typography>
        )}
      </Stack>

      {/* Reviews list */}
      <Grid container spacing={4}>
        {reviews.map((r) => {
          return (
            <Grid size={{ xs: 12, md: 4 }} key={r.id}>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{ width: 40, height: 40, bgcolor: "#2E90FA" }}
                    src={Customer}
                  />
                  <Box>
                    <Typography fontWeight={600}>
                      {r.booking.guestName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(r.createdAt)}
                    </Typography>
                  </Box>
                  <Box>
                    <Rating
                      value={r.overall}
                      precision={1}
                      readOnly
                      sx={{ color: "#FFD700" }}
                    />
                  </Box>
                </Stack>

                {/* comment */}
                <Typography variant="body2" color="text.primary">
                  {r.comment || "Khách không để lại nhận xét."}
                </Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
