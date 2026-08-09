import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import type { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";

interface Props {
  form: SearchBookingFilter;
  onChange: (field: keyof SearchBookingFilter, value: string | number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({ form, onSubmit, onChange }: Props) => {
  const today = dayjs().startOf("day");
  const fromDate: Dayjs | null = form.startDate ? dayjs(form.startDate) : null;
  const toDate: Dayjs | null = form.endDate ? dayjs(form.endDate) : null;
  const minCheckoutDate = (fromDate ?? today).add(1, "day");
  const fieldSx = {
    flex: 1,
    minWidth: 0,
    px: { xs: 0, md: 2.5 },
    py: { xs: 1, md: 0 },
    "& .MuiInputBase-root": { width: "100%", p: 0 },
    "& .MuiInputBase-input": { p: 0, fontWeight: 600, color: "#152a38" },
  } as const;
  const textFieldSlot = {
    variant: "standard",
    InputProps: { disableUnderline: true },
    inputProps: { "aria-label": "Ngày lưu trú" },
  } as const;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={onSubmit} aria-label="Tìm phòng" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, width: "100%", bgcolor: "#fff", p: { xs: 2.5, md: 2 }, boxShadow: "0 18px 55px rgba(12,39,55,.16)", borderRadius: { xs: 2, md: 1 }, gap: { xs: 1, md: 0 } }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flex: 1 }}>
          <CalendarMonthOutlinedIcon color="primary" />
          <Box sx={fieldSx}>
            <Typography variant="caption" color="text.secondary">Nhận phòng</Typography>
            <DatePicker value={fromDate} minDate={today} onChange={(date) => {
              if (!date) return onChange("startDate", "");
              const normalized = date.startOf("day");
              onChange("startDate", normalized.format("YYYY-MM-DD"));
              if (toDate && toDate.isBefore(normalized.add(1, "day"), "day")) onChange("endDate", normalized.add(1, "day").format("YYYY-MM-DD"));
            }} format="DD/MM/YYYY" slotProps={{ textField: textFieldSlot }} sx={{ width: "100%" }} />
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          sx={{ display: { xs: "none", md: "block" }, height: 44, mx: 3, alignSelf: "center" }}
        />
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flex: 1 }}>
          <CalendarMonthOutlinedIcon color="primary" />
          <Box sx={fieldSx}>
            <Typography variant="caption" color="text.secondary">Trả phòng</Typography>
            <DatePicker value={toDate} minDate={minCheckoutDate} onChange={(date) => onChange("endDate", date ? date.startOf("day").format("YYYY-MM-DD") : "")} format="DD/MM/YYYY" slotProps={{ textField: textFieldSlot }} sx={{ width: "100%" }} />
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          sx={{ display: { xs: "none", md: "block" }, height: 44, mx: 3, alignSelf: "center" }}
        />
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flex: { md: .75 } }}>
          <PeopleAltOutlinedIcon color="primary" />
          <Box sx={fieldSx}>
            <Typography variant="caption" color="text.secondary">Số khách</Typography>
            <TextField type="number" variant="standard" value={form.capacity} onChange={(event) => onChange("capacity", Number(event.target.value))} slotProps={{ input: { disableUnderline: true, inputProps: { min: 1, "aria-label": "Số lượng khách" } } }} sx={{ width: "100%" }} />
          </Box>
        </Box>
        <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />} sx={{ ml: { md: 2 }, px: 3.5, py: 1.4, borderRadius: 1, flexShrink: 0 }}>
          Tìm phòng
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchBar;
