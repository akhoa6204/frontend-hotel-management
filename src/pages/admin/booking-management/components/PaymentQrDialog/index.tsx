import { Close, DoneRounded } from "@mui/icons-material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useBookingManagementContext } from "@context/booking-management";
import { useTranslation } from "react-i18next";

export default function PaymentQrDialog() {
  const { t } = useTranslation(["bookings", "common"]);
  const {
    qrState,
    closePaymentDialog,
    isPendingCreateQr,
    isPendingMarkPaymentAsPaid,
    handleMarkPaymentAsPaid,
  } = useBookingManagementContext();

  const confirmPayment = async () => {
    if (!qrState.onlinePaymentId || isPendingMarkPaymentAsPaid) return;

    await handleMarkPaymentAsPaid(qrState.onlinePaymentId);
    closePaymentDialog();
  };

  return (
    <Dialog
      open={qrState.open}
      onClose={isPendingMarkPaymentAsPaid ? undefined : closePaymentDialog}
      maxWidth={false}
      fullWidth
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(16, 24, 40, 0.32)" },
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: "calc(100vw - 24px)", sm: 470 },
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100dvh - 32px)",
          m: 0,
          bgcolor: "#FFFFFF",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 16px 40px rgba(16, 24, 40, 0.18)",
        },
      }}
    >
      <DialogTitle sx={{ px: { xs: 2, sm: 2.5 }, py: 2, borderBottom: "1px solid #E4E7EC", mb: 2 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
          <Box>
            <Typography component="h2" sx={{ color: "#1F2937", fontSize: { xs: 18, sm: 19 }, lineHeight: 1.35, fontWeight: 700 }}>
              {t(qrState.paid ? "qrDialog.successTitle" : "qrDialog.title", { ns: "bookings" })}
            </Typography>
            <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 12.5, lineHeight: 1.5 }}>
              {qrState.paid
                ? t("qrDialog.successDescription", { ns: "bookings" })
                : t("qrDialog.description", { ns: "bookings" })}
            </Typography>
          </Box>
          <IconButton
            aria-label={t("actions.close", { ns: "common" })}
            size="small"
            disabled={isPendingMarkPaymentAsPaid}
            onClick={closePaymentDialog}
            sx={{ width: 34, height: 34, flexShrink: 0, color: "#667085" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent className="admin-scrollbar" sx={{ overflowY: "auto", px: { xs: 2, sm: 2.5 }, py: 2 }}>
        {qrState.paid ? (
          <Stack alignItems="center" spacing={1.25} sx={{ py: 2 }}>
            <CheckCircleOutlineRoundedIcon sx={{ fontSize: 56, color: "success.main" }} />
            <Typography sx={{ color: "success.main", fontSize: 16, fontWeight: 700 }}>
              {t("qrDialog.confirmed", { ns: "bookings" })}
            </Typography>
          </Stack>
        ) : isPendingCreateQr ? (
          <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 250 }}>
            <CircularProgress size={28} />
            <Typography sx={{ color: "#667085", fontSize: 13 }}>
              {t("qrDialog.creating", { ns: "bookings" })}
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: { xs: "min(220px, 70vw)", sm: 224 }, aspectRatio: "1 / 1", p: 1, bgcolor: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: "10px" }}>
                <Box component="img" src={qrState.qrUrl} alt={t("qrDialog.imageAlt", { ns: "bookings" })} sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>
            </Box>

            <Box sx={{ px: 1.5, py: 1.25, bgcolor: "#F9FAFB", border: "1px solid #E4E7EC", borderRadius: "8px" }}>
              <Typography sx={{ color: "#667085", fontSize: 12, fontWeight: 500 }}>
                {t("qrDialog.transferContent", { ns: "bookings" })}
              </Typography>
              <Typography sx={{ mt: 0.35, color: "#1F2937", fontSize: 16, lineHeight: 1.4, fontWeight: 700 }}>
                DH{qrState.onlinePaymentId}
              </Typography>
            </Box>

            <Typography sx={{ color: "#667085", fontSize: 12.5, lineHeight: 1.55 }}>
              {t("qrDialog.instructions", { ns: "bookings" })}
            </Typography>
          </Stack>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: "stretch",
          justifyContent: "flex-end",
          gap: 1,
          px: { xs: 2, sm: 2.5 },
          py: 1.75,
          borderTop: "1px solid #E4E7EC",
          "& > :not(style) ~ :not(style)": { ml: 0 },
        }}
      >
        <Button
          onClick={closePaymentDialog}
          variant="outlined"
          disabled={isPendingMarkPaymentAsPaid}
          sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054", "&:hover": { borderColor: "#98A2B3", bgcolor: "#F9FAFB" } }}
        >
          {t("actions.close", { ns: "common" })}
        </Button>

        {!qrState.paid && !isPendingCreateQr && (
          <Button
            onClick={confirmPayment}
            variant="contained"
            disabled={!qrState.onlinePaymentId || isPendingMarkPaymentAsPaid}
            startIcon={isPendingMarkPaymentAsPaid ? <CircularProgress size={16} color="inherit" /> : <DoneRounded />}
            sx={{ minHeight: 40, borderRadius: "8px", bgcolor: "#2E90FA", "&:hover": { bgcolor: "#1D6FC2" } }}
          >
            {t(isPendingMarkPaymentAsPaid ? "qrDialog.confirming" : "qrDialog.markSuccessful", { ns: "bookings" })}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
