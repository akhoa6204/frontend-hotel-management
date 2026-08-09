import { Box, Skeleton, Stack } from "@mui/material";

const SearchRoomResultSkeleton = () => (
  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(300px, 42%) minmax(0, 1fr)" }, bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", overflow: "hidden" }}>
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{ width: 1, height: { md: 330 }, aspectRatio: { xs: "4 / 3", md: "auto" }, alignSelf: { md: "start" } }}
    />
    <Stack spacing={2} sx={{ p: { xs: 3, sm: 4, md: 4.5 } }}>
      <Skeleton width={130} />
      <Skeleton height={44} width="60%" />
      <Skeleton width={150} />
      <Skeleton height={24} />
      <Skeleton height={24} width="82%" />
      <Stack direction="row" spacing={2}><Skeleton width={100} /><Skeleton width={110} /><Skeleton width={90} /></Stack>
    </Stack>
  </Box>
);

export default SearchRoomResultSkeleton;
