import type { MonthlyBookingStatsResponse } from "@constant/response/MonthlyBookingStatsResponse";
import { Box, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  data?: MonthlyBookingStatsResponse;
  loading?: boolean;
}

interface StatRowProps {
  label: string;
  value: string | number;
  color?: string;
}

const StatRow = ({ label, value, color = "text.primary" }: StatRowProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ py: 1.45 }}>
    <Typography sx={{ color: "text.secondary", fontSize: 13.5 }}>{label}</Typography>
    <Typography sx={{ color, fontSize: 14, fontWeight: 700 }}>{value}</Typography>
  </Stack>
);

const MonthlyBookingStatsCard = ({ data, loading = false }: Props) => {
  const { t } = useTranslation("dashboard");

  return (
    <Paper variant="outlined" sx={{ height: "100%", p: 2, borderRadius: "11px", borderColor: "#E4E7EC", boxShadow: "none" }}>
      <Typography component="h3" sx={{ color: "text.primary", fontSize: 17, fontWeight: 650 }}>
        {t("bookingStats.title")}
      </Typography>

      {loading ? (
        <Box sx={{ minHeight: 190, display: "grid", placeItems: "center" }}>
          <CircularProgress size={24} />
        </Box>
      ) : !data ? (
        <Typography sx={{ py: 3, color: "text.secondary", fontSize: 13.5 }}>
          {t("bookingStats.noData")}
        </Typography>
      ) : (
        <Stack sx={{ mt: 1.1 }} divider={<Divider sx={{ borderColor: "#EAECF0" }} />}>
          <StatRow label={t("bookingStats.total")} value={data.total ?? 0} />
          <StatRow label={t("bookingStats.successful")} value={data.success ?? 0} color="success.main" />
          <StatRow label={t("bookingStats.cancelled")} value={data.cancelled ?? 0} color="error.main" />
          <StatRow label={t("bookingStats.cancellationRate")} value={`${data.cancelRate ?? 0}%`} />
        </Stack>
      )}
    </Paper>
  );
};

export default MonthlyBookingStatsCard;
