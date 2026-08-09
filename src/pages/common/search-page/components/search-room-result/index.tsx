import { useState } from "react";
import { BgRoom } from "@assets/images";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";

interface Props {
  room: RoomTypeResponse;
  onViewRoom: (roomId: number) => void;
  onBooking: (roomId: number) => void;
}

const inappropriateImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;

const SearchRoomResult = ({ room, onViewRoom, onBooking }: Props) => {
  const [imageFailed, setImageFailed] = useState(false);
  const suitableImage = room.roomTypeImages?.find(
    (image) => image.url && !inappropriateImagePattern.test(`${image.url} ${image.alt ?? ""}`),
  );
  const displayPrice = Number(room.basePrice) - Number(room.discountAmount || 0);
  const canBook = room.isAvailable !== false && Boolean(room.roomId);

  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(300px, 42%) minmax(0, 1fr)" },
        minHeight: { md: 330 },
        bgcolor: "#fff",
        borderBottom: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => onViewRoom(room.id)}
        aria-label={`Xem chi tiết ${room.name}`}
        sx={{
          position: "relative",
          alignSelf: { md: "start" },
          width: 1,
          height: { md: 330 },
          aspectRatio: { xs: "4 / 3", md: "auto" },
          p: 0,
          border: 0,
          bgcolor: "#e3e0d9",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover img": { transform: "scale(1.025)" },
          "&:focus-visible": { outline: "3px solid #2E90FA", outlineOffset: -3 },
        }}
      >
        <Box
          component="img"
          src={imageFailed || !suitableImage ? BgRoom : suitableImage.url}
          alt={suitableImage?.alt || room.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          sx={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: 1,
            height: 1,
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform .45s ease",
          }}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 190px" }, gap: { xs: 3, lg: 4 }, p: { xs: 3, sm: 4, md: 4.5 } }}>
        <Stack sx={{ minWidth: 0 }}>
          <Typography sx={{ color: "primary.main", letterSpacing: 1.8, fontSize: 11, fontWeight: 700 }}>
            PHÒNG DIAMOND SEA
          </Typography>
          <Typography component="h2" sx={{ mt: 1, fontFamily: "Georgia, serif", fontSize: { xs: 27, md: 31 }, lineHeight: 1.2, color: "text.primary" }}>
            {room.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: "text.secondary" }}>
            <PeopleAltOutlinedIcon fontSize="small" />
            <Typography variant="body2">Tối đa {room.capacity} khách</Typography>
          </Stack>

          {room.description && (
            <Typography color="text.secondary" sx={{ mt: 2.25, lineHeight: 1.75, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {room.description}
            </Typography>
          )}

          {!!room.amenities?.length && (
            <Stack direction="row" flexWrap="wrap" columnGap={2.5} rowGap={1.25} sx={{ mt: 2.5 }}>
              {room.amenities.slice(0, 4).map((amenity) => (
                <Stack key={amenity.id} direction="row" spacing={.75} alignItems="center" sx={{ color: "text.secondary" }}>
                  <CheckCircleOutlineRoundedIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="body2">{amenity.label}</Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        <Stack justifyContent="space-between" alignItems={{ lg: "flex-end" }} sx={{ pt: { lg: 2 }, borderLeft: { lg: "1px solid #e2dfd8" }, pl: { lg: 4 } }}>
          <Box sx={{ textAlign: { lg: "right" } }}>
            <Typography variant="caption" color="text.secondary">Giá mỗi đêm</Typography>
            {!!room.discountAmount && (
              <Typography variant="body2" sx={{ mt: .5, color: "text.disabled", textDecoration: "line-through" }}>
                {fmtVND(room.basePrice)} ₫
              </Typography>
            )}
            <Typography sx={{ mt: .25, fontSize: { xs: 25, md: 28 }, fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}>
              {fmtVND(displayPrice)} ₫
            </Typography>
          </Box>

          <Stack spacing={1.25} sx={{ width: 1, mt: { xs: 3, lg: 5 } }}>
            <Button variant="contained" disabled={!canBook} onClick={() => room.roomId && onBooking(room.roomId)} sx={{ minHeight: 46, borderRadius: 1 }}>
              {room.isAvailable === false ? "Hết phòng" : "Chọn phòng"}
            </Button>
            <Button variant="text" endIcon={<ArrowForwardRoundedIcon />} onClick={() => onViewRoom(room.id)} sx={{ minHeight: 44 }}>
              Xem chi tiết
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchRoomResult;
