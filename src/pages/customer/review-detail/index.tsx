import { GlobalSnackbar } from "@components";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import ReviewCommentSection from "./components/ReviewCommentSection";
import ReviewDetailSection from "./components/ReviewDetailSection";
import ReviewOverallSection from "./components/ReviewOverallSection";
import ReviewStayOverview from "./components/ReviewStayOverview";
import useReviewDetail from "./useReviewDetail";
import { useTranslation } from "react-i18next";

const ReviewDetailSkeleton = () => {
  const { t } = useTranslation("client");
  return <Box aria-label={t("reviews.aria.loadingDetail")} sx={{ maxWidth: 960, pb: 6 }}>
    <Skeleton width={150} height={38} />
    <Skeleton width="52%" height={58} sx={{ mt: 1 }} />
    <Skeleton width="70%" height={28} />
    <Skeleton variant="rounded" height={250} sx={{ mt: 3.5 }} />
    <Skeleton width="45%" height={45} sx={{ mt: 4 }} />
    <Skeleton width={240} height={50} sx={{ mt: 1.5 }} />
    <Skeleton variant="rounded" height={150} sx={{ mt: 4 }} />
  </Box>;
};

const ReviewDetailPage = () => {
  const { t } = useTranslation("client");
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
          <Typography component="h1" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28 }}>
            {t(mode === "create" ? "reviews.states.stayLoadError" : "reviews.states.reviewNotFound")}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            {t("reviews.states.unavailableDescription")}
          </Typography>
        </Box>
        <Button onClick={onBack} startIcon={<ArrowBackRounded />}>{t("reviews.actions.myReviews")}</Button>
      </Stack>
    );
  }

  const canEdit = mode === "create";

  return (
    <Box sx={{ width: 1, pb: { xs: 5, md: 7 } }}>
      <Button onClick={onBack} startIcon={<ArrowBackRounded />} sx={{ color: "text.secondary", px: 0, mb: { xs: 2.5, md: 3.25 } }}>
        {t("reviews.actions.myReviews")}
      </Button>

      <Box component="header" sx={{ mb: { xs: 3, md: 4 }, textAlign: { xs: "center", sm: "left" } }}>
        <Typography sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: ".16em", mb: 1 }}>
          {t("reviews.detail.eyebrow")}
        </Typography>
        <Typography component="h1" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 32, md: 44 }, lineHeight: 1.14 }}>
          {t(canEdit ? "reviews.detail.createTitle" : "reviews.detail.viewTitle")}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.1, maxWidth: 720, mx: { xs: "auto", sm: 0 }, lineHeight: 1.7 }}>
          {canEdit
            ? t("reviews.detail.createDescription")
            : t("reviews.detail.viewDescription")}
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
