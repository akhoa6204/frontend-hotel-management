import { Box, Divider, Skeleton, Stack } from "@mui/material";

const ReservationSummarySkeleton = () => (
  <Box sx={{ overflow: "hidden", bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: 2 }} aria-label="Đang tải thông tin kỳ nghỉ">
    <Skeleton variant="rectangular" sx={{ width: 1, aspectRatio: { xs: "16 / 7", sm: "16 / 6", md: "16 / 9" } }} />
    <Stack spacing={1.5} sx={{ p: { xs: 2.5, sm: 3, md: 3.25 } }}>
      <Skeleton width={130} />
      <Skeleton height={38} width="65%" />
      <Skeleton width={180} />
      <Divider sx={{ my: 1.5 }} />
      <Stack direction="row" justifyContent="space-between"><Skeleton width="35%" /><Skeleton width="35%" /></Stack>
      <Skeleton width={100} />
      <Divider sx={{ my: 1.5 }} />
      <Stack direction="row" justifyContent="space-between"><Skeleton width={90} /><Skeleton width={120} /></Stack>
      <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 1.25, mt: 1 }} />
    </Stack>
  </Box>
);

export default ReservationSummarySkeleton;
