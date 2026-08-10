import { Box, Paper, Rating, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  value: number;
  isStar?: boolean;
  loading?: boolean;
}

const StatCard = ({ title, value, isStar = false, loading = false }: Props) => {
  const { t } = useTranslation("reviews");
  const safeValue = Number.isFinite(value) ? value : 0;

  return (
    <Paper
      variant="outlined"
      sx={{
        minWidth: 0,
        minHeight: { xs: 88, sm: 96 },
        p: { xs: 1.75, sm: 2 },
        borderColor: "#E4E7EC",
        borderRadius: "11px",
        boxShadow: "none",
      }}
    >
      <Typography sx={{ color: "#667085", fontSize: 12.75, fontWeight: 600 }}>
        {title}
      </Typography>

      {loading ? (
        <Skeleton variant="text" width={isStar ? 150 : 72} height={40} sx={{ mt: 0.35 }} />
      ) : (
        <Box sx={{ mt: 0.55, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.85 }}>
          <Typography sx={{ color: "#1F2937", fontSize: { xs: 26, sm: 28 }, fontWeight: 700, lineHeight: 1.2, fontVariantNumeric: "tabular-nums" }}>
            {isStar ? `${safeValue.toFixed(1)} / 5` : safeValue}
          </Typography>
          {isStar && (
            <Rating
              value={safeValue}
              precision={0.1}
              readOnly
              size="small"
              aria-label={t("ratingAriaLabel", { value: safeValue.toFixed(1) })}
              sx={{ color: "#C98520", fontSize: 16 }}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;
