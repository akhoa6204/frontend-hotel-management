// BookingItemCard.tsx
import type { BookingResponse } from "@constant/response/BookingResponse";
import AdminBookingOperation, { type BookingOperationContext } from "@components/admin-booking-operation";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function BookingItemCard({
  booking,
  handleOnClick,
  operationContext,
}: {
  booking: BookingResponse;
  handleOnClick: () => void;
  operationContext: BookingOperationContext;
}) {
  const { t } = useTranslation("receptionist");

  return (
    <Box sx={{ py: 1.4, opacity: booking.status === "CANCELLED" ? 0.72 : 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap sx={{ color: "#1F2937", fontSize: 13.75, fontWeight: 650 }}>
            {booking.room?.name ?? "—"} · {booking.room?.roomType?.name ?? "—"}
          </Typography>
          <Typography noWrap sx={{ mt: 0.3, color: "#667085", fontSize: 12.5 }}>
            {booking.guestName || t("activity.missingGuestName")}
          </Typography>
        </Box>
        <AdminBookingOperation booking={booking} context={operationContext} onAction={handleOnClick} />
      </Stack>
    </Box>
  );
}
