import type { ReactNode } from "react";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { formatMoneyShort } from "@utils/format";
import { useTranslation } from "react-i18next";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number | string | null;
  deltaText?: string;
  suffix?: string;
  loading?: boolean;
  isMoney?: boolean;
  icon?: ReactNode;
}

const StatCard = ({
  label,
  value,
  delta,
  deltaText = "",
  suffix = "%",
  loading = false,
  isMoney = false,
  icon,
}: StatCardProps) => {
  const { t } = useTranslation("dashboard");
  const numericDelta = typeof delta === "string" ? Number(delta) : Number(delta ?? 0);
  const isUp = numericDelta > 0;
  const isDown = numericDelta < 0;
  const deltaColor = isUp ? "success.main" : isDown ? "error.main" : "text.secondary";
  const shownValue = typeof value === "number" && isMoney ? formatMoneyShort(value) : value;

  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 108,
        p: 2,
        borderRadius: "11px",
        borderColor: "#E4E7EC",
        boxShadow: "none",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 13, fontWeight: 600 }}>
            {label}
          </Typography>
          {loading ? (
            <Skeleton width={92} height={42} sx={{ mt: 0.25 }} />
          ) : (
            <Typography sx={{ mt: 0.4, color: "text.primary", fontSize: { xs: 26, lg: 29 }, lineHeight: 1.15, fontWeight: 700 }}>
              {shownValue}
            </Typography>
          )}
        </Box>

        {icon && (
          <Box sx={{ width: 34, height: 34, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "8px", bgcolor: "#F0F6FD", color: "primary.main", "& svg": { fontSize: 19 } }}>
            {icon}
          </Box>
        )}
      </Stack>

      {!loading && (
        delta !== undefined && delta !== null ? (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.8, color: deltaColor }}>
            {isUp && <TrendingUpOutlinedIcon sx={{ fontSize: 15 }} />}
            {isDown && <TrendingDownOutlinedIcon sx={{ fontSize: 15 }} />}
            <Typography variant="caption" sx={{ color: "inherit", fontSize: 11.5 }}>
              {isUp ? `+${numericDelta}${suffix}` : `${numericDelta}${suffix}`} {deltaText}
            </Typography>
          </Stack>
        ) : (
          <Typography variant="caption" sx={{ mt: 0.8, display: "block", color: "text.secondary", fontSize: 11.5 }}>
            {t("noPreviousData")}
          </Typography>
        )
      )}
    </Paper>
  );
};

export default StatCard;
