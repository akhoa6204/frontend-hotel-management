import { GlobalSnackbar, Loading } from "@components";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import PaymentDetails from "./components/PaymentDetails";
import PaymentQrDialog from "./components/PaymentQrDialog";
import PaymentReservationSummary from "./components/PaymentReservationSummary";
import usePayment from "./usePayment";

const PaymentPage = () => {
  const {
    booking,
    depositAmount,
    finalTotal,
    remainingBalance,
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

  if (!booking) {
    return <Loading content="Đang tải thông tin thanh toán..." />;
  }

  return (
    <>
      <Box component="main" sx={{ bgcolor: "#f7f5f0", color: "#183746", minHeight: "72vh", py: { xs: 5, sm: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760 }}>
            <Typography sx={{ color: "primary.main", letterSpacing: 2, fontSize: 11, fontWeight: 750 }}>
              THANH TOÁN ĐẶT PHÒNG
            </Typography>
            <Typography
              component="h1"
              sx={{ mt: 1.25, fontFamily: "Georgia, serif", fontSize: { xs: 38, sm: 48, md: 56 }, lineHeight: 1.08, fontWeight: 400 }}
            >
              Hoàn tất khoản cọc cho kỳ nghỉ của bạn.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 660, fontSize: { xs: 15, sm: 17 }, lineHeight: 1.7 }}>
              Kiểm tra lại thông tin kỳ nghỉ và thanh toán khoản cọc để giữ phòng. Trạng thái sẽ được cập nhật sau khi hệ thống xác nhận giao dịch.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 7fr) minmax(340px, 5fr)" },
              gap: { xs: 5, md: 6, lg: 8 },
              alignItems: "start",
              mt: { xs: 5, md: 7 },
            }}
          >
            <Box sx={{ order: { xs: 2, md: 1 }, minWidth: 0 }}>
              <PaymentDetails
                finalTotal={finalTotal}
                depositAmount={depositAmount}
                remainingBalance={remainingBalance}
                loading={loadingPayment}
                onPayment={onPayment}
              />
            </Box>
            <Box sx={{ order: { xs: 1, md: 2 }, minWidth: 0 }}>
              <PaymentReservationSummary booking={booking} finalTotal={finalTotal} />
            </Box>
          </Box>
        </Container>
      </Box>

      {loadingPayment && <Loading content="Đang khởi tạo thanh toán..." />}
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />

      <Dialog open={showNotice.open} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2, p: 1 } }}>
        <DialogContent>
          <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#183746", textAlign: "center" }}>
            {showNotice.type === "success" ? "Thanh toán thành công" : "Thanh toán chưa hoàn tất"}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7, textAlign: "center" }}>
            {showNotice.type === "success"
              ? "Hệ thống đã xác nhận giao dịch và cập nhật trạng thái thanh toán cho đặt phòng của bạn."
              : "Giao dịch chưa được xác nhận. Vui lòng thử lại hoặc quay về để tiếp tục sau."}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="contained" fullWidth onClick={backToHome} sx={{ minHeight: 48, borderRadius: 1.25 }}>
            {showNotice.type === "success" ? "Xem đặt phòng" : "Quay lại"}
          </Button>
        </DialogActions>
      </Dialog>

      <PaymentQrDialog qrState={qrState} closePaymentDialog={closePaymentDialog} isPendingCreateQr={isPendingCreateQr} />
    </>
  );
};

export default PaymentPage;
