import { BookingStepper, GlobalSnackbar, Loading } from "@components";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import DepositNoticeCard from "./components/DepositNoticeCard";
import PaymentSummarySkeleton from "./components/PaymentSummarySkeleton";
import PaymentSummaryCard from "./components/PaymentSummaryCard";
import BookingSummaryCardSkeleton from "./components/BookingSummaryCardSkeleton";
import BookingSummaryCard from "./components/BookingSummaryCard";
import usePayment from "./usePayment";
import PaymentQrDialog from "./components/PaymentQrDialog";

const PaymentPage = () => {
  const {
    booking,

    onPayment,
    loadingPayment,

    alert,
    closeSnackbar,

    showNotice,
    backToHome,

    qrState,
    closePaymentDialog,

    isPendingCreateQr,
  } = usePayment();
  return (
    <>
      <Container>
        <BookingStepper activeStep={3} />
      </Container>

      <Container sx={{ mt: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <DepositNoticeCard />
            {!booking.finalAmount ? (
              <PaymentSummarySkeleton />
            ) : (
              <Stack spacing={2.5}>
                <PaymentSummaryCard total={booking.finalAmount} />
              </Stack>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2.5}>
              <BookingSummaryCard
                roomName={booking.room.roomType.name}
                checkIn={booking.checkInDate}
                checkOut={booking.checkOutDate}
                capacity={booking.room.roomType.capacity}
                guestName={booking.guestName}
                guestPhone={booking.guestPhone}
                guestEmail={booking.guestEmail}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: 1.5 }}
                onClick={onPayment}
                disabled={loadingPayment}
              >
                <Typography>Tiến hành thanh toán</Typography>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {loadingPayment && <Loading content="Đang tạo thanh toán..." />}

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />

      {showNotice.open && (
        <Stack
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0,0.5)"
          zIndex={2000}
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            bgcolor="white"
            p={4}
            borderRadius={2}
            spacing={2}
            alignItems="center"
            maxWidth={400}
            width="90%"
          >
            <Typography variant="h6" fontWeight={600} textAlign="center">
              {showNotice.type === "success"
                ? "Thanh toán thành công 🎉"
                : "Thanh toán thất bại"}
            </Typography>

            <Typography variant="body2" textAlign="center">
              {showNotice.type === "success"
                ? "Đặt phòng của bạn đã được xác nhận. Chúng tôi đã gửi thông tin chi tiết đến email của bạn."
                : "Thanh toán chưa hoàn tất. Vui lòng thử lại hoặc quay về trang chủ để tiếp tục."}
            </Typography>

            <Button variant="contained" fullWidth onClick={backToHome}>
              {showNotice.type === "success" ? "Về trang chủ" : "Quay lại"}
            </Button>
          </Stack>
        </Stack>
      )}

      <PaymentQrDialog
        qrState={qrState}
        closePaymentDialog={closePaymentDialog}
        isPendingCreateQr={isPendingCreateQr}
      />
    </>
  );
};
export default PaymentPage;
