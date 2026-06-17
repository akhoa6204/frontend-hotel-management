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
import { BookingForm } from "../../useBooking";

type Props = {
  value: BookingForm;
  onChange: (field: keyof BookingForm, value: any) => void;
  errors: Partial<Record<keyof BookingForm, string>>;
};

const BookingInfoCard = ({ value, onChange, errors }: Props) => {
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
          Thông tin đặt phòng
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vui lòng kiểm tra thông tin đặt phòng.
        </Typography>
      </Box>

      {/* Họ tên */}
      <Box mb={2.5}>
        <Typography fontWeight={600} mb={1} color="#555555" fontSize={14}>
          Họ tên
        </Typography>
        <TextField
          fullWidth
          value={value.guestName}
          name="guestName"
          onChange={(e) => onChange("guestName", e.target.value)}
          placeholder="Nhập họ tên"
          error={!!errors["guestName"]}
          helperText={errors["guestName"]}
        />
      </Box>

      {/* SĐT + Email */}
      <Grid container spacing={2.5} mb={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} mb={1} color="#555555" fontSize={14}>
            Số điện thoại
          </Typography>
          <TextField
            fullWidth
            value={value.guestPhone}
            name="guestPhone"
            onChange={(e) => onChange("guestPhone", e.target.value)}
            placeholder="+84..."
            error={!!errors["guestPhone"]}
            helperText={errors["guestPhone"]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} mb={1} color="#555555" fontSize={14}>
            Email
          </Typography>
          <TextField
            fullWidth
            value={value.guestEmail}
            name="guestEmail"
            onChange={(e) => onChange("guestEmail", e.target.value)}
            placeholder="email@example.com"
            error={!!errors["guestEmail"]}
            helperText={errors["guestEmail"]}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Bạn đặt phòng cho ai? */}
      <Box>
        <Typography fontWeight={600} mb={0.5}>
          Bạn đặt phòng cho ai?{" "}
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            fontWeight={400}
          >
            (không bắt buộc)
          </Typography>
        </Typography>

        <RadioGroup
          sx={{ mt: 1 }}
          value={value.bookingForSomeoneElse}
          onChange={(e) => onChange("bookingForSomeoneElse", e.target.value)}
        >
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Tôi là khách lưu trú"
          />
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Đặt phòng này là cho người khác"
          />
        </RadioGroup>
      </Box>
    </Paper>
  );
};

export default BookingInfoCard;
