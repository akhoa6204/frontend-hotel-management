import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import { formatDate } from "@utils/format";
import type { BookingForm } from "../../useBooking";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value?: string;
  onChange: <K extends keyof BookingForm>(field: K, value: BookingForm[K]) => void;
  checkInDate?: string;
}

const buildArrivalOptions = (checkInDate?: string): Option[] => {
  const today = dayjs().startOf("day");
  const checkInDay = checkInDate ? dayjs(checkInDate).startOf("day") : undefined;
  const baseDay = checkInDay ?? today;
  const end = baseDay.hour(22).minute(0).second(0);
  let current = baseDay.hour(14).minute(0).second(0);

  if (checkInDay?.isSame(today, "day")) {
    const nowPlus30 = dayjs().add(30, "minute");
    if (nowPlus30.isAfter(current)) current = nowPlus30;
  }
  if (current.isAfter(end)) return [];

  const minutes = current.minute();
  if (minutes > 0 && minutes <= 30) current = current.minute(30).second(0);
  if (minutes > 30) current = current.add(1, "hour").minute(0).second(0);

  const options: Option[] = [];
  while (!current.isAfter(end)) {
    options.push({ value: current.format("HH:mm"), label: current.format("HH:mm") });
    current = current.add(30, "minute");
  }
  return options;
};

const ArrivalTimeCard = ({ value = "14:00", onChange, checkInDate }: Props) => {
  const options = useMemo(() => buildArrivalOptions(checkInDate), [checkInDate]);

  return (
    <Box component="section" aria-labelledby="arrival-time-title">
      <Typography id="arrival-time-title" component="h2" sx={{ fontSize: { xs: 24, md: 27 }, fontWeight: 650, color: "#183746" }}>
        Thời gian đến
      </Typography>
      <Stack direction="row" spacing={1.25} alignItems="flex-start" sx={{ mt: 1.5, color: "#425866" }}>
        <CheckCircleOutlineRoundedIcon sx={{ mt: 0.15, color: "primary.main", fontSize: 21 }} />
        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
          Nhận phòng từ 14:00 đến 22:00{checkInDate ? ` ngày ${formatDate(checkInDate)}` : ""}.
        </Typography>
      </Stack>

      <Box sx={{ mt: 2.5, maxWidth: 360 }}>
        <Typography component="label" htmlFor="estimated-arrival-time" sx={{ display: "block", mb: 1, fontSize: 14, fontWeight: 650 }}>
          Giờ đến dự kiến <Typography component="span" variant="body2" color="text.secondary">(không bắt buộc)</Typography>
        </Typography>
        <FormControl fullWidth>
          <Select
            id="estimated-arrival-time"
            value={value}
            displayEmpty
            onChange={(event) => onChange("estimatedArrivalTime", event.target.value)}
            sx={{ minHeight: 50, borderRadius: 1.25, bgcolor: "#fff", "& fieldset": { borderColor: "#d8d6cf" } }}
          >
            <MenuItem value=""><em>Chưa xác định</em></MenuItem>
            {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          Giờ địa phương tại Đà Nẵng
        </Typography>
      </Box>
    </Box>
  );
};

export default ArrivalTimeCard;
