import { Box, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { diffNights, formatDate } from "@utils/format";
import { useTranslation } from "react-i18next";

type BookingDetailCardProps = {
  checkIn: string;
  checkOut: string;
  guests: number;
  timeRange?: string;
  nonRefundText?: string;
};

const BookingDetailCard: React.FC<BookingDetailCardProps> = ({
  checkIn,
  checkOut,
  guests,
  timeRange = "14:00 - 22:00",
  nonRefundText,
}) => {
  const { t } = useTranslation("client");
  const nights = diffNights(checkIn, checkOut);
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E0E0E0",
        p: 2.5,
        mb: 2.5,
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t("payment.legacy.bookingDetails")}
      </Typography>

      {/* Box ngày nhận / trả phòng */}
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "#2E90FA0d",
          p: 2,
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Nhận phòng */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={0.5}
              fontWeight={500}
            >
              {t("payment.summary.checkIn")}
            </Typography>
            <Typography fontWeight={700}>{formatDate(checkIn)}</Typography>
            <Typography variant="body2" color="text.secondary">
              {timeRange}
            </Typography>
          </Box>

          {/* Số đêm + mũi tên */}
          <Stack alignItems="center" spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t("payment.summary.nights", { count: nights })}
            </Typography>
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </Stack>

          {/* Trả phòng */}
          <Box textAlign="right">
            <Typography
              variant="body2"
              color="text.secondary"
              mb={0.5}
              fontWeight={500}
            >
              {t("payment.summary.checkOut")}
            </Typography>
            <Typography fontWeight={700}>{formatDate(checkOut)}</Typography>
            <Typography variant="body2" color="text.secondary">
              7:00 - 12:00
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Dòng số khách */}
      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
        <PersonOutlineRoundedIcon fontSize="small" />
        <Typography variant="body2">{t("payment.legacy.guests", { count: guests })}</Typography>
      </Stack>

      {/* Dòng không hoàn tiền */}
      <Stack direction="row" spacing={1} alignItems="center">
        <BlockRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        <Typography variant="body2" color="text.secondary">
          {nonRefundText ?? t("payment.legacy.nonRefundable")}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default BookingDetailCard;
