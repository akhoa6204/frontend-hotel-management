import { Box, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import type { BookingForm } from "../../useBooking";
import { useTranslation } from "react-i18next";

interface Props {
  value: BookingForm;
  onChange: <K extends keyof BookingForm>(field: K, value: BookingForm[K]) => void;
  errors: Partial<Record<keyof BookingForm, string>>;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 50,
    borderRadius: 1.25,
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#d8d6cf" },
    "&:hover fieldset": { borderColor: "#9aa8af" },
    "&.Mui-focused fieldset": { borderWidth: 1.5 },
  },
} as const;

const BookingInfoCard = ({ value, onChange, errors }: Props) => {
  const { t } = useTranslation("client");

  return (
  <Box component="section" aria-labelledby="guest-information-title">
    <Typography id="guest-information-title" component="h2" sx={{ fontSize: { xs: 24, md: 27 }, fontWeight: 650, color: "text.primary" }}>
      {t("booking.guestInformation.title")}
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
      {t("booking.guestInformation.description")}
    </Typography>

    <Grid container spacing={2.5} sx={{ mt: 1.5 }}>
      <Grid size={12}>
        <TextField
          fullWidth
          required
          label={t("booking.guestInformation.fullName")}
          value={value.guestName}
          name="guestName"
          autoComplete="name"
          onChange={(event) => onChange("guestName", event.target.value)}
          error={Boolean(errors.guestName)}
          helperText={errors.guestName}
          sx={fieldSx}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          required
          label={t("booking.guestInformation.phone")}
          value={value.guestPhone}
          name="guestPhone"
          type="tel"
          autoComplete="tel"
          onChange={(event) => onChange("guestPhone", event.target.value)}
          error={Boolean(errors.guestPhone)}
          helperText={errors.guestPhone}
          sx={fieldSx}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          required
          label={t("booking.guestInformation.email")}
          value={value.guestEmail}
          name="guestEmail"
          type="email"
          autoComplete="email"
          onChange={(event) => onChange("guestEmail", event.target.value)}
          error={Boolean(errors.guestEmail)}
          helperText={errors.guestEmail}
          sx={fieldSx}
        />
      </Grid>
    </Grid>

    <Divider sx={{ my: { xs: 4, md: 5 } }} />

    <Typography component="h3" sx={{ fontSize: 18, fontWeight: 650, color: "text.primary" }}>
      {t("booking.guestInformation.bookingForTitle")}
    </Typography>
    <RadioGroup
      aria-label={t("booking.guestInformation.stayingGuestLabel")}
      value={value.bookingForSomeoneElse ? "other" : "self"}
      onChange={(event) => onChange("bookingForSomeoneElse", event.target.value === "other")}
      sx={{ mt: 1.25, gap: 0.25 }}
    >
      <FormControlLabel value="self" control={<Radio />} label={t("booking.guestInformation.self")} />
      <FormControlLabel value="other" control={<Radio />} label={t("booking.guestInformation.someoneElse")} />
    </RadioGroup>
  </Box>
  );
};

export default BookingInfoCard;
