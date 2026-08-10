import { MatchNotFound } from "@assets/images";
import GlobalSnackbar from "@components/GlobalSnackbar";
import { SearchBar } from "@components";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { diffNights } from "@utils/format";
import SearchResultsHeader from "./components/result-header";
import SearchRoomResult from "./components/search-room-result";
import SearchRoomResultSkeleton from "./components/search-room-result-skeleton";
import useSearch from "./useSearch";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const { t } = useTranslation("client");
  const {
    formSearch,
    onChangeFormSearch,
    onSubmitSearch,
    onBooking,
    onViewRoom,
    rooms,
    loadingRooms,
    roomsError,
    retryRooms,
    meta,
    handleSort,
    alert,
    closeSnackbar,
    filters,
  } = useSearch();

  const nights = diffNights(formSearch.startDate, formSearch.endDate);
  const resultTotal = meta?.total ?? rooms.length;
  const formattedStart = dayjs(formSearch.startDate).format("DD/MM/YYYY");
  const formattedEnd = dayjs(formSearch.endDate).format("DD/MM/YYYY");

  const focusSearch = () => {
    document.getElementById("modify-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Box component="main" sx={{ bgcolor: "background.default", minHeight: "70vh" }}>
      <Box component="section" sx={{ bgcolor: "#eef2f1", borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5.5, md: 8 } }}>
          <Typography sx={{ color: "primary.main", letterSpacing: 2.2, fontSize: 12, fontWeight: 700 }}>
            {t("search.hero.eyebrow")}
          </Typography>
          <Typography component="h1" sx={{ mt: 1.5, fontFamily: "Georgia, serif", fontSize: { xs: 38, sm: 46, md: 54 }, lineHeight: 1.12, color: "text.primary" }}>
            {t("search.hero.title")}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 650, fontSize: { xs: 16, md: 17 }, lineHeight: 1.75 }}>
            {t("search.hero.description")}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.25, sm: 3 }} sx={{ mt: 3.5, color: "text.secondary" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonthOutlinedIcon sx={{ color: "primary.main", fontSize: 21 }} />
              <Typography fontWeight={600}>{formattedStart} — {formattedEnd}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PeopleAltOutlinedIcon sx={{ color: "primary.main", fontSize: 21 }} />
              <Typography>{t("search.summary.guests", { count: formSearch.capacity || 1 })}</Typography>
            </Stack>
            <Typography>{t("search.summary.nights", { count: nights })}</Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        <Box id="modify-search" sx={{ py: { xs: 3.5, md: 5.5 }, scrollMarginTop: 100 }}>
          <SearchBar form={formSearch} onChange={onChangeFormSearch} onSubmit={onSubmitSearch} translationPrefix="search.searchForm" />
        </Box>

        <Box component="section" aria-labelledby="search-results-heading">
          <SearchResultsHeader total={resultTotal} sort={filters.sortOrder} onSortChange={handleSort} />

          {loadingRooms ? (
            <Stack spacing={{ xs: 3, md: 4 }} aria-label={t("search.states.loading")}>
              {Array.from({ length: 3 }).map((_, index) => <SearchRoomResultSkeleton key={index} />)}
            </Stack>
          ) : roomsError ? (
            <Stack alignItems="center" sx={{ py: { xs: 7, md: 10 }, borderTop: "1px solid", borderColor: "divider", textAlign: "center" }}>
              <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: { xs: 28, md: 34 }, color: "text.primary" }}>{t("search.states.errorTitle")}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5 }}>{t("search.states.errorDescription")}</Typography>
              <Button variant="contained" onClick={() => retryRooms()} sx={{ mt: 3, minHeight: 46, borderRadius: 1 }}>{t("search.actions.retry")}</Button>
            </Stack>
          ) : rooms.length ? (
            <Stack spacing={{ xs: 3, md: 4 }}>
              {rooms.map((room) => <SearchRoomResult key={room.id} room={room} onViewRoom={onViewRoom} onBooking={onBooking} />)}
            </Stack>
          ) : (
            <Stack alignItems="center" sx={{ py: { xs: 7, md: 9 }, borderTop: "1px solid", borderColor: "divider", textAlign: "center" }}>
              <Box component="img" src={MatchNotFound} alt={t("search.states.noResultsImageAlt")} sx={{ width: 150, maxWidth: "45vw", height: "auto" }} />
              <Typography component="h2" sx={{ mt: 3, fontFamily: "Georgia, serif", fontSize: { xs: 28, md: 34 }, color: "text.primary" }}>{t("search.states.noResultsTitle")}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 520 }}>{t("search.states.noResultsDescription")}</Typography>
              <Button variant="contained" startIcon={<EditCalendarOutlinedIcon />} onClick={focusSearch} sx={{ mt: 3, minHeight: 46, borderRadius: 1 }}>{t("search.actions.modifySearch")}</Button>
            </Stack>
          )}
        </Box>
      </Container>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default SearchPage;
