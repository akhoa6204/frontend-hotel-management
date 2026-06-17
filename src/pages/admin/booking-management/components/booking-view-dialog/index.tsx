import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Button,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import BookingInfoTab from "./booking-info-tab";
import BookingServiceTab from "./booking-service-tab";
import BookingPaymentTab from "./booking-payment-tab";
import HousekeepingTab from "./housekeeping-tab";
import { useBookingManagementContext } from "@context/booking-management";

function TabPanel({
  children,
  value,
  tab,
}: {
  children: React.ReactNode;
  value: string;
  tab: string;
}) {
  if (value !== tab) return null;

  return <Box>{children}</Box>;
}

export default function BookingViewDialog() {
  const {
    dialog,
    closeDialog,
    bookingDetail,
    invoiceDetail,
    bookingViewTab,
    onChangeBookingViewTab,
    handleCreateTask,
    openCancelDialog,
    handleCheckIn,
    handleCheckout,
    invoiceSummary,
  } = useBookingManagementContext();

  if (!bookingDetail || !invoiceDetail) {
    return null;
  }
  const renderActionButton = () => {
    const now = dayjs();
    const checkInTime = dayjs(bookingDetail.checkInDate)
      .hour(14)
      .minute(0)
      .second(0);
    const checkOutTime = dayjs(bookingDetail.checkOutDate)
      .hour(12)
      .minute(0)
      .second(0);

    const inWindow = !now.isBefore(checkInTime) && now.isBefore(checkOutTime);
    const beforeCheckIn = now.isBefore(checkInTime);
    const afterCheckOut = !now.isBefore(checkOutTime);

    if (bookingDetail.status === "CONFIRMED" && inWindow) {
      return (
        <Stack direction={"row"} gap={1}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={openCancelDialog}
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
            }}
          >
            Hủy phòng
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() =>
              bookingDetail.id &&
              invoiceDetail &&
              invoiceSummary &&
              handleCheckIn(bookingDetail.id, invoiceSummary.remain)
            }
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
            }}
          >
            Check-in
          </Button>
        </Stack>
      );
    }

    if (bookingDetail.status === "CONFIRMED" && beforeCheckIn) {
      return (
        <Box display="flex" gap={1}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={openCancelDialog}
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
            }}
          >
            Hủy phòng
          </Button>

          <Button
            size="small"
            variant="outlined"
            disabled
            sx={{
              color: "#888",
              borderColor: "#ccc",
              bgcolor: "#f5f5f5",
              borderRadius: 1.5,
              py: 1,
              px: 2,
              "&.Mui-disabled": {
                color: "#aaa",
                borderColor: "#ddd",
                bgcolor: "#fafafa",
              },
            }}
          >
            Chưa đến giờ
          </Button>
        </Box>
      );
    }

    if (bookingDetail.status === "CONFIRMED" && afterCheckOut) {
      return (
        <Button
          size="small"
          variant="outlined"
          color="error"
          disabled
          sx={{
            borderRadius: 1.5,
            py: 1,
            px: 2,
          }}
        >
          Quá hạn
        </Button>
      );
    }

    if (bookingDetail.status === "CHECKED_IN") {
      if (!bookingDetail.inspected && bookingDetail.inspectionTaskId) {
        return (
          <Button
            size="small"
            variant="outlined"
            color="info"
            disabled
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
            }}
          >
            Phòng đang được kiểm tra
          </Button>
        );
      }

      if (!bookingDetail.inspected && !bookingDetail.inspectionTaskId) {
        return (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() =>
              bookingDetail.id &&
              bookingDetail.room.id &&
              handleCreateTask({
                bookingId: bookingDetail.id,
                roomId: bookingDetail.room.id,
                type: "INSPECTION",
              })
            }
            sx={{
              borderRadius: 1.5,
              py: 1,
              px: 2,
            }}
          >
            Kiểm tra phòng
          </Button>
        );
      }

      return (
        <Button
          size="small"
          variant="outlined"
          color="warning"
          onClick={() =>
            bookingDetail.id &&
            invoiceDetail &&
            invoiceSummary &&
            handleCheckout(bookingDetail.id, invoiceSummary.remain)
          }
          sx={{
            borderRadius: 1.5,
            py: 1,
            px: 2,
          }}
        >
          Check-out
        </Button>
      );
    }

    if (bookingDetail.status === "CHECKED_OUT") {
      return (
        <Button
          size="small"
          variant="outlined"
          color="success"
          sx={{ pointerEvents: "none", borderRadius: 1.5, py: 1, px: 2 }}
        >
          Hoàn tất
        </Button>
      );
    }

    if (bookingDetail.status === "CANCELLED") {
      return (
        <Button
          size="small"
          variant="outlined"
          color="error"
          sx={{ pointerEvents: "none", borderRadius: 1.5, py: 1, px: 2 }}
        >
          Đã hủy phòng
        </Button>
      );
    }

    return null;
  };

  return (
    <Dialog
      open={dialog.open && dialog.mode === "VIEW"}
      onClose={closeDialog}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Xem chi tiết {bookingDetail.bookingCode}</DialogTitle>

      <Tabs
        value={bookingViewTab}
        onChange={(_, v) => onChangeBookingViewTab(v)}
      >
        <Tab label="Thông tin" value="info" />
        <Tab label="Dịch vụ" value="service" />
        <Tab label="Buồng phòng" value="housekeeping" />
        <Tab label="Thanh toán" value="payment" />
      </Tabs>
      <DialogContent dividers>
        {/* Thông tin */}
        <TabPanel value={bookingViewTab} tab="info">
          <BookingInfoTab />
        </TabPanel>
        {/* Dịch vụ */}
        <TabPanel value={bookingViewTab} tab="service">
          <BookingServiceTab />
        </TabPanel>

        <TabPanel value={bookingViewTab} tab="housekeeping">
          <HousekeepingTab />
        </TabPanel>

        <TabPanel value={bookingViewTab} tab="payment">
          <BookingPaymentTab />
        </TabPanel>
      </DialogContent>

      <DialogActions>{renderActionButton()}</DialogActions>
    </Dialog>
  );
}
