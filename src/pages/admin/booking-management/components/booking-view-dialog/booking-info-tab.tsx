import EntityPickerField from "@components/entity-picker-field";
import { Typography, Grid, Box, MenuItem } from "@mui/material";
import { useBookingManagementContext } from "@context/booking-management";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const DetailItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography sx={{ color: "#667085", fontSize: 12.5, mb: 0.5 }}>
      {label}
    </Typography>
    <Box sx={{ color: "#1F2937", fontSize: 14, fontWeight: 600 }}>
      {children}
    </Box>
  </Box>
);

export default function BookingInfoTab() {
  const { t } = useTranslation(["bookings", "common"]);
  const {
    bookingDetail,
    openPickerHandler,
    availableRooms,
    handleChangeRoom,
    metaAvailabelRooms,
  } = useBookingManagementContext();
  if (!bookingDetail) return null;
  const nights = Math.max(
    1,
    dayjs(bookingDetail.checkOutDate).diff(
      dayjs(bookingDetail.checkInDate),
      "day",
    ),
  );
  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475467",
              letterSpacing: "0.05em",
              pb: 1.25,
              mb: 2,
              borderBottom: "1px solid #E4E7EC",
            }}
          >
            {t("detail.guestInformation", { ns: "bookings" })}
          </Typography>
          <Grid container spacing={2.5}>
            <Grid size={6}>
              <DetailItem label={t("detail.guest", { ns: "bookings" })}>{bookingDetail.guestName}</DetailItem>
            </Grid>
            <Grid size={6}>
              <DetailItem label={t("detail.phone", { ns: "bookings" })}>
                {bookingDetail.guestPhone}
              </DetailItem>
            </Grid>
            <Grid size={12}>
              <DetailItem label={t("detail.email", { ns: "bookings" })}>
                {bookingDetail.guestEmail || t("states.noInformation", { ns: "common" })}
              </DetailItem>
            </Grid>
            <Grid size={12}>
              <DetailItem label={t("detail.bookedFor", { ns: "bookings" })}>
                {t(bookingDetail.bookingForSomeoneElse ? "detail.yes" : "detail.no", { ns: "bookings" })}
              </DetailItem>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475467",
              letterSpacing: "0.05em",
              pb: 1.25,
              mb: 2,
              borderBottom: "1px solid #E4E7EC",
            }}
          >
            {t("detail.stayInformation", { ns: "bookings" })}
          </Typography>
          <Grid container spacing={2.5}>
            <Grid size={6}>
              <DetailItem label={t("detail.checkIn", { ns: "bookings" })}>
                {dayjs(bookingDetail.checkInDate).format("DD/MM/YYYY")}
              </DetailItem>
            </Grid>
            <Grid size={6}>
              <DetailItem label={t("detail.checkOut", { ns: "bookings" })}>
                {dayjs(bookingDetail.checkOutDate).format("DD/MM/YYYY")}
              </DetailItem>
            </Grid>
            <Grid size={6}>
              <DetailItem label={t("detail.nights", { ns: "bookings" })}>{nights}</DetailItem>
            </Grid>
            <Grid size={6}>
              <DetailItem label={t("detail.expectedArrivalTime", { ns: "bookings" })}>
                {bookingDetail.estimatedArrivalTime || t("states.noInformation", { ns: "common" })}
              </DetailItem>
            </Grid>
            <Grid size={12}>
              <DetailItem label={t("detail.status", { ns: "bookings" })}>
                {t(`status.${bookingDetail.status}`, { ns: "bookings" })}
              </DetailItem>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475467",
              letterSpacing: "0.05em",
              pb: 1.25,
              mb: 2,
              borderBottom: "1px solid #E4E7EC",
            }}
          >
            {t("detail.roomAssignment", { ns: "bookings" })}
          </Typography>
          <Box sx={{ maxWidth: 440 }}>
            <Typography sx={{ color: "#667085", fontSize: 12.5, mb: 0.75 }}>
              {t("detail.assignedRoom", { ns: "bookings" })}
            </Typography>
            {bookingDetail.status === "CANCELLED" ||
            bookingDetail.status === "CHECKED_OUT" ? (
              <Typography fontSize={14} fontWeight={600}>
                {bookingDetail.room.name} - {bookingDetail.room.roomType.name}
              </Typography>
            ) : (
              <EntityPickerField
                name="roomId"
                value={bookingDetail.room.id}
                onChange={(_, value) => {
                  if (value && value !== bookingDetail.room.id) {
                    handleChangeRoom(Number(value));
                  }
                }}
                onOpenPicker={openPickerHandler}
                isMoreOptions={(metaAvailabelRooms?.totalPages || 1) > 1}
                placeholder={t("createDialog.chooseAvailableRoom", { ns: "bookings" })}
                size="small"
              >
                {availableRooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.name} - {room.roomType.name}
                  </MenuItem>
                ))}
              </EntityPickerField>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
