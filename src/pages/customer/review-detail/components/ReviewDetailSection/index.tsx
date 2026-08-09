import { Box, Rating, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import type { RatingField, ReviewForm, ReviewFormErrors } from "../../useReviewDetail";

const DETAIL_FIELDS: { key: Exclude<RatingField, "overall">; label: string }[] = [
  { key: "amenities", label: "Tiện nghi" },
  { key: "cleanliness", label: "Vệ sinh" },
  { key: "comfort", label: "Thoải mái" },
  { key: "locationScore", label: "Địa điểm" },
  { key: "valueForMoney", label: "Đáng giá tiền" },
  { key: "hygiene", label: "Sạch sẽ" },
];

interface Props {
  values: ReviewForm;
  canEdit?: boolean;
  errors?: ReviewFormErrors;
  onChangeField?: (field: RatingField, value: number) => void;
}

const ReviewDetailSection = ({ values, canEdit = true, errors = {}, onChangeField }: Props) => {
  const handleRatingChange =
    (field: RatingField) => (_: SyntheticEvent, value: number | null) => {
      if (canEdit && value !== null) onChangeField?.(field, value);
    };

  return (
    <Box component="section" aria-labelledby="detail-rating-title" sx={{ py: { xs: 4, md: 5 }, borderBottom: "1px solid", borderColor: "divider" }}>
      <Typography id="detail-rating-title" component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 24, md: 28 } }}>
        Đánh giá chi tiết
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75, mb: 3, lineHeight: 1.65 }}>
        {canEdit ? "Chia sẻ cảm nhận của bạn ở từng khía cạnh của kỳ nghỉ." : "Điểm bạn đã dành cho từng khía cạnh của kỳ nghỉ."}
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, columnGap: { md: 6 }, rowGap: { xs: 2.5, md: 3 } }}>
        {DETAIL_FIELDS.map(({ key, label }) => (
          <Box key={key}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(112px, 1fr) auto" }, alignItems: { sm: "center" }, gap: { xs: 0.75, sm: 1.5 } }}>
              <Typography color="#263F49" fontWeight={600}>{label}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={values[key]}
                  readOnly={!canEdit}
                  aria-label={`${label}: ${values[key]} trên 5 điểm`}
                  onChange={handleRatingChange(key)}
                  sx={{ color: "#B78945", fontSize: { xs: 29, sm: 27 }, "& .MuiRating-iconEmpty": { color: "rgba(183, 137, 69, .25)" } }}
                />
                {!canEdit && <Typography variant="body2" fontWeight={700} color="text.primary">{values[key]}/5</Typography>}
              </Box>
            </Box>
            {errors[key] && <Typography role="alert" color="error" variant="caption" sx={{ display: "block", mt: 0.5 }}>{errors[key]}</Typography>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewDetailSection;
