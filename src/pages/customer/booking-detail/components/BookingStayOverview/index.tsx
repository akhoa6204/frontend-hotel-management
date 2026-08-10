import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import HotelOutlined from "@mui/icons-material/HotelOutlined";
import PeopleOutlineRounded from "@mui/icons-material/PeopleOutlineRounded";
import { BgRoom } from "@assets/images";
import type { BookingResponse } from "@constant/response/BookingResponse";
import { Box, Stack, Typography } from "@mui/material";
import { diffNights } from "@utils/format";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props { booking: BookingResponse }

const unsuitableImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;

const BookingStayOverview = ({ booking }: Props) => {
  const { t, i18n } = useTranslation("client");
  const displayDate = (value: string) =>
    new Intl.DateTimeFormat(i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
  const [imageFailed, setImageFailed] = useState(false);
  const suitableImage = booking.room.roomType.roomTypeImages?.find(
    (image) => image.url && !unsuitableImagePattern.test(image.url),
  );
  const image = imageFailed || !suitableImage ? BgRoom : suitableImage.url;
  const nights = diffNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Box component="section" sx={{ bgcolor: "#F4F0E9", overflow: "hidden", borderRadius: { xs: 1.5, md: 2 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 42fr) minmax(0, 58fr)" } }}>
      <Box component="img" src={image} onError={() => setImageFailed(true)} alt={t("bookingDetail.stay.roomImageAlt", { room: booking.room.roomType.name })} sx={{ width: 1, height: { xs: 220, sm: 300, md: 340 }, objectFit: "cover", display: "block" }} />
      <Stack justifyContent="center" sx={{ p: { xs: 3, sm: 4, md: 4.5, xl: 5.5 } }}>
        <Typography color="text.secondary" fontSize={13} sx={{ textTransform: "uppercase", letterSpacing: ".12em" }}>
          {t("bookingDetail.stay.room", { room: booking.room.name })}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2.5 }} sx={{ my: 2.5 }}>
          <Box><Typography fontSize={12} color="text.secondary">{t("bookingDetail.stay.checkIn")}</Typography><Typography sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 18, sm: 22 }, mt: .5 }}>{displayDate(booking.checkInDate)}</Typography></Box>
          <ArrowForwardRounded aria-hidden sx={{ color: "primary.main", flexShrink: 0 }} />
          <Box><Typography fontSize={12} color="text.secondary">{t("bookingDetail.stay.checkOut")}</Typography><Typography sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 18, sm: 22 }, mt: .5 }}>{displayDate(booking.checkOutDate)}</Typography></Box>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 3 }} color="text.secondary">
          <Stack direction="row" spacing={1} alignItems="center"><HotelOutlined fontSize="small" /><Typography variant="body2">{t("bookingDetail.stay.nights", { count: nights })}</Typography></Stack>
          <Stack direction="row" spacing={1} alignItems="center"><PeopleOutlineRounded fontSize="small" /><Typography variant="body2">{t("bookingDetail.stay.capacity", { count: booking.room.roomType.capacity })}</Typography></Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BookingStayOverview;
