import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  comment: string;
  canEdit?: boolean;
  reviewDate?: string;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitting?: boolean;
}

const ReviewCommentSection = ({
  comment,
  canEdit = false,
  reviewDate,
  onChange,
  onCancel,
  onSubmit,
  submitting = false,
}: Props) => {
  const { t, i18n } = useTranslation("client");
  const displayDate = (value: string) =>
    new Intl.DateTimeFormat(i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
  return (
  <Box component="section" aria-labelledby="review-comment-title" sx={{ pt: { xs: 4, md: 5 } }}>
    <Typography id="review-comment-title" component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 24, md: 28 } }}>
      {t(canEdit ? "reviews.comment.createTitle" : "reviews.comment.viewTitle")}
    </Typography>
    {canEdit ? (
      <>
        <Typography color="text.secondary" sx={{ mt: 0.75, mb: 2.25, lineHeight: 1.65 }}>
          {t("reviews.comment.description")}
        </Typography>
        <TextField
          multiline
          minRows={5}
          fullWidth
          placeholder={t("reviews.comment.placeholder")}
          value={comment}
          onChange={(event) => onChange?.(event.target.value)}
          inputProps={{ "aria-label": t("reviews.comment.aria") }}
          sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(255,255,255,.55)", borderRadius: 1.5, alignItems: "flex-start" } }}
        />

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={1.25}
          justifyContent="flex-end"
          alignItems={{ xs: "center", sm: "stretch" }}
          sx={{
            width: 1,
            mt: 2.5,
            "& .MuiButton-root": { minHeight: 44, px: 2.75 },
            "& .MuiButton-contained": { width: { xs: 1, sm: "auto" } },
            "& .MuiButton-text": { width: "auto" },
          }}
        >
          <Button variant="text" onClick={onCancel} disabled={submitting}>{t("reviews.actions.cancel")}</Button>
          <Button variant="contained" onClick={onSubmit} disabled={submitting} startIcon={submitting ? <CircularProgress size={17} color="inherit" /> : undefined}>
            {submitting ? t("reviews.actions.submitting") : t("reviews.actions.submit")}
          </Button>
        </Stack>
      </>
    ) : (
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ color: "#465960", fontSize: { xs: 16, md: 17 }, lineHeight: 1.8, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
          {comment || t("reviews.comment.noComment")}
        </Typography>
        {reviewDate && <Typography variant="body2" color="text.secondary" sx={{ mt: 2.25 }}>{t("reviews.comment.reviewDate", { date: displayDate(reviewDate) })}</Typography>}
      </Box>
    )}
  </Box>
  );
};

export default ReviewCommentSection;
