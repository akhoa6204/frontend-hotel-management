import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import StatCard from "./components/StatCard";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import PagedSection from "./components/PagedSection";
import BookingItemCard from "./components/BookingItemCard";
import useFrontDesk from "./useFrontDesk";
import { useTranslation } from "react-i18next";

const FrontDesk = () => {
  const { t } = useTranslation("receptionist");
  const {
    summary,
    loadingSummary,
    summaryError,
    checkins,
    loadingCheckins,
    checkinsError,
    checkinsMeta,
    handleChangeCheckinPage,
    checkouts,
    loadingCheckouts,
    checkoutsError,
    checkoutsMeta,
    handleChangeCheckoutPage,
    handleCheckin,
    handleCheckout,
    retry,
  } = useFrontDesk();

  const hasError = summaryError || checkinsError || checkoutsError;

  return (
    <Box component="main" sx={{ color: "#1F2937" }}>
      <Box component="header" sx={{ mb: 2 }}>
        <Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 27, md: 30 }, lineHeight: 1.2, fontWeight: 700 }}>
          {t("title")}
        </Typography>
        <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>
          {t("subtitle")}
        </Typography>
      </Box>

      {hasError && (
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => void retry()}>{t("actions.retry")}</Button>} sx={{ mb: 2, border: "1px solid #F4C7C7", borderRadius: "9px", boxShadow: "none" }}>
          {t("states.loadError")}
        </Alert>
      )}

      <Grid container spacing={1.75}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              label={t("todayBookings")}
              value={summaryError ? "—" : summary?.todayBookings ?? 0}
              loading={loadingSummary}
              icon={<CalendarMonthOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              label={t("availableRooms")}
              value={summaryError ? "—" : `${summary?.availableRooms ?? 0}/${
                summary?.totalRooms ?? 0
              }`}
              loading={loadingSummary}
              icon={<BedOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              label={t("cleanRooms")}
              value={summaryError ? "—" : `${summary?.totalCleanRooms ?? 0}/${
                summary?.totalRooms ?? 0
              }`}
              loading={loadingSummary}
              icon={<CleaningServicesOutlinedIcon />}
            />
          </Grid>
      </Grid>

      <Box component="section" aria-labelledby="front-desk-operations" sx={{ mt: 3 }}>
        <Typography id="front-desk-operations" component="h2" sx={{ color: "#163B47", fontSize: 19, fontWeight: 650 }}>
          {t("activity.title")}
        </Typography>
        <Typography sx={{ mt: 0.25, mb: 1.5, color: "#667085", fontSize: 13 }}>
          {t("activity.subtitle")}
        </Typography>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6 }}>
            <PagedSection
              title={t("activity.checkInsTitle")}
              items={checkins}
              meta={checkinsMeta}
              loading={loadingCheckins}
              emptyText={t("activity.noCheckIns")}
              onChangePage={handleChangeCheckinPage}
              renderItem={(b) => (
                <BookingItemCard
                  booking={b}
                  operationContext="CHECK_IN"
                  handleOnClick={() => handleCheckin(b.id)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <PagedSection
              title={t("activity.checkOutsTitle")}
              items={checkouts}
              meta={checkoutsMeta}
              loading={loadingCheckouts}
              emptyText={t("activity.noCheckOuts")}
              onChangePage={handleChangeCheckoutPage}
              renderItem={(b) => (
                <BookingItemCard
                  booking={b}
                  operationContext="CHECK_OUT"
                  handleOnClick={() => handleCheckout(b.id)}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FrontDesk;
