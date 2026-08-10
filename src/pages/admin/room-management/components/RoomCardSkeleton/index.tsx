import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

const RoomCardSkeleton = () => (
  <Card variant="outlined" sx={{ height: "100%", overflow: "hidden", borderColor: "#E4E7EC", borderRadius: "11px", boxShadow: "none" }}>
    <Skeleton variant="rectangular" width="100%" height={124} />
    <CardContent sx={{ p: 1.75, "&:last-child": { pb: 1.75 } }}>
      <Stack direction="row" justifyContent="space-between"><Box><Skeleton width={74} height={26} /><Skeleton width={96} height={18} /></Box><Skeleton variant="circular" width={30} height={30} /></Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}><Skeleton variant="rounded" width={104} height={25} /><Skeleton width={58} height={20} /></Stack>
      <Skeleton width="55%" height={22} sx={{ mt: 1.5 }} />
    </CardContent>
  </Card>
);

export default RoomCardSkeleton;
