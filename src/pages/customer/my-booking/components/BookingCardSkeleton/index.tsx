import { Box, Skeleton, Stack } from "@mui/material";

const BookingCardSkeleton = () => (
  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(240px, 34%) minmax(0, 1fr)" }, border: "1px solid rgba(23, 60, 75, 0.08)", borderRadius: 1.5, overflow: "hidden", bgcolor: "rgba(255,255,255,.5)" }}>
    <Skeleton variant="rectangular" animation="wave" sx={{ width: 1, height: { xs: 190, sm: 228, md: 252 } }} />
    <Stack sx={{ p: { xs: 2.25, sm: 2.75, lg: 3 } }} justifyContent="space-between" spacing={2.25}>
      <Box>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Box sx={{ flex: 1 }}><Skeleton width="48%" height={34} /><Skeleton width="65%" height={22} /></Box>
          <Skeleton width={94} height={28} sx={{ borderRadius: 99 }} />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2.25 }}><Skeleton width={115} height={42} /><Skeleton width={115} height={42} /></Stack>
        <Skeleton width="42%" height={22} sx={{ mt: 1 }} />
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ pt: 1.75, borderTop: "1px solid rgba(23, 60, 75, 0.08)" }}>
        <Box><Skeleton width={90} height={18} /><Skeleton width={150} height={28} /></Box>
        <Skeleton width={120} height={40} sx={{ borderRadius: 5 }} />
      </Stack>
    </Stack>
  </Box>
);

export default BookingCardSkeleton;
