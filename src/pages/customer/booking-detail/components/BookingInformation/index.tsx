import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import type { BookingResponse } from "@constant/response/BookingResponse";
import { Box, Stack, Typography } from "@mui/material";
import { formatTime } from "@utils/format";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props { booking: BookingResponse }

const Detail = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box sx={{ color: "primary.main", mt: .1 }}>{icon}</Box>
    <Box>
      <Typography fontSize={12} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</Typography>
      <Typography mt={.4} sx={{ overflowWrap: "anywhere" }}>{value}</Typography>
    </Box>
  </Stack>
);

const BookingInformation = ({ booking }: Props) => {
  const { t } = useTranslation("client");
  const arrivalTime = formatTime(booking.estimatedArrivalTime);
  return (
    <Box component="section" sx={{ minWidth: 0, height: 1 }}>
      <Typography component="h2" sx={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "text.primary", fontSize: 27, mb: 1 }}>{t("bookingDetail.information.title")}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>{t("bookingDetail.information.description")}</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: { xs: 2.5, sm: 3.5 }, py: 3, borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider" }}>
        <Detail icon={<PersonOutlineRounded fontSize="small" />} label={t("bookingDetail.information.guest")} value={booking.guestName} />
        <Detail icon={<PhoneOutlined fontSize="small" />} label={t("bookingDetail.information.phone")} value={booking.guestPhone} />
        <Detail icon={<EmailOutlined fontSize="small" />} label={t("bookingDetail.information.email")} value={booking.guestEmail} />
        {arrivalTime && <Detail icon={<AccessTimeRounded fontSize="small" />} label={t("bookingDetail.information.arrivalTime")} value={arrivalTime} />}
      </Box>
    </Box>
  );
};

export default BookingInformation;
