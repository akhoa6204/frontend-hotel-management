import { Box, Rating, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import type { RatingField, ReviewForm, ReviewFormErrors } from "../../useReviewDetail";
import { useTranslation } from "react-i18next";

const DETAIL_FIELDS: { key: Exclude<RatingField, "overall">; labelKey: string }[] = [
  { key: "amenities", labelKey: "reviews.criteria.amenities" },
  { key: "cleanliness", labelKey: "reviews.criteria.cleanliness" },
  { key: "comfort", labelKey: "reviews.criteria.comfort" },
  { key: "locationScore", labelKey: "reviews.criteria.location" },
  { key: "valueForMoney", labelKey: "reviews.criteria.valueForMoney" },
  { key: "hygiene", labelKey: "reviews.criteria.hygiene" },
];

interface Props {
  values: ReviewForm;
  canEdit?: boolean;
  errors?: ReviewFormErrors;
  onChangeField?: (field: RatingField, value: number) => void;
}

const ReviewDetailSection = ({ values, canEdit = true, errors = {}, onChangeField }: Props) => {
  const { t } = useTranslation("client");
  const handleRatingChange =
    (field: RatingField) => (_: SyntheticEvent, value: number | null) => {
      if (canEdit && value !== null) onChangeField?.(field, value);
    };

  return (
    <Box component="section" aria-labelledby="detail-rating-title" sx={{ py: { xs: 4, md: 5 }, borderBottom: "1px solid", borderColor: "divider" }}>
      <Typography id="detail-rating-title" component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 24, md: 28 } }}>
        {t("reviews.criteria.title")}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75, mb: 3, lineHeight: 1.65 }}>
        {t(canEdit ? "reviews.criteria.createDescription" : "reviews.criteria.viewDescription")}
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, columnGap: { md: 6 }, rowGap: { xs: 2.5, md: 3 } }}>
        {DETAIL_FIELDS.map(({ key, labelKey }) => {
          const label = t(labelKey);
          return (
          <Box key={key}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(112px, 1fr) auto" }, alignItems: { sm: "center" }, gap: { xs: 0.75, sm: 1.5 } }}>
              <Typography color="#263F49" fontWeight={600}>{label}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={values[key]}
                  readOnly={!canEdit}
                  aria-label={t("reviews.rating.criterionAria", { label, value: values[key] })}
                  onChange={handleRatingChange(key)}
                  sx={{ color: "#B78945", fontSize: { xs: 29, sm: 27 }, "& .MuiRating-iconEmpty": { color: "rgba(183, 137, 69, .25)" } }}
                />
                {!canEdit && <Typography variant="body2" fontWeight={700} color="text.primary">{values[key]}/5</Typography>}
              </Box>
            </Box>
            {errors[key] && <Typography role="alert" color="error" variant="caption" sx={{ display: "block", mt: 0.5 }}>{errors[key]}</Typography>}
          </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ReviewDetailSection;
