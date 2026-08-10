import { Box, Paper, Stack, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PriceSummaryProps {
  originalPrice: number;
  discount: number;
  discountLabel?: string;
  discountNote?: string;
}

const formatVND = (n: number) => n.toLocaleString("vi-VN") + " VND";

const PriceSummaryCard: React.FC<PriceSummaryProps> = ({
  originalPrice,
  discount,
  discountLabel,
  discountNote,
}) => {
  const { t } = useTranslation("client");
  const finalPrice = originalPrice - discount;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E0E0E0",
        mb: 2.5,
      }}
    >
      <Box py={3.5} px={2.5}>
        {/* Title */}
        <Typography variant="h6" fontWeight={700} mb={2}>
          {t("payment.legacy.priceSummary")}
        </Typography>

        {/* Giá gốc */}
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography>{t("payment.legacy.originalPrice")}</Typography>
          <Typography>{formatVND(originalPrice)}</Typography>
        </Stack>

        {/* Discount */}
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography>{discountLabel ?? t("payment.legacy.discount")}</Typography>
            <Typography variant="caption" color="text.secondary">
              {discountNote ?? t("payment.legacy.discountHint")}
            </Typography>
          </Box>
          <Typography color="error">- {formatVND(discount)}</Typography>
        </Stack>
      </Box>

      {/* Divider */}
      <Divider />

      {/* Total */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 1.5, px: 2.5, bgcolor: "#2E90FA0d" }}
      >
        <Typography fontWeight={700} color="error" sx={{ fontSize: 18 }}>
          {t("payment.legacy.total")}
        </Typography>
        <Typography fontWeight={700} color="error" sx={{ fontSize: 18 }}>
          {formatVND(finalPrice)}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default PriceSummaryCard;
