import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props {
  finalTotal: number;
  depositAmount: number;
  remainingBalance: number;
  loading: boolean;
  onPayment: () => void;
}

const PaymentDetails = ({ finalTotal, depositAmount, remainingBalance, loading, onPayment }: Props) => {
  const { t } = useTranslation("client");
  return (
  <Box component="section" aria-labelledby="payment-today-title">
    <Typography sx={{ color: "primary.main", letterSpacing: 1.8, fontSize: 11, fontWeight: 750 }}>
      {t("payment.details.eyebrow")}
    </Typography>
    <Typography
      id="payment-today-title"
      component="h2"
      sx={{ mt: 1, fontSize: { xs: 36, sm: 42, md: 48 }, lineHeight: 1.1, fontWeight: 750, color: "text.primary" }}
    >
      {fmtVND(depositAmount)} VND
    </Typography>
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: "text.secondary" }}>
      <AccountBalanceOutlinedIcon sx={{ color: "primary.main", fontSize: 21 }} />
      <Typography>{t("payment.details.depositForBooking")}</Typography>
    </Stack>

    <Divider sx={{ my: { xs: 4, md: 5 } }} />

    <Typography component="h3" sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 700, color: "text.primary" }}>
      {t("payment.details.summaryTitle")}
    </Typography>
    <Stack spacing={1.75} sx={{ mt: 2.5, maxWidth: 620 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography color="text.secondary">{t("payment.details.totalStay")}</Typography>
        <Typography fontWeight={650}>{fmtVND(finalTotal)} VND</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography color="text.secondary">{t("payment.details.payToday")}</Typography>
        <Typography fontWeight={700} color="text.primary">{fmtVND(depositAmount)} VND</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography color="text.secondary">{t("payment.details.remaining")}</Typography>
        <Typography fontWeight={650}>{fmtVND(remainingBalance)} VND</Typography>
      </Stack>
    </Stack>

    <Divider sx={{ my: { xs: 4, md: 5 } }} />

    <Box component="section" aria-labelledby="deposit-policy-title">
      <Stack direction="row" spacing={1.25} alignItems="center">
        <InfoOutlinedIcon sx={{ color: "#a36b18", fontSize: 21 }} />
        <Typography id="deposit-policy-title" component="h3" sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 700, color: "text.primary" }}>
          {t("payment.details.depositTerms")}
        </Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 1.75, maxWidth: 650, lineHeight: 1.75 }}>
        {t("payment.details.depositDescription", { amount: fmtVND(depositAmount) })}
      </Typography>
      <Box component="ul" sx={{ m: 0, mt: 2, pl: 2.5, color: "text.secondary", "& li": { pl: 0.75, mb: 1 } }}>
        <li><Typography variant="body2" sx={{ lineHeight: 1.7 }}>{t("payment.details.cancelWindow")}</Typography></li>
        <li><Typography variant="body2" sx={{ lineHeight: 1.7 }}>{t("payment.details.refundPolicy")}</Typography></li>
        <li><Typography variant="body2" sx={{ lineHeight: 1.7 }}>{t("payment.details.noShowPolicy", { amount: fmtVND(depositAmount) })}</Typography></li>
      </Box>
    </Box>

    <Button
      variant="contained"
      onClick={onPayment}
      disabled={loading || finalTotal <= 0}
      endIcon={<ArrowForwardRoundedIcon />}
      sx={{ mt: { xs: 4, md: 5 }, minHeight: 52, px: 3.5, borderRadius: 1.25, fontWeight: 700, width: { xs: 1, sm: "auto" } }}
    >
      {loading ? t("payment.loading.initializing") : t("payment.actions.payAmount", { amount: fmtVND(depositAmount) })}
    </Button>
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5, maxWidth: 520, lineHeight: 1.6 }}>
      {t("payment.details.qrUpdateNote")}
    </Typography>
  </Box>
  );
};

export default PaymentDetails;
