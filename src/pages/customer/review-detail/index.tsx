import { GlobalSnackbar } from "@components";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import ReviewCommentSection from "./components/ReviewCommentSection";
import ReviewDetailSection from "./components/ReviewDetailSection";
import ReviewOverallSection from "./components/ReviewOverallSection";
import ReviewStayOverview from "./components/ReviewStayOverview";
import useReviewDetail from "./useReviewDetail";

const ReviewDetailSkeleton = () => (
  <Box aria-label="Đang tải đánh giá" sx={{ maxWidth: 960, pb: 6 }}>
    <Skeleton width={150} height={38} />
    <Skeleton width="52%" height={58} sx={{ mt: 1 }} />
    <Skeleton width="70%" height={28} />
    <Skeleton variant="rounded" height={250} sx={{ mt: 3.5 }} />
    <Skeleton width="45%" height={45} sx={{ mt: 4 }} />
    <Skeleton width={240} height={50} sx={{ mt: 1.5 }} />
    <Skeleton variant="rounded" height={150} sx={{ mt: 4 }} />
  </Box>
);

const ReviewDetailPage = () => {
  const {
    mode,
    review,
    booking,
    form,
    errors,
    handleRatingChange,
    handleCommentChange,
    handleSubmit,
    isLoading,
    isError,
    isSubmitting,
    onBack,
    onCancel,
    alert,
    closeSnackbar,
  } = useReviewDetail();

  if (isLoading) return <ReviewDetailSkeleton />;

  if (isError || !form || !booking) {
    return (
      <Stack minHeight={420} alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
        <ErrorOutlineRounded sx={{ color: "text.secondary", fontSize: 38 }} />
        <Box>
          <Typography component="h1" sx={{ color: "#173C4B", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28 }}>
            {mode === "create" ? "Không thể tải thông tin kỳ nghỉ" : "Không tìm thấy đánh giá này"}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Nội dung không tồn tại hoặc hiện không thể truy cập.
          </Typography>
        </Box>
        <Button onClick={onBack} startIcon={<ArrowBackRounded />}>Đánh giá của tôi</Button>
      </Stack>
    );
  }

  const canEdit = mode === "create";

  return (
    <Box sx={{ width: 1, pb: { xs: 5, md: 7 } }}>
      <Button onClick={onBack} startIcon={<ArrowBackRounded />} sx={{ color: "text.secondary", px: 0, mb: { xs: 2.5, md: 3.25 } }}>
        Đánh giá của tôi
      </Button>

      <Box component="header" sx={{ mb: { xs: 3, md: 4 }, textAlign: { xs: "center", sm: "left" } }}>
        <Typography sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: ".16em", mb: 1 }}>
          TRẢI NGHIỆM CỦA BẠN
        </Typography>
        <Typography component="h1" sx={{ color: "#173C4B", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 32, md: 44 }, lineHeight: 1.14 }}>
          {canEdit ? "Chia sẻ cảm nhận về kỳ nghỉ của bạn." : "Đánh giá kỳ nghỉ tại Diamond Sea"}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.1, maxWidth: 720, mx: { xs: "auto", sm: 0 }, lineHeight: 1.7 }}>
          {canEdit
            ? "Phản hồi chân thành của bạn giúp Diamond Sea chăm chút hơn cho từng trải nghiệm lưu trú."
            : "Những cảm nhận bạn đã chia sẻ sau kỳ nghỉ tại Diamond Sea."}
        </Typography>
      </Box>

      <ReviewStayOverview booking={booking} />

      <Box sx={{ width: 1 }}>
        <ReviewOverallSection
          overall={form.overall}
          canEdit={canEdit}
          error={errors.overall}
          onChange={(value) => handleRatingChange("overall", value)}
        />
        <ReviewDetailSection
          values={form}
          canEdit={canEdit}
          errors={errors}
          onChangeField={handleRatingChange}
        />
        <ReviewCommentSection
          comment={form.comment}
          canEdit={canEdit}
          reviewDate={review?.createdAt}
          onChange={handleCommentChange}
          onCancel={onCancel}
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        />
      </Box>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default ReviewDetailPage;
