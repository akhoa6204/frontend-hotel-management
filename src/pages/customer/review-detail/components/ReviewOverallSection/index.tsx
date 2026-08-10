import { Box, Rating, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  overall: number;
  canEdit?: boolean;
  error?: string;
  onChange?: (value: number) => void;
}

const ReviewOverallSection = ({ overall, canEdit = false, error, onChange }: Props) => {
  const { t } = useTranslation("client");
  return (
  <Box component="section" aria-labelledby="overall-rating-title" sx={{ py: { xs: 4, md: 5 }, borderBottom: "1px solid", borderColor: "divider", textAlign: "center" }}>
    <Typography
      id="overall-rating-title"
      component="h2"
      sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 26, md: 32 }, lineHeight: 1.25 }}
    >
      {t(canEdit ? "reviews.overall.createTitle" : "reviews.overall.viewTitle")}
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.65 }}>
      {t(canEdit ? "reviews.overall.createDescription" : "reviews.overall.viewDescription")}
    </Typography>

    <Box sx={{ mt: 2.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}>
      <Rating
        value={overall}
        readOnly={!canEdit}
        aria-label={t("reviews.rating.aria", { value: overall })}
        onChange={(_, value) => {
          if (canEdit && value !== null) onChange?.(value);
        }}
        sx={{ color: "#B78945", fontSize: { xs: 38, sm: 42 }, "& .MuiRating-iconEmpty": { color: "rgba(183, 137, 69, .28)" } }}
      />
      <Typography aria-live="polite" sx={{ color: "text.primary", fontWeight: 700 }}>
        {overall}/5
      </Typography>
    </Box>
    {error && <Typography role="alert" color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
  </Box>
  );
};

export default ReviewOverallSection;
