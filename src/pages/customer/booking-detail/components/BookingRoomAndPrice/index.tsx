import type { BookingResponse } from "@constant/response/BookingResponse";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props { booking: BookingResponse }

const MoneyRow = ({ label, value, accent }: { label: string; value: number; accent?: boolean }) => (
  <Stack direction="row" justifyContent="space-between" spacing={2}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography color={accent ? "success.main" : "text.primary"} fontWeight={500} textAlign="right">
      {accent ? "−" : ""}{fmtVND(value)} VND
    </Typography>
  </Stack>
);

const BookingRoomAndPrice = ({ booking }: Props) => {
  const { t } = useTranslation("client");
  const roomAmount = Number(booking.roomAmount ?? 0);
  const discount = Number(booking.roomDiscountAmount ?? 0);
  const total = Number(booking.finalAmount ?? booking.roomFinalAmount ?? Math.max(0, roomAmount - discount));
  const paid = Number(booking.roomPaymentPaidAmount ?? booking.depositPaidAmount ?? 0);
  const remaining = Number(booking.remainingAmount ?? Math.max(0, total - paid));

  return (
    <Box component="aside" aria-label={t("bookingDetail.payment.title")} sx={{ bgcolor: "rgba(239, 234, 224, 0.56)", p: { xs: 2.5, sm: 3, xl: 3.5 }, alignSelf: "stretch", minWidth: 0 }}>
      <Typography component="h2" sx={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "text.primary", fontSize: 25, mb: 3 }}>{t("bookingDetail.payment.title")}</Typography>
      <Stack spacing={1.6}>
        <MoneyRow label={t("bookingDetail.payment.roomAmount")} value={roomAmount} />
        {discount > 0 && <MoneyRow label={booking.promotionCode ? t("bookingDetail.payment.discountWithCode", { code: booking.promotionCode }) : t("bookingDetail.payment.discount")} value={discount} accent />}
        <Divider sx={{ my: .5 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
          <Typography fontWeight={650}>{t("bookingDetail.payment.total")}</Typography>
          <Typography sx={{ color: "text.primary", fontSize: 20, fontWeight: 700, textAlign: "right" }}>{fmtVND(total)} VND</Typography>
        </Stack>
        {(booking.depositPaidAmount !== undefined || booking.roomPaymentPaidAmount !== undefined) && <MoneyRow label={t("bookingDetail.payment.paid")} value={paid} />}
        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pt: 1.5 }}>
          <Typography fontWeight={650}>{t("bookingDetail.payment.remaining")}</Typography>
          <Typography fontWeight={remaining > 0 ? 700 : 500} color={remaining > 0 ? "text.primary" : "text.secondary"} textAlign="right">{fmtVND(remaining)} VND</Typography>
        </Stack>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2, lineHeight: 1.6 }}>
        {t("bookingDetail.payment.note")}
      </Typography>
    </Box>
  );
};

export default BookingRoomAndPrice;
