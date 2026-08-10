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
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import dayjs from "dayjs";
import EntityPickerField from "@components/entity-picker-field";
import { useBookingManagementContext } from "@context/booking-management";
import { useTranslation } from "react-i18next";

export default function BookingCreateDialog() {
  const { t } = useTranslation(["bookings", "common"]);
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
        PaperProps={{ sx: { width: "min(920px, calc(100vw - 48px))", maxHeight: "88dvh", borderRadius: "12px", m: { xs: 1.5, sm: 3 }, overflow: "hidden" } }}
      >
        <DialogTitle sx={{ position: "sticky", top: 0, zIndex: 2, bgcolor: "#FFFFFF", px: { xs: 2, sm: 3 }, py: 2, borderBottom: "1px solid #E4E7EC" }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
            <Box><Typography variant="h6" fontWeight={700}>{t("createDialog.title", { ns: "bookings" })}</Typography><Typography variant="body2" color="text.secondary">{t("createDialog.subtitle", { ns: "bookings" })}</Typography></Box>
            <IconButton aria-label={t("actions.close", { ns: "common" })} size="small" onClick={closeDialog}><Close /></IconButton>
          </Stack>
        </DialogTitle>
        <Box component="form" onSubmit={handleCreateBooking} sx={{ display: "flex", flex: 1, minHeight: 0, flexDirection: "column" }}>
          <DialogContent className="admin-scrollbar" sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: { xs: 2, sm: 3 }, py: 2.5 }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#475467", pb: 1.25, mb: 2, borderBottom: "1px solid #E4E7EC" }}>
                  {t("createDialog.customerInformation", { ns: "bookings" })}
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel shrink>{t("createDialog.customerName", { ns: "bookings" })}</InputLabel>
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
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel shrink>{t("createDialog.phone", { ns: "bookings" })}</InputLabel>
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
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#475467", pb: 1.25, mb: 2, borderBottom: "1px solid #E4E7EC" }}>
                  {t("createDialog.stayInformation", { ns: "bookings" })}
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <InputLabel shrink>{t("createDialog.checkInDate", { ns: "bookings" })}</InputLabel>
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
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <InputLabel shrink>{t("createDialog.checkOutDate", { ns: "bookings" })}</InputLabel>
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
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <InputLabel shrink>{t("createDialog.paymentMethod", { ns: "bookings" })}</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      value={values.paymentMethod}
                      onChange={(e) =>
                        onChange("paymentMethod", e.target.value)
                      }
                    >
                      <MenuItem value="CASH">{t("paymentMethods.CASH", { ns: "bookings" })}</MenuItem>
                      <MenuItem value="BANK_TRANSFER">
                        {t("paymentMethods.BANK_TRANSFER", { ns: "bookings" })}
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel shrink>{t("createDialog.roomType", { ns: "bookings" })}</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      value={values.roomTypeId}
                      displayEmpty
                      renderValue={(v) => {
                        if (!v || v === undefined) return t("createDialog.allRoomTypes", { ns: "bookings" });
                        const roomType = roomTypes.find((rt) => rt.id === v);
                        return roomType?.name ?? "";
                      }}
                      onChange={(e) => {
                        const value = e.target.value as string | number;
                        onChange(
                          "roomTypeId",
                          value === "" ? "" : Number(value),
                        );
                      }}
                    >
                      <MenuItem value="">{t("createDialog.allRoomTypes", { ns: "bookings" })}</MenuItem>
                      {roomTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id!}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  {loadingRooms ? (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InputLabel shrink>{t("createDialog.room", { ns: "bookings" })}</InputLabel>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ height: 40, px: 1.5, border: "1px solid #D0D5DD", borderRadius: "8px", color: "text.secondary" }}>
                        <CircularProgress size={18} />
                        <Typography variant="body2">{t("roomPicker.loading", { ns: "bookings" })}</Typography>
                      </Stack>
                    </Grid>
                  ) : rooms.length ? (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InputLabel shrink>{t("createDialog.room", { ns: "bookings" })}</InputLabel>
                      <EntityPickerField
                        name="roomId"
                        value={values.roomId}
                        onChange={(_, value) => {
                          onChange("roomId", value);
                        }}
                        onOpenPicker={onOpenPicker}
                        isMoreOptions={
                          (metaAvailabelRooms?.totalPages || 1) > 1
                        }
                        placeholder={t("createDialog.chooseAvailableRoom", { ns: "bookings" })}
                        size="small"
                      >
                        {rooms.map((room) => (
                          <MenuItem key={room.id} value={room.id}>
                            {room.name} - {room.roomType.name}
                          </MenuItem>
                        ))}
                      </EntityPickerField>
                    </Grid>
                  ) : (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InputLabel shrink>{t("createDialog.room", { ns: "bookings" })}</InputLabel>
                      <Box sx={{ minHeight: 40, display: "flex", alignItems: "center", px: 1.5, border: "1px solid #E4E7EC", borderRadius: "8px", bgcolor: "#F9FAFB" }}>
                        <Typography variant="body2" color="text.secondary">{t("createDialog.noAvailableRooms", { ns: "bookings" })}</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>

                {rooms.length > 0 && !loadingRooms && (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 10 }}>
                      <InputLabel shrink>{t("createDialog.promotionCode", { ns: "bookings" })}</InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder={t("createDialog.promotionPlaceholder", { ns: "bookings" })}
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
                    <Grid size={{ xs: 12, sm: 2 }} display="flex" alignItems="flex-end">
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={onApplyPromo}
                        disabled={!values.roomId}
                        sx={{ minWidth: { sm: 92 }, height: 40, borderRadius: "8px" }}
                      >
                        {t("createDialog.applyPromotion", { ns: "bookings" })}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>

              {pricing && (
                <Box sx={{ bgcolor: "#F9FAFB", border: "1px solid #E4E7EC", borderRadius: "10px", p: 2 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#475467", mb: 1.5 }}>{t("createDialog.priceSummary", { ns: "bookings" })}</Typography>
                  <Grid container spacing={0.5}>
                    <Grid size={{ xs: 0, sm: 6 }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} container>
                      <Grid size={6}>
                        <Typography>{t("createDialog.unitPrice", { ns: "bookings" })}</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>
                          {t("currency.perNight", { ns: "bookings", value: pricing.basePrice?.toLocaleString() })}
                        </Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography>{t("detail.nights", { ns: "bookings" })}:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>{nights}</Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography>{t("detail.subtotal", { ns: "bookings" })}:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>
                          {t("currency.amount", { ns: "bookings", value: pricing.subtotal?.toLocaleString() })}
                        </Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography>{t("detail.discount", { ns: "bookings" })}:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography>
                          −{t("currency.amount", { ns: "bookings", value: pricing.totalDiscount?.toLocaleString() })}
                        </Typography>
                      </Grid>

                      <Grid size={6}>
                        <Typography fontWeight={700}>{t("detail.total", { ns: "bookings" })}:</Typography>
                      </Grid>
                      <Grid size={6} textAlign="right">
                        <Typography fontWeight={700}>
                          {(
                            pricing.subtotal - pricing.totalDiscount
                          )?.toLocaleString()}{" "}
                          {t("currency.code", { ns: "bookings" })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ position: "sticky", bottom: 0, zIndex: 2, bgcolor: "#FFFFFF", px: { xs: 2, sm: 3 }, py: 1.5, borderTop: "1px solid #E4E7EC" }}>
            <Button variant="outlined" color="inherit" onClick={closeDialog}>
              {t("actions.cancel", { ns: "common" })}
            </Button>
            <Button
              variant="contained"
              disabled={!values.roomId || submitting}
              type="submit"
            >
              {t("createDialog.create", { ns: "bookings" })}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
