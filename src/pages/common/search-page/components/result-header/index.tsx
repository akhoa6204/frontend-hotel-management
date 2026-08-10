import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import { FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  total: number;
  sort?: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
}

const SearchResultsHeader = ({ total, sort = "asc", onSortChange }: Props) => {
  const { t } = useTranslation("client");

  return (
  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2.5} sx={{ mb: { xs: 3, md: 4 } }}>
    <BoxCopy total={total} />
    <Stack direction="row" spacing={1} alignItems="center">
      <SwapVertRoundedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
      <FormControl size="small">
        <Select
          aria-label={t("search.sort.label")}
          value={sort}
          onChange={(event) => onSortChange(event.target.value as "asc" | "desc")}
          sx={{ minWidth: 178, bgcolor: "background.paper", borderRadius: 1 }}
        >
          <MenuItem value="asc">{t("search.sort.priceAscending")}</MenuItem>
          <MenuItem value="desc">{t("search.sort.priceDescending")}</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  </Stack>
  );
};

const BoxCopy = ({ total }: { total: number }) => {
  const { t } = useTranslation("client");

  return (
  <div>
    <Typography id="search-results-heading" component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 28, md: 34 }, color: "text.primary" }}>
      {t("search.results.title")}
    </Typography>
    <Typography color="text.secondary" sx={{ mt: .75 }}>
      {t("search.results.count", { count: total })}
    </Typography>
  </div>
  );
};

export default SearchResultsHeader;
