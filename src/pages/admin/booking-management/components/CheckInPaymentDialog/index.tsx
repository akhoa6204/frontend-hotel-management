import type { Booking, PaymentMethod } from "@constant/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  booking: Booking;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (value: PaymentMethod) => void;
  onConfirm?: () => void;
  loading?: boolean;
};

const CheckInPaymentDialog: React.FC<Props> = ({
  open,
  onClose,
  booking,
  paymentMethod,
  onPaymentMethodChange,
  onConfirm,
  loading,
}) => {
  const { t } = useTranslation(["bookings", "common"]);
  const nights = useMemo(() => {
    const a = dayjs(booking.checkIn);
    const b = dayjs(booking.checkOut);
    const d = b.diff(a, "day");
    return Math.max(1, Number.isFinite(d) ? d : 1);
  }, [booking.checkIn, booking.checkOut]);

  const unitPrice = booking.room.roomType?.basePrice || 0;
  const totalBefore = booking.baseAmount;
  const discount = booking.discountAmount || 0;
  const totalAfter = Number(totalBefore) - Number(discount);
  const deposit = booking?.totalPaid || 0;
  const remaining = Math.max(0, totalAfter - deposit);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("checkInDialog.title", { ns: "bookings" })}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <Paper variant="outlined" sx={{ py: 2, px: 1.5, borderRadius: 2 }}>
            <Typography fontWeight={600} pb={1.5}>
              {t("checkInDialog.bookingInformation", { ns: "bookings" })}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography>{t("checkInDialog.customer", { ns: "bookings" })}: {booking.fullName}</Typography>
                <Typography>{t("detail.email", { ns: "bookings" })}: {booking.email || "-"}</Typography>
                <Typography>{t("detail.phone", { ns: "bookings" })}: {booking.phone || "-"}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography>
                  {t("columns.room", { ns: "bookings" })}: {booking.room?.name} - {booking.room.roomType?.name}
                </Typography>
                <Typography>
                  {t("detail.checkIn", { ns: "bookings" })}: {dayjs(booking.checkIn).format("DD/M/YYYY")}
                </Typography>
                <Typography>
                  {t("detail.checkOut", { ns: "bookings" })}: {dayjs(booking.checkOut).format("DD/M/YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper variant="outlined" sx={{ py: 2, px: 1.5, borderRadius: 2 }}>
            <Typography fontWeight={600} pb={1.5}>
              {t("checkInDialog.paymentInformation", { ns: "bookings" })}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <InputLabel shrink>{t("detail.paymentMethod", { ns: "bookings" })}</InputLabel>
                <Select
                  value={paymentMethod}
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    onPaymentMethodChange(e.target.value as PaymentMethod)
                  }
                >
                  <MenuItem value="CASH">{t("paymentMethods.CASH", { ns: "bookings" })}</MenuItem>
                  <MenuItem value="CARD">{t("paymentMethods.ONLINE", { ns: "bookings" })}</MenuItem>
                </Select>
              </Grid>

              <Grid size={6} container>
                <Grid size={6}>
                  <Typography>{t("createDialog.unitPrice", { ns: "bookings" })}</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography>{t("currency.perNight", { ns: "bookings", value: unitPrice.toLocaleString() })}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>{t("detail.nights", { ns: "bookings" })}:</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography>{nights}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>{t("detail.subtotal", { ns: "bookings" })}:</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography>{t("currency.amount", { ns: "bookings", value: totalBefore.toLocaleString() })}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>{t("detail.discount", { ns: "bookings" })}:</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography>−{t("currency.amount", { ns: "bookings", value: discount.toLocaleString() })}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>{t("detail.total", { ns: "bookings" })}:</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography>{t("currency.amount", { ns: "bookings", value: totalAfter.toLocaleString() })}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>{t("detail.paid", { ns: "bookings" })}:</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography>{t("currency.amount", { ns: "bookings", value: deposit.toLocaleString() })}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography fontWeight={700}>{t("detail.remaining", { ns: "bookings" })}:</Typography>
                </Grid>
                <Grid size={6} textAlign="right">
                  <Typography fontWeight={700}>
                    {t("currency.amount", { ns: "bookings", value: remaining.toLocaleString() })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t("actions.cancel", { ns: "common" })}
        </Button>
        <Button variant="contained" onClick={onConfirm} disabled={loading}>
          {t("checkInDialog.confirmPayment", { ns: "bookings" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckInPaymentDialog;
