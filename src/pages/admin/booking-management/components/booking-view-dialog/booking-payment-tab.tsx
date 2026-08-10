import { useBookingManagementContext } from "@context/booking-management";
import type { PaymentMethod } from "@enums/PaymentMethod";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
  List,
  ListItem,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { fmtVND, formatDate } from "@utils/format";
import { useTranslation } from "react-i18next";

function Row({
  label,
  value,
  color,
  fontWeight,
}: {
  label: string;
  value: number;
  color?: string;
  fontWeight?: number;
}) {
  const { t } = useTranslation("bookings");
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography color={color} fontWeight={fontWeight}>
        {fmtVND(value)}{t("currency.symbol")}
      </Typography>
    </Box>
  );
}

const paymentStatusStyle = (status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED", expired: boolean) => {
  if (expired || status === "FAILED") return { background: "#FDECEC", color: "#A43B3B" };
  if (status === "SUCCESS") return { background: "#EAF6F0", color: "#246548" };
  if (status === "REFUNDED") return { background: "#F2F4F7", color: "#475467" };
  return { background: "#FFF5E5", color: "#9A6518" };
};

export default function BookingPaymentTab() {
  const { t } = useTranslation("bookings");
  const {
    loadingInvoiceDetail,
    invoiceSummary,
    invoiceDetail,
    handleCreateQr,
    formViewBooking,
    onSubmitFormViewBooking,
    onChangeFormViewBooking,
    disablePay,
  } = useBookingManagementContext();
  const now = new Date();
  return (
    <>
      {loadingInvoiceDetail || !invoiceSummary ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          minHeight={300}
          spacing={2}
        >
          <CircularProgress size={28} />
          <Typography variant="body2">
            {t("detail.loadingPayment")}
          </Typography>
        </Stack>
      ) : (
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "minmax(0, 1.7fr) minmax(290px, 1fr)" }} gap={2.5}>
          {/* Payment history */}
          <Box>
            <Typography fontSize={15} fontWeight={650} mb={1}>
              {t("detail.paymentHistory")}
            </Typography>

            <List className="admin-scrollbar" disablePadding sx={{ maxHeight: 420, overflowY: "auto", borderTop: "1px solid #E4E7EC" }}>
              {invoiceDetail?.payments?.length ? invoiceDetail.payments.map((p) => {
                const expired = new Date(p.expiredAt) < now && p.status === "PENDING";
                const statusStyle = paymentStatusStyle(p.status, expired);
                return (
                <ListItem
                  key={p.id}
                  divider
                  sx={{
                    px: 0,
                    py: 1.4,
                    "&:hover": {
                      bgcolor: "#F9FAFB",
                    },
                  }}
                  onClick={
                    new Date(p.expiredAt) > now && p.status == "PENDING"
                      ? () => handleCreateQr(p.id)
                      : () => {}
                  }
                >
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* Left */}
                    <Box>
                      <Typography fontWeight={600}>
                        {t(`paymentMethods.${p.method}`)}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {t(`paymentTypes.${p.type}`)}{" "}
                        {p.paidAt &&
                          `• ${formatDate(p.paidAt, { withTime: true, withWeekday: true })}`}
                      </Typography>
                    </Box>

                    {/* Right */}
                    <Box textAlign="right">
                      <Typography fontWeight={700} fontSize={15}>
                        {fmtVND(p.amount)}{t("currency.symbol")}
                      </Typography>

                      <Box
                        sx={{
                          mt: 0.5,
                          px: 1.2,
                          py: 0.3,
                          borderRadius: 1,
                          fontSize: 12,
                          fontWeight: 600,
                          display: "inline-block",
                          bgcolor: statusStyle.background,
                          color: statusStyle.color,
                        }}
                      >
                        {expired
                          ? t("detail.overdue")
                          : t(`paymentStatus.${p.status}`)}
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              );}) : <Box py={5} textAlign="center"><Typography fontWeight={600}>{t("detail.noTransactions")}</Typography><Typography variant="body2" color="text.secondary">{t("detail.noTransactionsHint")}</Typography></Box>}
            </List>
          </Box>

          {/* Payment summary */}
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: "#F9FAFB", borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none", alignSelf: "start" }}
            component={"form"}
            onSubmit={onSubmitFormViewBooking}
          >
            <Typography fontWeight={600} mb={2}>
              {t("detail.paymentSummary")}
            </Typography>

            <Stack spacing={1}>
              <Row label={t("detail.roomCharge")} value={invoiceSummary.roomAmount} />
              <Row label={t("detail.serviceCharge")} value={invoiceSummary.serviceAmount} />

              <Divider sx={{ my: 1 }} />

              <Row label={t("detail.subtotal")} value={invoiceSummary.subtotal} />

              <Row
                label={t("detail.discount")}
                value={-invoiceSummary.discount}
                color="error.main"
              />

              <Row label={t("detail.tax")} value={invoiceSummary.tax} />

              <Divider sx={{ my: 1 }} />

              <Row
                label={t("detail.total")}
                value={invoiceSummary.total}
                fontWeight={700}
              />

              <Row
                label={t("detail.paid")}
                value={invoiceSummary.paid}
                color="success.main"
              />

              <Row
                label={t("detail.remaining")}
                value={invoiceSummary.remain}
                color={invoiceSummary.remain > 0 ? "warning.main" : "text.primary"}
                fontWeight={700}
              />
            </Stack>

            <Box mt={1}>
              <Typography variant="body2" mb={0.5}>
                {t("detail.paymentMethod")}
              </Typography>

              <TextField
                select
                size="small"
                value={formViewBooking.method}
                onChange={(e) =>
                  onChangeFormViewBooking(
                    "method",
                    e.target.value as PaymentMethod,
                  )
                }
                fullWidth
              >
                <MenuItem value={"CASH"}>{t("paymentMethods.CASH")}</MenuItem>
                <MenuItem value={"BANK_TRANSFER"}>{t("paymentMethods.BANK_TRANSFER")}</MenuItem>
              </TextField>
            </Box>
            <Button
              fullWidth
              variant="contained"
              disabled={disablePay}
              sx={{
                mt: 1,
                bgcolor: "#2E90FA",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#1D6FC2" },
              }}
              type="submit"
            >
              {t("detail.pay")}
            </Button>
          </Paper>
        </Box>
      )}
    </>
  );
}
