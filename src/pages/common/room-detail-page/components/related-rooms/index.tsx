import { HospitalityRoomCard } from "@components";
import { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import { Box, Grid, Skeleton, Typography } from "@mui/material";

interface Props { rooms: RoomTypeResponse[]; loading: boolean; onBooking: (room: RoomTypeResponse) => void; }

const RelatedRooms = ({ rooms, loading, onBooking }: Props) => {
  if (!loading && !rooms.length) return null;
  return <Box component="section" aria-labelledby="related-rooms-heading" sx={{ py: { xs: 7, md: 10 }, borderTop: "1px solid #dedbd4" }}>
    <Typography sx={{ color: "primary.main", letterSpacing: 2.1, fontSize: 12, fontWeight: 700 }}>TIẾP TỤC KHÁM PHÁ</Typography>
    <Typography id="related-rooms-heading" component="h2" sx={{ mt: 1, mb: 4.5, fontFamily: "Georgia, serif", fontSize: { xs: 34, md: 42 }, fontWeight: 400 }}>Khám phá các hạng phòng khác</Typography>
    <Grid container spacing={{ xs: 4, md: 3 }}>{loading ? Array.from({ length: 3 }).map((_, index) => <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}><Skeleton variant="rectangular" height={360} /><Skeleton height={42} /><Skeleton width="65%" /></Grid>) : rooms.map((room) => <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.id}><HospitalityRoomCard room={room} onBooking={onBooking} /></Grid>)}</Grid>
  </Box>;
};
export default RelatedRooms;
