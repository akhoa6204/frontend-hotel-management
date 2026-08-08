import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { GlobalSnackbar, Loading } from "@components";
import ArrivalTimeCard from "./components/ArrivalTimeCard";
import BookingInfoCard from "./components/BookingInfoCard";
import ReservationSummary from "./components/ReservationSummary";
import ReservationSummarySkeleton from "./components/ReservationSummarySkeleton";
import RulesCard from "./components/RulesCard";
import useBooking from "./useBooking";

const BookingPage = () => {
  const {
    room,
    bookingForm,
    onChangeField,
    errors,
    alert,
    closeSnackbar,
    pricing,
    loadingRoomDetail,
    loadingCreateBooking,
    loadingQuote,
    onSubmit,
  } = useBooking();

  return (
    <Box component="main" sx={{ bgcolor: "#f8f7f3", minHeight: "70vh" }}>
      <Box>
        <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 5 }, pb: { xs: 8, md: 12 } }}>
          <Typography sx={{ color: "primary.main", letterSpacing: 2, fontSize: 11, fontWeight: 750 }}>
            HOÀN TẤT ĐẶT PHÒNG
          </Typography>
          <Typography component="h1" sx={{ mt: 1.25, fontFamily: "Georgia, serif", fontSize: { xs: 34, sm: 40, md: 46 }, lineHeight: 1.15, color: "#183746" }}>
            Xác nhận kỳ nghỉ của bạn.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 620, lineHeight: 1.75 }}>
            Kiểm tra thông tin phòng và điền thông tin liên hệ để tiếp tục đến bước thanh toán.
          </Typography>

          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: { xs: 4, md: 5.5 } }}>
            <Grid container spacing={{ xs: 4, md: 5, lg: 7 }} alignItems="flex-start">
              <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
                <Stack divider={<Divider flexItem sx={{ borderColor: "#dedbd4" }} />} spacing={{ xs: 4, md: 5 }}>
                  <BookingInfoCard value={bookingForm} onChange={onChangeField} errors={errors} />
                  <ArrivalTimeCard value={bookingForm.estimatedArrivalTime} onChange={onChangeField} checkInDate={bookingForm.checkInDate} />
                  <RulesCard />
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
                {loadingRoomDetail || !room ? (
                  <ReservationSummarySkeleton />
                ) : (
                  <ReservationSummary
                    room={room}
                    checkIn={bookingForm.checkInDate}
                    checkOut={bookingForm.checkOutDate}
                    pricing={pricing}
                    loadingPricing={loadingQuote}
                    submitting={loadingCreateBooking}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {loadingCreateBooking && <Loading content="Đang tạo đặt phòng..." />}
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default BookingPage;
