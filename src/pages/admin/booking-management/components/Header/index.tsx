import Title from "@components/Title";
import { useBookingManagementContext } from "@context/booking-management";
import { Search } from "@mui/icons-material";
import { InputAdornment, Stack, TextField } from "@mui/material";

const Header = () => {
  const { openDialog, handleSearchBooking } = useBookingManagementContext();
  return (
    <>
      <Title
        title="Quản lý đặt phòng"
        subTitle="Quản lý danh sách đặt phòng và trạng thái khách hàng"
        onAdd={() => openDialog("CREATE")}
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Tìm theo mã đặt phòng, tên khách hàng"
          onChange={handleSearchBooking}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
};
export default Header;
