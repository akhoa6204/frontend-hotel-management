import type { BookingStatus } from "@enums/BookingStatus";
import { ArrowBack } from "@mui/icons-material";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const statusColorMap: Record<BookingStatus, string> = {
  PENDING: "text.secondary",
  CONFIRMED: "#E37531",
  CHECKED_IN: "warning.main",
  CHECKED_OUT: "primary.main",
  CANCELLED: "error.main",
};

type Props = {
  id: string;
  status: BookingStatus;
  onBack?: () => void;
};

const BookingHeader = ({ id, status, onBack }: Props) => {
  const { t } = useTranslation("client");
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={1.5}
      bgcolor="white"
      px={2.5}
      py={2}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="body1" fontWeight={500}>
          {t("shared.booking.back")}
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={1.5}>
        <Typography>
          {t("shared.booking.bookingCode")}: <strong>{id}</strong>
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography fontWeight={600} color={statusColorMap[status]}>
          {t(`shared.booking.status.${status}`)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BookingHeader;
