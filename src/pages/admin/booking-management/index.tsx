import BookingCreateDialog from "./components/booking-create-dialog";
import Loading from "@components/Loading";
import GlobalSnackbar from "@components/GlobalSnackbar";
import BookingTable from "./components/booking-table";
import BookingViewDialog from "./components/booking-view-dialog";
import CancelBookingDialog from "./components/CancelBookingDialog";
import PaymentQrDialog from "./components/PaymentQrDialog";
import Header from "./components/Header";
import { useBookingManagementContext } from "@context/booking-management";
import AvailableRoomDialog from "./components/available-room-dialog";
import { useTranslation } from "react-i18next";

export default function BookingManagement() {
  const { t } = useTranslation("bookings");
  const {
    showLoadingOverlay,
    alert,
    closeSnackbar,
    selectedId,
    closePickerHandler,
    select,
    handleChangeBookingForm,
    onChangePage,
    onSearch,
    filtersAvailableRooms,
    availableRooms,
    metaAvailabelRooms,
    handleChangeRoom,
    dialog,
    loadingRooms,
    openEntityPickerDialog,
  } = useBookingManagementContext();
  return (
    <>
      <Header />

      <BookingTable />

      <BookingViewDialog />

      <BookingCreateDialog />
      {showLoadingOverlay ? (
        <Loading content={t("processingPayment")} />
      ) : null}

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />

      <CancelBookingDialog />

      <PaymentQrDialog />

      {dialog.open && (dialog.mode === "CREATE" || dialog.mode === "VIEW") && (
        <AvailableRoomDialog
          open={openEntityPickerDialog}
          data={availableRooms}
          selectedId={selectedId}
          onClose={closePickerHandler}
          onSelect={(row) => {
            select(row);
            if (dialog.mode === "CREATE") {
              handleChangeBookingForm("roomId", row.id);
            } else {
              handleChangeRoom(row.id);
            }
          }}
          onPageChange={onChangePage}
          totalPages={metaAvailabelRooms?.totalPages}
          page={metaAvailabelRooms?.page}
          onSearch={onSearch}
          q={filtersAvailableRooms.q}
          loading={loadingRooms}
        />
      )}
    </>
  );
}
