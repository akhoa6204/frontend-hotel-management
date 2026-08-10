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
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import dayjs from "dayjs";
import BookingInfoTab from "./booking-info-tab";
import BookingServiceTab from "./booking-service-tab";
import BookingPaymentTab from "./booking-payment-tab";
import HousekeepingTab from "./housekeeping-tab";
import { useBookingManagementContext } from "@context/booking-management";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["bookings", "common"]);
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
    isCheckingIn,
    isCheckingOut,
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
            {t("actions.cancel", { ns: "bookings" })}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            disabled={isCheckingIn}
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
            {t(isCheckingIn ? "actions.checkingIn" : "actions.checkIn", { ns: "bookings" })}
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
            {t("actions.cancel", { ns: "bookings" })}
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
            {t("actions.tooEarly", { ns: "bookings" })}
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
          {t("detail.overdue", { ns: "bookings" })}
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
            {t("actions.roomInspectionInProgress", { ns: "bookings" })}
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
            {t("actions.inspectRoom", { ns: "bookings" })}
          </Button>
        );
      }

      return (
        <Button
          size="small"
          variant="outlined"
          color="warning"
          disabled={isCheckingOut}
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
          {t(isCheckingOut ? "actions.checkingOut" : "actions.checkOut", { ns: "bookings" })}
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
          {t("actions.completed", { ns: "bookings" })}
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
          {t("actions.cancelled", { ns: "bookings" })}
        </Button>
      );
    }

    return null;
  };

  const statusStyles: Record<string, { background: string; color: string }> = {
    PENDING: { background: "#FFF5E5", color: "#9A6518" },
    CONFIRMED: { background: "#EAF6F0", color: "#246548" },
    CANCELLED: { background: "#FDECEC", color: "#A43B3B" },
    CHECKED_IN: { background: "#EAF4FF", color: "#1D6FC2" },
    CHECKED_OUT: { background: "#F2F4F7", color: "#475467" },
  };
  const status = statusStyles[bookingDetail.status] ?? statusStyles.PENDING;
  const nights = Math.max(1, dayjs(bookingDetail.checkOutDate).diff(dayjs(bookingDetail.checkInDate), "day"));
  const footerAction = renderActionButton();

  return (
    <Dialog
      open={dialog.open && dialog.mode === "VIEW"}
      onClose={closeDialog}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { width: "min(1080px, calc(100vw - 64px))", maxHeight: "88dvh", borderRadius: "12px", m: { xs: 1.5, sm: 3 }, overflow: "hidden" } }}
    >
      <DialogTitle sx={{ position: "sticky", top: 0, zIndex: 3, bgcolor: "#FFFFFF", px: { xs: 2, sm: 3 }, py: 2, borderBottom: "1px solid #E4E7EC" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Box minWidth={0}>
            <Typography sx={{ color: "#667085", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em" }}>{t("detail.eyebrow", { ns: "bookings" })}</Typography>
            <Stack direction="row" alignItems="center" gap={1.5} mt={0.25} flexWrap="wrap">
              <Typography sx={{ fontSize: { xs: 17, sm: 19 }, fontWeight: 700, overflowWrap: "anywhere" }}>{bookingDetail.bookingCode}</Typography>
              <Chip label={t(`status.${bookingDetail.status}`, { ns: "bookings" })} size="small" sx={{ height: 25, bgcolor: status.background, color: status.color, fontSize: 12, fontWeight: 650 }} />
            </Stack>
            <Typography sx={{ mt: 0.75, fontSize: 13.5, fontWeight: 600 }}>{bookingDetail.guestName}</Typography>
            <Typography sx={{ mt: 0.25, color: "#667085", fontSize: 12.5 }}>
              {bookingDetail.room.name} · {bookingDetail.room.roomType.name} · {dayjs(bookingDetail.checkInDate).format("DD/MM/YYYY")} → {dayjs(bookingDetail.checkOutDate).format("DD/MM/YYYY")} · {t("detail.nightCount", { ns: "bookings", count: nights })}
            </Typography>
          </Box>
          <IconButton aria-label={t("actions.close", { ns: "common" })} onClick={closeDialog} size="small"><Close /></IconButton>
        </Stack>
      </DialogTitle>

      <Tabs
        value={bookingViewTab}
        onChange={(_, v) => onChangeBookingViewTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ position: "sticky", top: 0, zIndex: 2, bgcolor: "#FFFFFF", minHeight: 46, px: { xs: 1, sm: 2 }, borderBottom: "1px solid #E4E7EC", "& .MuiTab-root": { minHeight: 46, minWidth: { xs: 100, sm: 120 }, px: 2, fontSize: 13.5, fontWeight: 500 }, "& .Mui-selected": { fontWeight: 650 } }}
      >
        <Tab label={t("detail.tabs.information", { ns: "bookings" })} value="info" />
        <Tab label={t("detail.tabs.services", { ns: "bookings" })} value="service" />
        <Tab label={t("detail.tabs.housekeeping", { ns: "bookings" })} value="housekeeping" />
        <Tab label={t("detail.tabs.payment", { ns: "bookings" })} value="payment" />
      </Tabs>
      <DialogContent className="admin-scrollbar" sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: { xs: 2, sm: 3 }, py: 2.5, bgcolor: "#FFFFFF" }}>
        {/* Information */}
        <TabPanel value={bookingViewTab} tab="info">
          <BookingInfoTab />
        </TabPanel>
        {/* Services */}
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

      {footerAction && <DialogActions sx={{ position: "sticky", bottom: 0, zIndex: 2, minHeight: 64, px: { xs: 2, sm: 3 }, py: 1.25, bgcolor: "#FFFFFF", borderTop: "1px solid #E4E7EC" }}>{footerAction}</DialogActions>}
    </Dialog>
  );
}
