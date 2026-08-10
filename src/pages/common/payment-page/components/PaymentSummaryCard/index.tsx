import { Box, Paper, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";
import { useTranslation } from "react-i18next";

const PaymentSummaryCard = ({ total }: { total: number }) => {
  const { t } = useTranslation("client");
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ py: 2, px: 2.5, bgcolor: "#2E90FA0d" }}
      >
        {t("payment.legacy.payment")}
      </Typography>
      <Box sx={{ py: 2, px: 2.5 }}>
        {/* Hàng tổng cộng */}
        <Stack direction="row" justifyContent="space-between" mb={1.25}>
          <Typography>{t("payment.legacy.total")}</Typography>
          <Typography>{fmtVND(total)} VND</Typography>
        </Stack>

        {/* Hàng thanh toán hôm nay */}
        <Stack direction="row" justifyContent="space-between" mb={0.75}>
          <Box>
            <Typography fontWeight={600}>{t("payment.details.payToday")}</Typography>
          </Box>
          <Typography fontWeight={600}>{fmtVND(150000)} VND</Typography>
        </Stack>

        {/* Hàng thanh toán khi nhận phòng */}
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography fontWeight={600}>{t("payment.legacy.payAtHotel")}</Typography>
          </Box>
          <Typography fontWeight={600}>{fmtVND(total - 150000)} VND</Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PaymentSummaryCard;
