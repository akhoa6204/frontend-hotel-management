import { Box, Rating, Typography } from "@mui/material";

interface Props {
  overall: number;
  canEdit?: boolean;
  error?: string;
  onChange?: (value: number) => void;
}

const ReviewOverallSection = ({ overall, canEdit = false, error, onChange }: Props) => (
  <Box component="section" aria-labelledby="overall-rating-title" sx={{ py: { xs: 4, md: 5 }, borderBottom: "1px solid", borderColor: "divider", textAlign: "center" }}>
    <Typography
      id="overall-rating-title"
      component="h2"
      sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 26, md: 32 }, lineHeight: 1.25 }}
    >
      {canEdit ? "Bạn đánh giá kỳ nghỉ này thế nào?" : "Đánh giá tổng quan"}
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.65 }}>
      {canEdit ? "Chọn mức điểm phản ánh cảm nhận chung của bạn." : "Cảm nhận chung của bạn về kỳ nghỉ tại Diamond Sea."}
    </Typography>

    <Box sx={{ mt: 2.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}>
      <Rating
        value={overall}
        readOnly={!canEdit}
        aria-label={`${overall} trên 5 điểm`}
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

export default ReviewOverallSection;
