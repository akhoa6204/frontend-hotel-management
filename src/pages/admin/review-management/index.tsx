import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GlobalSnackbar } from "@components";
import Pager from "@components/pager";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import ReviewCard from "./components/ReviewCard";
import StatCard from "./components/StatCard";
import useReviewManagement from "./useReview";
import { useTranslation } from "react-i18next";

const ReviewListSkeleton = () => {
  const { t } = useTranslation("reviews");
  return <Box aria-label={t("aria.loadingList")}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Box key={index} sx={{ px: { xs: 2, sm: 2.25 }, py: 2, borderBottom: index === 4 ? 0 : "1px solid #EAECF0" }}>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ width: "55%" }}><Skeleton width="42%" /><Skeleton width="68%" /></Box>
          <Skeleton width={105} />
        </Stack>
        <Skeleton width="75%" sx={{ mt: 1 }} />
      </Box>
    ))}
  </Box>;
};

export default function ReviewManagement() {
  const { t } = useTranslation("reviews");
  const {
    rows,
    totalPages,
    currentPage,
    isLoading,
    isError,
    refetch,
    filters,
    handleSearch,
    handleChangePage,
    stats,
    statsLoading,
    onUpdateActive,
    isUpdatingStatus,
    alert,
    closeSnackbar,
  } = useReviewManagement();
  const [hideTarget, setHideTarget] = useState<ReviewResponse | null>(null);

  const totalReviews = Number(stats?.totalActiveReviews ?? 0) + Number(stats?.totalHiddenReviews ?? 0);
  const hasSearch = Boolean(filters.q?.trim());

  const requestStatusChange = (review: ReviewResponse) => {
    if (review.active) {
      setHideTarget(review);
      return;
    }

    void onUpdateActive(review.id, true).catch(() => undefined);
  };

  const confirmHide = async () => {
    if (!hideTarget) return;

    try {
      await onUpdateActive(hideTarget.id, false);
      setHideTarget(null);
    } catch {
      // Mutation feedback is handled by the shared snackbar; keep the dialog open.
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>
          {t("title")}
        </Typography>
        <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>
          {t("subtitle")}
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 1.25, sm: 1.5 }, mb: 2 }}>
        <StatCard title={t("average")} value={Number(stats?.avgOverall ?? 0)} isStar loading={statsLoading} />
        <StatCard title={t("total")} value={totalReviews} loading={statsLoading} />
        <StatCard title={t("hidden")} value={Number(stats?.totalHiddenReviews ?? 0)} loading={statsLoading} />
      </Box>

      <TextField
        size="small"
        placeholder={t("search")}
        value={filters.q ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        sx={{ width: { xs: "100%", sm: 460 }, mb: 2, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }}
      />

      <Box sx={{ mb: 1.25 }}>
        <Typography component="h2" sx={{ color: "#1F2937", fontSize: 17, fontWeight: 650 }}>
          {t("listTitle")}
        </Typography>
      </Box>

      <Paper variant="outlined" className="admin-scrollbar" sx={{ borderColor: "#E4E7EC", borderRadius: "11px", boxShadow: "none", overflow: "hidden" }}>
        {isLoading ? (
          <ReviewListSkeleton />
        ) : isError ? (
          <Stack alignItems="center" sx={{ px: 2, py: 5 }}>
            <Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>{t("states.loadError")}</Typography>
            <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>{t("states.loadErrorHint")}</Typography>
            <Button size="small" onClick={() => refetch()} sx={{ mt: 1 }}>{t("states.retry")}</Button>
          </Stack>
        ) : rows.length === 0 ? (
          <Stack alignItems="center" sx={{ px: 2, py: 5 }}>
            <Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>
              {hasSearch ? t("states.noMatch") : t("states.empty")}
            </Typography>
            {hasSearch && <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>{t("states.searchHint")}</Typography>}
          </Stack>
        ) : (
          rows.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              isLast={index === rows.length - 1}
              disabled={isUpdatingStatus}
              onToggleStatus={requestStatusChange}
            />
          ))
        )}
      </Paper>

      {totalPages > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pager page={currentPage} totalPages={totalPages} onChange={handleChangePage} />
        </Box>
      )}

      <Dialog
        open={Boolean(hideTarget)}
        onClose={isUpdatingStatus ? undefined : () => setHideTarget(null)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="hide-review-title"
        PaperProps={{ sx: { width: 470, maxWidth: "calc(100vw - 24px)", borderRadius: "12px" } }}
      >
        <DialogTitle id="hide-review-title" sx={{ px: 2.5, pt: 2.25, pb: 1, color: "#1F2937", fontSize: 18, fontWeight: 700 }}>
          {t("hideDialog.title")}
        </DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 1 }}>
          <Typography sx={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}>
            {t("hideDialog.description")}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: "1px solid #EAECF0" }}>
          <Button variant="outlined" disabled={isUpdatingStatus} onClick={() => setHideTarget(null)} sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>
            {t("hideDialog.cancel")}
          </Button>
          <Button variant="contained" color="warning" disabled={isUpdatingStatus} onClick={confirmHide} sx={{ minHeight: 40, borderRadius: "8px" }}>
            {isUpdatingStatus ? t("hideDialog.hiding") : t("actions.hide")}
          </Button>
        </DialogActions>
      </Dialog>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
}
