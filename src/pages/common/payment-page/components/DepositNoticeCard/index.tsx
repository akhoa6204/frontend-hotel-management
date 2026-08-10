// DepositNoticeCard.tsx
import { Box, Paper, Typography, Stack } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { fmtVND } from "@utils/format";
import { useTranslation } from "react-i18next";

const DepositNoticeCard = () => {
  const { t } = useTranslation("client");
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={0.75}>
        {t("payment.legacy.depositNoticeTitle")}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={1.5}>
        {t("payment.legacy.depositNoticeDescription", { amount: fmtVND(150000) })}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1.25} mb={1}>
        <WarningAmberRoundedIcon sx={{ color: "#F6A800" }} />
        <Typography variant="subtitle2" fontWeight={600}>
          {t("payment.legacy.note")}
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary" mb={0.5}>
        {t("payment.legacy.cancelWithin")}
      </Typography>

      <Box component="ul" sx={{ pl: 3, m: 0, mt: 0.5 }}>
        <li>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" fontWeight={600}>
              {t("payment.legacy.cancelBeforeLabel")}
            </Box>{" "}
            {t("payment.legacy.fullRefund")}
          </Typography>
        </li>
        <li>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" fontWeight={600}>
              {t("payment.legacy.noShowLabel")}
            </Box>{" "}
            {t("payment.legacy.depositForfeited", { amount: fmtVND(150000) })}
          </Typography>
        </li>
      </Box>
    </Paper>
  );
};

export default DepositNoticeCard;
