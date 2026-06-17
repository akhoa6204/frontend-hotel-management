import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Paper,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import dayjs from "dayjs";
import { EntityPickerField } from "@components";
import { useBookingManagementContext } from "@context/booking-management";

export default function BookingCreateDialog() {
  const {
    dialog,
    closeDialog,
    handleCreateBooking,
    bookingForm: values,
    handleChangeBookingForm: onChange,
    roomTypes,
    loadingRooms,
    availableRooms: rooms,
    openPickerHandler: onOpenPicker,
    handleApplyPromo: onApplyPromo,
    pricing,
    nights,
    creating: submitting,
    metaAvailabelRooms,
  } = useBookingManagementContext();
  return (
    <>
      <Dialog
        open={dialog.open && dialog.mode === "CREATE"}
        onClose={closeDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle fontWeight={700}>Tạo đặt phòng</DialogTitle>
        <Box component={"form"} onSubmit={handleCreateBooking}>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 0.5 }}>
              <Paper
                variant="outlined"
                sx={{ py: 2, px: 1.5, borderRadius: 2 }}
              >
                <Typography fontWeight={600} pb={1.5}>
                  Thông tin khách hàng
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={6}>
                    <InputLabel shrink>Tên khách hàng</InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                      value={values.guestName}
                      onChange={(e) => onChange("guestName", e.target.value)}
                    />
                  </Grid>
                  <Grid size={6}>
                    <InputLabel shrink>Số điện thoại</InputLabel>
                    <TextField
                      type="tel"
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: values.checkInDate }}
                      value={values.guestPhone}
                      onChange={(e) => onChange("guestPhone", e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper
                variant="outlined"
                sx={{ py: 2, px: 1.5, borderRadius: 2 }}
              >
                <Typography fontWeight={600} pb={1.5}>
                  Thông tin đặt phòng
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid size={4}>
                    <InputLabel shrink>Ngày đến</InputLabel>
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                      value={values.checkInDate}
                      onChange={(e) => onChange("checkInDate", e.target.value)}
                    />
                  </Grid>
                  <Grid size={4}>
                    <InputLabel shrink>Ngày đi</InputLabel>
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: values.checkInDate }}
                      value={values.checkOutDate}
                      onChange={(e) => onChange("checkOutDate", e.target.value)}
                    />
                  </Grid>
                  <Grid size={4}>
                    <InputLabel shrink>Phương thức thanh toán</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      value={values.paymentMethod}
                      onChange={(e) =>
                        onChange("paymentMethod", e.target.value)
                      }
                    >
                      <MenuItem value="CASH">Tiền mặt</MenuItem>
                      <MenuItem value="BANK_TRANSFER">
                        Thanh toán online
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid size={12}>
                    <InputLabel shrink>Loại phòng</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      value={values.roomTypeId}
                      displayEmpty
                      renderValue={(v) => {
                        if (!v || v === undefined) return "Toàn bộ loại phòng";
                        const t = roomTypes.find((rt) => rt.id === v);
                        return t?.name ?? "";
                      }}
                      onChange={(e) => {
                        const value = e.target.value as string | number;
                        onChange(
                          "roomTypeId",
                          value === "" ? "" : Number(value),
                        );
                      }}
                    >
                      <MenuItem value="">Toàn bộ loại phòng</MenuItem>
                      {roomTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id!}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                {loadingRooms ? (
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                    mt={5}
                  >
                    <CircularProgress />
                    <Typography variant="body2">
                      Đang tài danh sách phòng...
                    </Typography>
                  </Stack>
                ) : rooms.length ? (
                  <Grid container spacing={1}>
                    <Grid size={5}>
                      <InputLabel shrink>Chọn phòng</InputLabel>
                      <EntityPickerField
                        name="roomId"
                        value={values.roomId}
                        onChange={(field, value) => {
                          onChange("roomId", value);
                        }}
                        onOpenPicker={onOpenPicker}
                        isMoreOptions={
                          (metaAvailabelRooms?.totalPages || 1) > 1
                        }
                        placeholder="Chọn phòng trống"
                        size="small"
                      >
                        {rooms.map((room) => (
                          <MenuItem key={room.id} value={room.id}>
                            {room.name} - {room.roomType.name}
                          </MenuItem>
                        ))}
                      </EntityPickerField>
                    </Grid>
                    <Grid size={5}>
                      <InputLabel shrink>Mã khuyến mãi</InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Nhập mã khuyến mãi"
                        value={values.promotionCode}
                        onChange={(e) =>
                          onChange("promotionCode", e.target.value)
                        }
                        InputProps={{
                          endAdornment: values.promotionCode && (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => onChange("promotionCode", "")}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={2} display={"flex"} alignItems={"flex-end"}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={onApplyPromo}
                        disabled={!values.roomId}
                      >
                        Áp dụng
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography textAlign={"center"} variant="body2">
                    Không có phòng trống thời điểm này
                  </Typography>
                )}
              </Paper>

              {pricing && (
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                  <Grid container spacing={0.5}>
                    <Grid size={6}></Grid>
                    <Grid size={6} container>
                      <Grid size={6}>
                        <Typography>Đơn giá:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>
                          {pricing.basePrice?.toLocaleString()} VND/đêm
                        </Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography>Số đêm:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>{nights}</Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography>Tạm tính:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>
                          {pricing.subtotal?.toLocaleString()} VND
                        </Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography>Giảm giá:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>
                          −{pricing.totalDiscount?.toLocaleString()} VND
                        </Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography fontWeight={700}>Tổng cộng:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography fontWeight={700}>
                          {(
                            pricing.subtotal - pricing.totalDiscount
                          )?.toLocaleString()}{" "}
                          VND
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" color="inherit" onClick={closeDialog}>
              Hủy
            </Button>
            <Button
              variant="contained"
              disabled={!values.roomId || submitting}
              type="submit"
            >
              Tạo đặt phòng
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
