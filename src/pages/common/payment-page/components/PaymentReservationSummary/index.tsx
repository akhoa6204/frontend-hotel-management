import { useState } from "react";
import { BgRoom } from "@assets/images";
import type { BookingResponse } from "@constant/response/BookingResponse";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { diffNights, fmtVND, formatDate } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props {
  booking: BookingResponse;
  finalTotal: number;
}

const inappropriateImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;

const PaymentReservationSummary = ({ booking, finalTotal }: Props) => {
  const { t } = useTranslation("client");
  const [imageFailed, setImageFailed] = useState(false);
  const suitableImage = booking.room.roomType.roomTypeImages?.find(
    (image) => image.url && !inappropriateImagePattern.test(`${image.url} ${image.alt ?? ""}`),
  );
  const image = imageFailed || !suitableImage ? BgRoom : suitableImage.url;
  const nights = diffNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Box
      component="aside"
      aria-labelledby="payment-reservation-title"
      sx={{
        position: { md: "sticky" },
        top: { md: 96 },
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: "0 18px 50px rgba(13,52,66,.09)",
      }}
    >
      <Box sx={{ position: "relative", width: 1, aspectRatio: { xs: "16 / 7", sm: "16 / 6", md: "16 / 9" }, overflow: "hidden", bgcolor: "#e3e0d9" }}>
        <Box
          component="img"
          src={image}
          alt={suitableImage?.alt || t("payment.summary.roomImageAlt", { room: booking.room.roomType.name })}
          onError={() => setImageFailed(true)}
          sx={{ position: "absolute", inset: 0, display: "block", width: 1, height: 1, objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

      <Box sx={{ p: { xs: 2.5, sm: 3, md: 3.25 } }}>
        <Typography id="payment-reservation-title" sx={{ color: "primary.main", letterSpacing: 1.8, fontSize: 11, fontWeight: 750 }}>
          {t("payment.summary.eyebrow")}
        </Typography>
        <Typography component="h2" sx={{ mt: 1, fontFamily: "Georgia, serif", fontSize: { xs: 25, md: 28 }, lineHeight: 1.2, color: "text.primary" }}>
          {booking.room.roomType.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.25, color: "text.secondary" }}>
          <PeopleAltOutlinedIcon sx={{ fontSize: 19 }} />
          <Typography variant="body2">
            {t("payment.summary.capacity")}: {t("payment.summary.guests", { count: booking.room.roomType.capacity })}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", columnGap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">{t("payment.summary.checkIn")}</Typography>
            <Typography fontWeight={700} color="text.primary" sx={{ mt: 0.5, whiteSpace: "nowrap" }}>{formatDate(booking.checkInDate)}</Typography>
          </Box>
          <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 64, color: "text.secondary" }}>
            <ArrowForwardRoundedIcon sx={{ color: "primary.main", fontSize: 21 }} />
            <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>{t("payment.summary.nights", { count: nights })}</Typography>
          </Stack>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="caption" color="text.secondary">{t("payment.summary.checkOut")}</Typography>
            <Typography fontWeight={700} color="text.primary" sx={{ mt: 0.5, whiteSpace: "nowrap" }}>{formatDate(booking.checkOutDate)}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography component="h3" sx={{ fontSize: 17, fontWeight: 700, color: "text.primary" }}>{t("payment.summary.guestInfo")}</Typography>
        <Stack spacing={1.1} sx={{ mt: 1.75, color: "text.secondary" }}>
          <Stack direction="row" spacing={1.1} alignItems="center"><PersonOutlineRoundedIcon sx={{ fontSize: 19 }} /><Typography variant="body2">{booking.guestName}</Typography></Stack>
          {booking.guestPhone && <Stack direction="row" spacing={1.1} alignItems="center"><PhoneOutlinedIcon sx={{ fontSize: 19 }} /><Typography variant="body2">{booking.guestPhone}</Typography></Stack>}
          {booking.guestEmail && <Stack direction="row" spacing={1.1} alignItems="center"><EmailOutlinedIcon sx={{ fontSize: 19 }} /><Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>{booking.guestEmail}</Typography></Stack>}
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
          <Typography color="text.secondary">{t("payment.summary.totalStay")}</Typography>
          <Typography sx={{ fontSize: 21, fontWeight: 750, color: "text.primary", whiteSpace: "nowrap" }}>{fmtVND(finalTotal)} VND</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default PaymentReservationSummary;
