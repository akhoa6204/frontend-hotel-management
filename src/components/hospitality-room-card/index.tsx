import { BgRoom } from "@assets/images";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

interface Props { room: RoomTypeResponse; onBooking?: (room: RoomTypeResponse) => void; translationPrefix?: "home.roomCard" | "roomDetail.relatedRoomCard"; }

const HospitalityRoomCard = ({ room, onBooking, translationPrefix = "home.roomCard" }: Props) => {
  const { t } = useTranslation("client");
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const image = room.roomTypeImages?.[0]?.url || BgRoom;
  const price = Number(room.basePrice) - Number(room.discountAmount || 0);
  return <MotionBox role="group" whileHover={reducedMotion ? undefined : { y: -3 }} transition={{ duration: 0.22, ease: "easeOut" }} sx={{ cursor: "pointer", "&:hover img": { transform: reducedMotion ? "none" : "scale(1.025)" }, "&:hover .room-link": { color: "primary.main" }, "&:hover .room-link svg": { transform: reducedMotion ? "none" : "translateX(3px)" } }} onClick={() => navigate(`/room-detail/${room.id}`)}>
    <Box sx={{ height: { xs: 340, md: 400 }, overflow: "hidden", bgcolor: "#e6e2da" }}><Box component="img" src={image} alt={room.roomTypeImages?.[0]?.alt || room.name} loading="lazy" sx={{ width: 1, height: 1, objectFit: "cover", transition: "transform .5s ease" }} /></Box>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ pt: 2.25 }}><Box><Typography variant="h3" sx={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24 }}>{room.name}</Typography><Stack direction="row" spacing={.75} alignItems="center" sx={{ mt: .75, color: "text.secondary" }}><PeopleAltOutlinedIcon fontSize="small" /><Typography variant="body2">{t(`${translationPrefix}.capacity`, { count: room.capacity })}</Typography></Stack></Box><Box sx={{ textAlign: "right" }}><Typography fontWeight={700} color="primary.main" sx={{ whiteSpace: "nowrap" }}>{fmtVND(price)} ₫</Typography><Typography variant="caption" color="text.secondary">{t(`${translationPrefix}.perNight`)}</Typography></Box></Stack>
    <Button className="room-link" onClick={(event) => { event.stopPropagation(); onBooking?.(room); }} endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 1, px: 0, color: "text.primary", "& svg": { transition: "transform .2s ease" } }}>{t(`${translationPrefix}.bookRoom`)}</Button>
  </MotionBox>;
};
export default HospitalityRoomCard;
