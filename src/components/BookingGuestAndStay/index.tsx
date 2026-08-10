import { Box, Divider, Stack, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { diffNights, formatDate } from "@utils/format";
import type { BookingResponse } from "@constant/response/BookingResponse";
import { useTranslation } from "react-i18next";

const formatTime = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
};

type Props = {
  title: string;
  booking: BookingResponse;
};

const BookingGuestAndStay = ({ title, booking }: Props) => {
  const { t } = useTranslation("client");
  const nights = diffNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Box
      sx={{
        mb: 1.5,
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" fontWeight={600} px={2.5} py={2}>
        {title}
      </Typography>
      <Divider />

      <Stack direction="row" spacing={3} px={2.5} py={2}>
        {/* Guest info */}
        <Box sx={{ minWidth: 260 }}>
          <Typography fontWeight={600} mb={1}>
            {booking.guestName}
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2">
              📞 {booking.guestPhone || t("shared.booking.noPhone")}
            </Typography>
            <Typography variant="body2">
              ✉️ {booking.guestEmail || t("shared.booking.noEmail")}
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem />
        {/* Stay info card */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 2,
            bgcolor: "#2E90FA0d",
            p: 2.5,
            width: "100%",
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t("shared.booking.checkIn")}
              </Typography>
              <Typography fontWeight={600}>
                {formatDate(booking.checkInDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatTime("2025-01-01T14:00:00")}
              </Typography>
            </Box>

            <Stack alignItems="center" justifyContent="center" spacing={0.5}>
              <Typography variant="body2">{t("shared.booking.nights", { count: nights })}</Typography>
              <EastIcon sx={{ fontSize: 24, color: "text.primary" }} />
            </Stack>

            <Box>
              <Typography variant="body2" color="text.secondary">
                {t("shared.booking.checkOut")}
              </Typography>
              <Typography fontWeight={600}>
                {formatDate(booking.checkOutDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatTime("2025-01-01T12:00:00")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookingGuestAndStay;
