import type { BookingResponse } from "@constant/response/BookingResponse";
import AdminBookingOperation, { type BookingOperationContext } from "@components/admin-booking-operation";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  booking: BookingResponse;
  operationContext: BookingOperationContext;
  handleOnClick: () => void;
}

const BookingItemCard = ({ booking, operationContext, handleOnClick }: Props) => {
  const { t } = useTranslation("dashboard");
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ px: 0.25, py: 1.35, opacity: booking.status === "CANCELLED" ? 0.72 : 1 }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: "text.primary", fontSize: 14, fontWeight: 600 }} noWrap>
          {booking.room?.name ?? "—"} · {booking.room?.roomType?.name ?? "—"}
        </Typography>
        <Typography sx={{ mt: 0.25, color: "text.secondary", fontSize: 12.5 }} noWrap>
          {booking.guestName || t("activity.unknownGuest")}
        </Typography>
      </Box>
      <AdminBookingOperation booking={booking} context={operationContext} onAction={handleOnClick} />
    </Stack>
  );
};

export default BookingItemCard;
