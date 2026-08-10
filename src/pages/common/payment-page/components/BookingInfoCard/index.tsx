// BookingInfoCard.tsx
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { BookingForm } from "../../interface";
import { useTranslation } from "react-i18next";

type Props = {
  value: BookingForm;
  onChange: (field: keyof BookingForm, value: unknown) => void;
};

const BookingInfoCard = ({ value, onChange }: Props) => {
  const { t } = useTranslation("client");
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 3,
      }}
      variant="outlined"
    >
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700} mb={0.5}>
          {t("payment.legacy.bookingInfo")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("payment.legacy.bookingInfoDescription")}
        </Typography>
      </Box>

      {/* Họ tên */}
      <Box mb={2.5}>
        <Typography fontWeight={600} mb={1} color="#555555" fontSize={14}>
          {t("payment.legacy.fullName")}
        </Typography>
        <TextField
          fullWidth
          value={value.fullName}
          name="fullName"
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder={t("payment.legacy.fullNamePlaceholder")}
        />
      </Box>

      {/* SĐT + Email */}
      <Grid container spacing={2.5} mb={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} mb={1} color="#555555" fontSize={14}>
            {t("payment.legacy.phone")}
          </Typography>
          <TextField
            fullWidth
            value={value.phone}
            name="phone"
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+84..."
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} mb={1} color="#555555" fontSize={14}>
            {t("payment.legacy.email")}
          </Typography>
          <TextField
            fullWidth
            value={value.email}
            name="email"
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@example.com"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Bạn đặt phòng cho ai? */}
      <Box>
        <Typography fontWeight={600} mb={0.5}>
          {t("payment.legacy.bookingFor")}{" "}
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            fontWeight={400}
          >
            {t("payment.legacy.optional")}
          </Typography>
        </Typography>

        <RadioGroup
          sx={{ mt: 1 }}
          value={value.guestType}
          onChange={(e) => onChange("guestType", e.target.value)}
        >
          <FormControlLabel
            value="SELF"
            control={<Radio />}
            label={t("payment.legacy.selfGuest")}
          />
          <FormControlLabel
            value="OTHER"
            control={<Radio />}
            label={t("payment.legacy.otherGuest")}
          />
        </RadioGroup>
      </Box>
    </Paper>
  );
};

export default BookingInfoCard;
