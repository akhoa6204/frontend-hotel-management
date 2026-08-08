import { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import { HospitalityRoomCard } from "@components";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";

interface Props { rooms: RoomTypeResponse[]; loading: boolean; onClickSeeAll: () => void; onClickRoomCard: (capacity: number) => void; }

const RoomList = ({ rooms, loading, onClickSeeAll, onClickRoomCard }: Props) => {
  return (
    <Box component="section" id="rooms" sx={{ py: { xs: 9, md: 14 }, scrollMarginTop: 90 }}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "flex-end" }} spacing={3} sx={{ mb: 5 }}>
        <Box><Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>KHÔNG GIAN NGHỈ DƯỠNG</Typography><Typography component="h2" sx={{ mt: 1.5, fontFamily: "Georgia, serif", fontSize: { xs: 38, md: 52 }, lineHeight: 1.15 }}>Phòng dành cho những ngày thật chậm.</Typography></Box>
        <Button variant="text" endIcon={<ArrowForwardRoundedIcon />} onClick={onClickSeeAll}>Xem tất cả hạng phòng</Button>
      </Stack>
      <Grid container spacing={{ xs: 4, md: 3 }}>
        {(loading ? Array.from({ length: 3 }) : rooms).map((room, index) => {
          if (loading) return <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}><Skeleton variant="rectangular" height={390} /><Skeleton height={46} /><Skeleton width="70%" /></Grid>;
          const item = room as RoomTypeResponse;
          return <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}><HospitalityRoomCard room={item} onBooking={(selectedRoom) => onClickRoomCard(selectedRoom.capacity)} /></Grid>;
        })}
      </Grid>
    </Box>
  );
};
export default RoomList;
