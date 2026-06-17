import { Box, Divider, Stack, Typography } from "@mui/material";
import { CalendarMonthRounded, Person } from "@mui/icons-material";
import { fmtVND, formatDate } from "@utils/format";
import { BookingResponse } from "@constant/response/BookingResponse";
import { InvoiceResponse } from "@constant/response/InvoiceResponse";

type Props = {
  booking: BookingResponse;
};

const BookingRoomAndPrice = ({ booking }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.200",
        p: 3,
        bgcolor: "white",
      }}
    >
      <Stack direction="row" spacing={3} mb={3}>
        <Box
          component="img"
          src={booking.room.roomType.roomTypeImages?.[0]?.url}
          sx={{
            width: 260,
            height: 180,
            borderRadius: 2,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        <Stack sx={{ flex: 1 }} spacing={1} justifyContent={"space-between"}>
          <Box flex={1}>
            <Typography fontWeight={600} fontSize={18}>
              Phòng {booking.room.name}
            </Typography>
            <Typography color="text.secondary" mb={1}>
              {booking.room.roomType.name}
            </Typography>

            <Stack spacing={0.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthRounded
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(booking.checkInDate)} -{" "}
                  {formatDate(booking.checkOutDate)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Person fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {booking.room.roomType.capacity} khách
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box textAlign="right" minWidth={200}>
            <Typography variant="body2" color="text.secondary">
              Tổng giá
            </Typography>
            <Typography fontSize={22} fontWeight={700} color="primary">
              {Number(booking.room.roomType.basePrice).toLocaleString("vi-VN")}{" "}
              VND
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tổng tiền</Typography>
          <Typography>{fmtVND(booking.roomAmount || 0)} VND</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography>Khuyến mãi</Typography>
          <Typography color="success.main">
            -{fmtVND(booking.roomDiscountAmount || 0)} VND
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography>Đã thanh toán tiền cọc phòng</Typography>
          <Typography>
            {fmtVND(booking.roomPaymentPaidAmount || 0)} VND
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Typography fontWeight={600}>
            Trả phần còn lại khi check-in
          </Typography>
          <Typography fontWeight={700}>
            {fmtVND(
              (booking.roomAmount || 0) -
                (booking.roomDiscountAmount || 0) -
                (booking.roomPaymentPaidAmount || 0),
            )}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BookingRoomAndPrice;
