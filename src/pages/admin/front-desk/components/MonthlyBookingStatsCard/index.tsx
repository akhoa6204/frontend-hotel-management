// components/dashboard/MonthlyBookingStatsCard.tsx
import type { MonthlyBookingStatsResponse } from "@constant/response/MonthlyBookingStatsResponse";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  data?: MonthlyBookingStatsResponse;
  loading?: boolean;
};

const StatRow = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    border="1px solid #2E90FA"
    borderRadius={2.5}
    px={2}
    py={2}
  >
    <Typography
      variant="body2"
      color="text.primary"
      fontWeight={600}
      fontSize={16}
    >
      {label}
    </Typography>
    <Typography
      variant="subtitle1"
      fontWeight={600}
      color={color || "text.primary"}
    >
      {value}
    </Typography>
  </Box>
);

const MonthlyBookingStatsCard = ({ data, loading }: Props) => {
  const { t } = useTranslation("receptionist");

  if (loading)
    return (
      <Paper
        variant="outlined"
        sx={{ p: 3, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress size={28} />
      </Paper>
    );

  if (!data)
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {t("states.noData")}
        </Typography>
      </Paper>
    );

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, height: "100%" }}>
      <Box>
        <Typography variant="body2" fontWeight={600} mb={2} fontSize={20}>
          {t("bookingStats.title")}
        </Typography>
        <Box mb={2}>
          <StatRow label={t("bookingStats.total")} value={data.total ?? 0} />
        </Box>
        <Box mb={2}>
          <StatRow
            label={t("bookingStats.successful")}
            value={data.success ?? 0}
            color="primary"
          />
        </Box>
        <Box mb={2}>
          <StatRow
            label={t("bookingStats.cancelled")}
            value={data.cancelled ?? 0}
            color="error.main"
          />{" "}
        </Box>
        <Box>
          <StatRow label={t("bookingStats.cancellationRate")} value={`${data.cancelRate ?? 0}%`} />
        </Box>
      </Box>
    </Paper>
  );
};

export default MonthlyBookingStatsCard;
