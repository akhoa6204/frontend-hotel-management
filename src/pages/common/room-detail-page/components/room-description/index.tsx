import { useState } from "react";
import type { AmenityResponse } from "@constant/response/AmenityResponse";
import type { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CoffeeMakerOutlinedIcon from "@mui/icons-material/CoffeeMakerOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import { Box, Button, Divider, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fmtVND } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props { name: string; description?: string | null; capacity: number; basePrice: number; discount: number; amenities?: AmenityResponse[]; rating: number; totalReviews: number; handleBookingRoom: (selection: SearchBookingFilter) => void; }

const amenityIcons: Record<string, React.ReactNode> = { WIFI: <WifiOutlinedIcon />, AIR_CONDITIONER: <AcUnitOutlinedIcon />, BATHTUB: <BathtubOutlinedIcon />, COFFEE_MACHINE: <CoffeeMakerOutlinedIcon />, TV: <TvOutlinedIcon />, SMART_TV: <TvOutlinedIcon /> };
const normalizeAmenity = (label: string) => label.trim().toUpperCase().replace(/[ -]+/g, "_");

const RoomDescription = ({ name, description, capacity, basePrice, discount, amenities = [], rating, totalReviews, handleBookingRoom }: Props) => {
  const { t } = useTranslation("client");
  const today = dayjs().startOf("day");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today.add(1, "day"));
  const [guests, setGuests] = useState(Math.min(2, capacity));
  const nightlyPrice = Number(basePrice) - Number(discount);

  const checkAvailability = () => handleBookingRoom({ startDate: startDate.format("YYYY-MM-DD"), endDate: endDate.format("YYYY-MM-DD"), capacity: guests });

  return <Box component="section" sx={{ pt: { xs: 4.5, md: 6 }, pb: { xs: 5, md: 7 } }}>
    <Grid container spacing={{ xs: 3, md: 7 }} alignItems="flex-end" sx={{ pb: { xs: 4, md: 5 }, borderBottom: "1px solid #dcd9d1" }}>
      <Grid size={{ xs: 12, md: 8 }}><Typography sx={{ color: "primary.main", letterSpacing: 2, fontSize: 12, fontWeight: 700 }}>{t("roomDetail.room.eyebrow")}</Typography><Typography component="h1" sx={{ mt: 1, fontFamily: "Georgia, serif", fontSize: { xs: 38, md: 50 }, fontWeight: 400, lineHeight: 1.12 }}>{name}</Typography>{description && <Typography color="text.secondary" sx={{ mt: 1.75, maxWidth: 720, fontSize: 16, lineHeight: 1.7 }}>{description}</Typography>}<Stack direction="row" flexWrap="wrap" gap={2.5} sx={{ mt: 2.25, color: "text.secondary" }}><Stack direction="row" spacing={.75} alignItems="center"><PeopleAltOutlinedIcon fontSize="small" /><Typography variant="body2">{t("roomDetail.room.capacity", { count: capacity })}</Typography></Stack>{rating > 0 && <Stack direction="row" spacing={.5} alignItems="center"><StarRoundedIcon sx={{ color: "rating.main", fontSize: 20 }} /><Typography variant="body2">{rating.toFixed(1)} · {t("roomDetail.reviews.count", { count: totalReviews })}</Typography></Stack>}</Stack></Grid>
      <Grid size={{ xs: 12, md: 4 }}><Typography variant="body2" color="text.secondary">{t("roomDetail.price.from")}</Typography>{discount > 0 && <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.disabled" }}>{fmtVND(basePrice)} ₫</Typography>}<Stack direction="row" spacing={1} alignItems="baseline"><Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 600, color: "text.primary" }}>{fmtVND(nightlyPrice)} ₫</Typography><Typography variant="body2" color="text.secondary">{t("roomDetail.price.perNight")}</Typography></Stack></Grid>
    </Grid>

    <Grid container spacing={{ xs: 5, md: 7 }} sx={{ pt: { xs: 5, md: 7 } }}>
      <Grid size={{ xs: 12, md: 8 }}>
        {description && <Box component="section" aria-labelledby="about-room-heading"><Typography id="about-room-heading" component="h2" variant="h2" sx={{ fontSize: { xs: 28, md: 32 } }}>{t("roomDetail.room.about")}</Typography><Typography color="text.secondary" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.85 }}>{description}</Typography></Box>}
        {!!amenities.length && <Box component="section" aria-labelledby="room-amenities-heading" sx={{ mt: description ? { xs: 5, md: 6 } : 0 }}><Typography id="room-amenities-heading" component="h2" variant="h2" sx={{ fontSize: { xs: 28, md: 32 } }}>{t("roomDetail.room.amenities")}</Typography><Grid container rowSpacing={3} columnSpacing={4} sx={{ mt: 1.5 }}>{amenities.map((amenity) => { const icon = amenityIcons[normalizeAmenity(amenity.label)] ?? <CheckCircleOutlineRoundedIcon />; return <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={amenity.id}><Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "text.primary", "& svg": { color: "primary.main", fontSize: 25 } }}>{icon}<Typography>{amenity.label}</Typography></Stack></Grid>; })}</Grid></Box>}
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper elevation={0} sx={{ position: { md: "sticky" }, top: { md: 104 }, p: { xs: 3, md: 3.5 }, borderRadius: 1, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", boxShadow: "0 14px 36px rgba(16,43,56,.09)" }}>
          <Typography variant="body2" color="text.secondary">{t("roomDetail.booking.pricePerNightFrom")}</Typography><Typography sx={{ mt: .25, fontSize: 30, fontWeight: 600, color: "text.primary" }}>{fmtVND(nightlyPrice)} ₫</Typography><Divider sx={{ my: 2.5 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}><Stack spacing={2}><DatePicker label={t("roomDetail.booking.checkIn")} value={startDate} minDate={today} format="DD/MM/YYYY" onChange={(date) => { if (!date) return; const nextStart = date.startOf("day"); setStartDate(nextStart); if (!endDate.isAfter(nextStart)) setEndDate(nextStart.add(1, "day")); }} slotProps={{ textField: { fullWidth: true } }} /><DatePicker label={t("roomDetail.booking.checkOut")} value={endDate} minDate={startDate.add(1, "day")} format="DD/MM/YYYY" onChange={(date) => date && setEndDate(date.startOf("day"))} slotProps={{ textField: { fullWidth: true } }} /><TextField select label={t("roomDetail.booking.guests")} value={guests} onChange={(event) => setGuests(Number(event.target.value))} slotProps={{ select: { native: true } }}>{Array.from({ length: capacity }, (_, index) => index + 1).map((value) => <option key={value} value={value}>{t("roomDetail.booking.guestOption", { count: value })}</option>)}</TextField></Stack></LocalizationProvider>
          <Button fullWidth variant="contained" size="large" onClick={checkAvailability} sx={{ mt: 2.5, borderRadius: 1, py: 1.35 }}>{t("roomDetail.booking.checkAvailability")}</Button><Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.25, textAlign: "center" }}>{t("roomDetail.booking.confirmationNote")}</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>;
};
export default RoomDescription;
