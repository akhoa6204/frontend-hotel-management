import { BgRoom } from "@assets/images";
import { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";
import { useNavigate } from "react-router-dom";

interface Props { room: RoomTypeResponse; onBooking?: (room: RoomTypeResponse) => void; }

const HospitalityRoomCard = ({ room, onBooking }: Props) => {
  const navigate = useNavigate();
  const image = room.roomTypeImages?.[0]?.url || BgRoom;
  const price = Number(room.basePrice) - Number(room.discountAmount || 0);
  return <Box role="group" sx={{ cursor: "pointer", "&:hover img": { transform: "scale(1.035)" }, "&:hover .room-link": { color: "primary.main" } }} onClick={() => navigate(`/room-detail/${room.id}`)}>
    <Box sx={{ height: { xs: 340, md: 400 }, overflow: "hidden", bgcolor: "#e6e2da" }}><Box component="img" src={image} alt={room.roomTypeImages?.[0]?.alt || room.name} loading="lazy" sx={{ width: 1, height: 1, objectFit: "cover", transition: "transform .5s ease" }} /></Box>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ pt: 2.25 }}><Box><Typography variant="h3" sx={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24 }}>{room.name}</Typography><Stack direction="row" spacing={.75} alignItems="center" sx={{ mt: .75, color: "text.secondary" }}><PeopleAltOutlinedIcon fontSize="small" /><Typography variant="body2">Tối đa {room.capacity} khách</Typography></Stack></Box><Box sx={{ textAlign: "right" }}><Typography fontWeight={700} color="primary.main" sx={{ whiteSpace: "nowrap" }}>{fmtVND(price)} ₫</Typography><Typography variant="caption" color="text.secondary">/ đêm</Typography></Box></Stack>
    <Button className="room-link" onClick={(event) => { event.stopPropagation(); onBooking?.(room); }} endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 1, px: 0, color: "text.primary" }}>Đặt phòng</Button>
  </Box>;
};
export default HospitalityRoomCard;
