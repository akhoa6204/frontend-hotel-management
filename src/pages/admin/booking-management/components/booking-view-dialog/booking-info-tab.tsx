import EntityPickerField from "@components/entity-picker-field";
import { Typography, Grid, Box, MenuItem } from "@mui/material";
import EntityPickerDialog from "@components/entity-picker-dialog";
import { useBookingManagementContext } from "@context/booking-management";

export default function BookingInfoTab() {
  const {
    bookingDetail,
    openPickerHandler,
    availableRooms,
    handleChangeRoom,
    metaAvailabelRooms,
    getLabeBookinglStatus,
  } = useBookingManagementContext();
  if (!bookingDetail) return;
  return (
    <>
      <Box minHeight={400}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="body2">Khách</Typography>
            <Typography fontWeight={600}>{bookingDetail.guestName}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Điện thoại</Typography>
            <Typography fontWeight={600}>{bookingDetail.guestPhone}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">Email</Typography>
            <Typography fontWeight={600}>
              {bookingDetail.guestEmail
                ? bookingDetail.guestEmail
                : "Không có thông tin"}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Phòng</Typography>
            {bookingDetail.status === "CANCELLED" ||
            bookingDetail.status === "CHECKED_OUT" ? (
              <Typography fontWeight={600}>
                {bookingDetail.room.name} - {bookingDetail.room.roomType.name}
              </Typography>
            ) : (
              <EntityPickerField
                name="roomId"
                value={bookingDetail.room.id}
                onChange={(field, value) => {
                  if (value && value !== bookingDetail.room.id) {
                    handleChangeRoom(Number(value));
                  }
                }}
                onOpenPicker={openPickerHandler}
                isMoreOptions={(metaAvailabelRooms?.totalPages || 1) > 1}
                placeholder="Chọn phòng trống"
                size="small"
              >
                {availableRooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.name} - {room.roomType.name}
                  </MenuItem>
                ))}
              </EntityPickerField>
            )}
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Trạng thái</Typography>
            <Typography fontWeight={600}>
              {getLabeBookinglStatus[bookingDetail.status]}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Check-in</Typography>
            <Typography fontWeight={600}>
              {new Date(bookingDetail.checkInDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Check-out</Typography>
            <Typography fontWeight={600}>
              {new Date(bookingDetail.checkOutDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Giờ đến dự kiến</Typography>
            <Typography fontWeight={600}>
              {bookingDetail.estimatedArrivalTime
                ? bookingDetail.estimatedArrivalTime
                : "Không có thông tin"}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2">Đặt hộ / Người ở thực tế</Typography>
            <Typography fontWeight={600}>
              {bookingDetail.bookingForSomeoneElse ? "Có" : "Không"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
