import { GlobalSnackbar, Loading } from "@components";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PaymentDetails from "./components/PaymentDetails";
import PaymentQrDialog from "./components/PaymentQrDialog";
import PaymentReservationSummary from "./components/PaymentReservationSummary";
import usePayment from "./usePayment";

const PaymentPage = () => {
  const { t } = useTranslation("client");
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
    return <Loading content={t("payment.loading.paymentInfo")} />;
  }

  return (
    <>
      <Box component="main" sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "72vh", py: { xs: 5, sm: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760 }}>
            <Typography sx={{ color: "primary.main", letterSpacing: 2, fontSize: 11, fontWeight: 750 }}>
              {t("payment.hero.eyebrow")}
            </Typography>
            <Typography
              component="h1"
              sx={{ mt: 1.25, fontFamily: "Georgia, serif", fontSize: { xs: 38, sm: 48, md: 56 }, lineHeight: 1.08, fontWeight: 400 }}
            >
              {t("payment.hero.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 660, fontSize: { xs: 15, sm: 17 }, lineHeight: 1.7 }}>
              {t("payment.hero.description")}
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

      {loadingPayment && <Loading content={t("payment.loading.initializing")} />}
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />

      <Dialog open={showNotice.open} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2, p: 1 } }}>
        <DialogContent>
          <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: 28, color: "text.primary", textAlign: "center" }}>
            {t(showNotice.type === "success" ? "payment.notice.successTitle" : "payment.notice.pendingTitle")}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7, textAlign: "center" }}>
            {showNotice.type === "success"
              ? t("payment.notice.successDescription")
              : t("payment.notice.pendingDescription")}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="contained" fullWidth onClick={backToHome} sx={{ minHeight: 48, borderRadius: 1.25 }}>
            {t(showNotice.type === "success" ? "payment.actions.viewBooking" : "payment.actions.back")}
          </Button>
        </DialogActions>
      </Dialog>

      <PaymentQrDialog qrState={qrState} closePaymentDialog={closePaymentDialog} isPendingCreateQr={isPendingCreateQr} />
    </>
  );
};

export default PaymentPage;
