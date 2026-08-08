import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import { FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";

interface Props {
  total: number;
  sort?: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
}

const SearchResultsHeader = ({ total, sort = "asc", onSortChange }: Props) => (
  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2.5} sx={{ mb: { xs: 3, md: 4 } }}>
    <BoxCopy total={total} />
    <Stack direction="row" spacing={1} alignItems="center">
      <SwapVertRoundedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
      <FormControl size="small">
        <Select
          aria-label="Sắp xếp phòng"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as "asc" | "desc")}
          sx={{ minWidth: 178, bgcolor: "#fff", borderRadius: 1, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#dedbd4" } }}
        >
          <MenuItem value="asc">Giá thấp đến cao</MenuItem>
          <MenuItem value="desc">Giá cao đến thấp</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  </Stack>
);

const BoxCopy = ({ total }: { total: number }) => (
  <div>
    <Typography id="search-results-heading" component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 28, md: 34 }, color: "#183746" }}>
      Phòng phù hợp với kỳ nghỉ của bạn
    </Typography>
    <Typography color="text.secondary" sx={{ mt: .75 }}>
      {total} hạng phòng khả dụng
    </Typography>
  </div>
);

export default SearchResultsHeader;
