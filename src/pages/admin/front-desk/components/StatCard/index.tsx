import type { ReactNode } from "react";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string | number;
  loading?: boolean;
  icon: ReactNode;
}

export default function StatCard({
  label,
  value,
  loading = false,
  icon,
}: StatCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 98,
        p: 2,
        borderRadius: "11px",
        borderColor: "#E4E7EC",
        boxShadow: "none",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: "#667085", fontSize: 12.75, fontWeight: 600 }}>{label}</Typography>
          {loading ? <Skeleton width={76} height={39} sx={{ mt: 0.2 }} /> : <Typography sx={{ mt: 0.35, color: "#1F2937", fontSize: { xs: 26, md: 28 }, lineHeight: 1.15, fontWeight: 700 }}>{value}</Typography>}
        </Box>
        <Box sx={{ width: 34, height: 34, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "8px", bgcolor: "#F0F6FD", color: "#2E90FA", "& svg": { fontSize: 19 } }}>{icon}</Box>
      </Stack>
    </Paper>
  );
}
