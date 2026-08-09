import Pager from "@components/pager";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReviewCardSkeleton from "./components/ReviewCardSkeleton";
import ReviewCard from "./components/review-card";
import useMyReview from "./useMyReview";

const MyReviewPage = () => {
  const {
    reviews,
    loading,
    error,
    retry,
    totalPages,
    page,
    onChangePage,
    onClickReviewCard,
  } = useMyReview();

  return (
    <Box sx={{ width: 1, pb: { xs: 4, md: 7 } }}>
      <Box component="header" sx={{ mb: { xs: 3.5, md: 4.5 } }}>
        <Typography sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: ".16em", mb: 1 }}>
          TRẢI NGHIỆM CỦA BẠN
        </Typography>
        <Typography component="h1" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 32, md: 42 }, lineHeight: 1.15 }}>
          Đánh giá của tôi
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.25, maxWidth: 650, lineHeight: 1.7 }}>
          Nhìn lại và chia sẻ cảm nhận về những kỳ nghỉ của bạn tại Diamond Sea.
        </Typography>
      </Box>

      {loading ? (
        <Stack spacing={{ xs: 2.5, md: 3 }} aria-label="Đang tải danh sách đánh giá">
          {Array.from({ length: 3 }).map((_, index) => <ReviewCardSkeleton key={index} />)}
        </Stack>
      ) : error ? (
        <Box sx={{ py: { xs: 5, md: 7 }, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 24 }}>
            Không thể tải đánh giá
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5, lineHeight: 1.7 }}>
            Những chia sẻ của bạn hiện chưa thể truy cập. Vui lòng thử lại.
          </Typography>
          <Button variant="outlined" onClick={() => retry()}>Thử lại</Button>
        </Box>
      ) : reviews.length === 0 ? (
        <Box sx={{ py: { xs: 5, md: 7 }, borderTop: "1px solid", borderColor: "divider", maxWidth: 620 }}>
          <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 24, sm: 27 } }}>
            Chưa có đánh giá nào
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 2.75, lineHeight: 1.7 }}>
            Cảm nhận về kỳ nghỉ đầu tiên của bạn sẽ được lưu lại tại đây sau khi hoàn tất lưu trú.
          </Typography>
          <Button component={RouterLink} to="/search" variant="outlined">Khám phá phòng</Button>
        </Box>
      ) : (
        <>
          <Stack spacing={{ xs: 2.5, md: 3 }}>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onView={() => onClickReviewCard(review.id, review.bookingId)}
              />
            ))}
          </Stack>

          {totalPages > 1 && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
              <Pager page={page} totalPages={totalPages} onChange={onChangePage} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default MyReviewPage;
