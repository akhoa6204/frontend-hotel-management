import {
  Box,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import dayjs from "dayjs";
import { useMemo } from "react";
import { formatDate } from "@utils/format";
import type { BookingForm } from "../../interface";
import { useTranslation } from "react-i18next";

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (field: keyof BookingForm, value: unknown) => void;
  checkInDate?: string;
};

const buildArrivalOptions = (checkInDate?: string): Option[] => {
  const today = dayjs().startOf("day");
  const checkInDay = checkInDate
    ? dayjs(checkInDate).startOf("day")
    : undefined;

  const baseDay = checkInDay ?? today;
  const start14 = baseDay.hour(14).minute(0).second(0);
  const end22 = baseDay.hour(22).minute(0).second(0);

  let minStart = start14;

  if (checkInDay && checkInDay.isSame(today, "day")) {
    const nowPlus30 = dayjs().add(30, "minute");
    if (nowPlus30.isAfter(minStart)) {
      minStart = nowPlus30;
    }
  }

  if (minStart.isAfter(end22)) return [];

  let t = minStart.second(0);
  const m = t.minute();
  if (m > 0 && m <= 30) {
    t = t.minute(30);
  } else if (m > 30) {
    t = t.add(1, "hour").minute(0);
  }

  const opts: Option[] = [];
  while (!t.isAfter(end22)) {
    opts.push({
      value: t.format("HH:mm"),
      label: t.format("HH:mm"),
    });
    t = t.add(30, "minute");
  }

  return opts;
};

const ArrivalTimeCard = ({ value, onChange, checkInDate }: Props) => {
  const { t } = useTranslation("client");
  const options = useMemo(
    () => buildArrivalOptions(checkInDate),
    [checkInDate],
  );

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
        <Typography variant="h5" fontWeight={700} mb={0.5}>
          {t("payment.legacy.arrivalTitle")}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <CheckCircleRoundedIcon
          sx={{ color: "#2E90FA", mr: 1.5, fontSize: 24 }}
        />
        <Typography variant="body2">
          {t("payment.legacy.arrivalWindow", { date: formatDate(checkInDate) })}
        </Typography>
      </Box>

      <Box mb={1}>
        <Typography fontWeight={600} mb={0.5}>
          {t("payment.legacy.estimatedArrival")}{" "}
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            fontWeight={400}
          >
            {t("payment.legacy.optional")}
          </Typography>
        </Typography>

        <FormControl fullWidth size="small">
          <Select
            value={value}
            displayEmpty
            onChange={(e) => onChange("arrivalTime", e.target.value)}
            sx={{ bgcolor: "#fff" }}
          >
            <MenuItem value="">
              <em>{t("payment.legacy.select")}</em>
            </MenuItem>

            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body2" color="text.secondary">
        {t("payment.legacy.localTime")}
      </Typography>
    </Paper>
  );
};

export default ArrivalTimeCard;
