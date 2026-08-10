import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BookingItemCard from "./components/BookingItemCard";
import MonthlyBookingStatsCard from "./components/MonthlyBookingStatsCard";
import MonthlyRevenueChart from "./components/MonthlyRevenueChart";
import PagedSection from "./components/PagedSection";
import StatCard from "./components/StatCard";
import useDashboard from "./useDashboard";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const {
    summary,
    loadingSummary,
    monthlyKpis,
    loadingMonthlyKpis,
    monthlyRevenue,
    loadingMonthlyRevenue,
    monthlyBookingStats,
    loadingMonthlyBookingStats,
    checkins,
    loadingCheckins,
    checkinsMeta,
    handleChangeCheckinPage,
    checkouts,
    loadingCheckouts,
    checkoutsMeta,
    handleChangeCheckoutPage,
    handleCheckin,
    handleCheckout,
  } = useDashboard();

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

      <Grid container spacing={1.75}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label={t("todayBookings")} value={summary?.todayBookings ?? 0} delta={summary?.bookingsDeltaPct} deltaText={t("comparisons.yesterday")} loading={loadingSummary} icon={<CalendarMonthOutlinedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label={t("availableRooms")} value={`${summary?.availableRooms ?? 0}/${summary?.totalRooms ?? 0}`} delta={summary?.availableRoomsDelta} deltaText={t("comparisons.yesterday")} suffix="" loading={loadingSummary} icon={<BedOutlinedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label={t("weekRevenue")} value={summary?.weekRevenue ?? 0} delta={summary?.weekRevenueDeltaPct} deltaText={t("comparisons.previousWeek")} isMoney loading={loadingSummary} icon={<PaymentsOutlinedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label={t("newCustomers")} value={summary?.newCustomers ?? 0} delta={summary?.newCustomersDelta} deltaText={t("comparisons.previousWeek")} suffix="%" loading={loadingSummary} icon={<PersonAddAltOutlinedIcon />} />
        </Grid>
      </Grid>

      <Box component="section" aria-labelledby="today-operations-heading" sx={{ mt: 3 }}>
        <Typography id="today-operations-heading" component="h2" sx={{ color: "#163B47", fontSize: 19, fontWeight: 650 }}>
          {t("todayActivity")}
        </Typography>
        <Typography sx={{ mt: 0.25, mb: 1.5, color: "#667085", fontSize: 13 }}>
          {t("todayActivitySubtitle")}
        </Typography>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6 }}>
            <PagedSection title={t("todayCheckIns")} items={checkins} meta={checkinsMeta} loading={loadingCheckins} emptyText={t("activity.noCheckIns")} onChangePage={handleChangeCheckinPage} renderItem={(booking) => <BookingItemCard booking={booking} operationContext="CHECK_IN" handleOnClick={() => handleCheckin(booking.id)} />} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PagedSection title={t("todayCheckOuts")} items={checkouts} meta={checkoutsMeta} loading={loadingCheckouts} emptyText={t("activity.noCheckOuts")} onChangePage={handleChangeCheckoutPage} renderItem={(booking) => <BookingItemCard booking={booking} operationContext="CHECK_OUT" handleOnClick={() => handleCheckout(booking.id)} />} />
          </Grid>
        </Grid>
      </Box>

      <Box component="section" aria-labelledby="revenue-heading" sx={{ mt: 3.5 }}>
        <Typography id="revenue-heading" component="h2" sx={{ color: "#163B47", fontSize: 19, fontWeight: 650 }}>
          {t("reportsAndRevenue")}
        </Typography>
        <Typography sx={{ mt: 0.25, mb: 1.5, color: "#667085", fontSize: 13 }}>
          {t("reportsAndRevenueSubtitle")}
        </Typography>

        <Grid container spacing={1.75} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label={t("totalRevenue")} value={monthlyKpis?.totalRevenue ?? 0} delta={monthlyKpis?.totalRevenueDeltaPct ?? null} deltaText={t("comparisons.previousMonth")} isMoney loading={loadingMonthlyKpis} icon={<PaymentsOutlinedIcon />} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label={t("occupancyRate")} value={`${monthlyKpis?.occupancyPct ?? 0}%`} delta={monthlyKpis?.occupancyDeltaPct ?? null} deltaText={t("comparisons.previousMonth")} suffix="%" loading={loadingMonthlyKpis} icon={<BedOutlinedIcon />} />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper variant="outlined" sx={{ height: "100%", p: { xs: 1.5, sm: 2 }, borderRadius: "11px", borderColor: "#E4E7EC", boxShadow: "none" }}>
              <Typography component="h3" sx={{ color: "text.primary", fontSize: 17, fontWeight: 650 }}>
                {t("revenue.monthlyTitle")}
              </Typography>
              <MonthlyRevenueChart data={monthlyRevenue} loading={loadingMonthlyRevenue} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <MonthlyBookingStatsCard data={monthlyBookingStats} loading={loadingMonthlyBookingStats} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
