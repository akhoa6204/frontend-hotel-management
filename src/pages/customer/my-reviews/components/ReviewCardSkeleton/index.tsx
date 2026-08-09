import { Box, Skeleton, Stack } from "@mui/material";

const ReviewCardSkeleton = () => (
  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(230px, 32%) minmax(0, 1fr)" }, border: "1px solid rgba(23, 60, 75, 0.08)", borderRadius: 1.5, overflow: "hidden", bgcolor: "rgba(255,255,255,.5)" }}>
    <Skeleton variant="rectangular" animation="wave" sx={{ width: 1, height: { xs: 190, sm: 225, md: 255 } }} />
    <Stack sx={{ p: { xs: 2.25, sm: 2.75, lg: 3 } }} spacing={2.1} justifyContent="space-between">
      <Box>
        <Skeleton width="48%" height={34} />
        <Skeleton width="68%" height={22} />
        <Stack direction="row" spacing={1.5} sx={{ mt: 1.8 }}>
          <Skeleton width={120} height={24} />
          <Skeleton width={20} height={24} />
          <Skeleton width={120} height={24} />
        </Stack>
        <Skeleton width="38%" height={20} />
        <Skeleton width={142} height={28} sx={{ mt: 1.5 }} />
        <Skeleton width="96%" height={22} sx={{ mt: 1 }} />
        <Skeleton width="82%" height={22} />
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1.75, borderTop: "1px solid rgba(23, 60, 75, 0.08)" }}>
        <Skeleton width={150} height={20} />
        <Skeleton width={112} height={40} sx={{ borderRadius: 1 }} />
      </Stack>
    </Stack>
  </Box>
);

export default ReviewCardSkeleton;
