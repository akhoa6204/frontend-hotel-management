import type { MonthlyRevenueResponse } from "@constant/response/MonthlyRevenueResponse";
import { Box, CircularProgress, Typography } from "@mui/material";
import { formatMoneyShort } from "@utils/format";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";

interface Props {
  data?: MonthlyRevenueResponse;
  loading?: boolean;
}

const MonthlyRevenueChart = ({ data, loading = false }: Props) => {
  const { t } = useTranslation("dashboard");
  if (loading) {
    return (
      <Box sx={{ height: { xs: 250, sm: 300 }, display: "grid", placeItems: "center" }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!data?.months?.length) {
    return (
      <Box sx={{ height: 220, display: "grid", placeItems: "center" }}>
        <Typography sx={{ color: "text.secondary", fontSize: 13.5 }}>{t("revenue.noData")}</Typography>
      </Box>
    );
  }

  const chartData = data.months.map((month) => ({
    label: month.label,
    revenue: month.revenue,
  }));

  return (
    <Box sx={{ width: "100%", height: { xs: 250, sm: 300 } }} role="img" aria-label={t("revenue.chartAriaLabel")}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 16, right: 8, bottom: 4, left: -12 }} barCategoryGap="32%">
          <CartesianGrid vertical={false} stroke="#EAECF0" strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#667085", fontSize: 12 }} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} width={58} tick={{ fill: "#98A2B3", fontSize: 11 }} tickFormatter={(value: number) => formatMoneyShort(value)} />
          <Tooltip
            cursor={{ fill: "rgba(46, 144, 250, 0.05)" }}
            formatter={(value) => [formatMoneyShort(Number(value)), t("revenue.seriesLabel")]}
            contentStyle={{ border: "1px solid #E4E7EC", borderRadius: 8, boxShadow: "0 8px 20px rgba(16, 24, 40, 0.08)", fontSize: 13 }}
            labelStyle={{ color: "#1F2937", fontWeight: 600, marginBottom: 4 }}
          />
          <Bar dataKey="revenue" name={t("revenue.seriesLabel")} fill="#2E90FA" radius={[5, 5, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyRevenueChart;
