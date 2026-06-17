import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import Title from "@components/Title";
import BookingCreateDialog from "./components/booking-create-dialog";
import { EntityPickerDialog, Loading, Pager } from "@components";
import useBookingManagement from "./useBookingManagement";
import GlobalSnackbar from "@components/GlobalSnackbar";
import BookingTable from "./components/booking-table";
import BookingViewDialog from "./components/booking-view-dialog";
import CancelBookingDialog from "./components/CancelBookingDialog";
import PaymentQrDialog from "./components/PaymentQrDialog";
import Header from "./components/Header";
import { useBookingManagementContext } from "@context/booking-management";

export default function BookingManagement() {
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
        <Loading content="Đang xử lý thanh toán, vui lòng chờ..." />
      ) : null}

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />

      <CancelBookingDialog />

      <PaymentQrDialog />

      {dialog.open && (dialog.mode === "CREATE" || dialog.mode === "VIEW") && (
        <EntityPickerDialog
          open={openEntityPickerDialog}
          data={availableRooms}
          selectedId={selectedId}
          onClose={closePickerHandler}
          title="Danh sách phòng trống"
          columns={[
            { label: "Tên phòng", name: "name" },
            { label: "Loại phòng", name: "roomType.name" },
            { label: "Sức chứa", name: "roomType.capacity" },
          ]}
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
