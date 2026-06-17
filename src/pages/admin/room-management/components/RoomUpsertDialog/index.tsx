import { DialogState } from "@constant/internal/DialogState";
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
  Paper,
  Box,
} from "@mui/material";
import { RoomUpdateRequest } from "@constant/request/RoomUpdateRequest";
import { AmenityResponse } from "@constant/response/AmenityResponse";
import { RoomTypeResponse } from "@constant/response/RoomTypeResponse";

type Props = {
  state: DialogState;
  roomTypes: RoomTypeResponse[];
  values: RoomUpdateRequest;
  onChange: (field: keyof RoomUpdateRequest, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export default function RoomUpsertDialog({
  state,
  roomTypes,
  values,
  onChange,
  onSubmit,
  onClose,
}: Props) {
  const selectedType = roomTypes.find(
    (r) => r.id === Number(values.roomTypeId),
  );
  console.log(values);
  return (
    <Dialog open={state.open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle fontWeight={700}>
          {state.mode === "CREATE" ? "Thêm phòng" : "Chi tiết phòng"}
        </DialogTitle>

        <DialogContent>
          {/* Tên phòng */}
          <TextField
            fullWidth
            placeholder="Nhập tên phòng"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            size="small"
          />

          {/* Loại phòng + thông tin tóm tắt */}
          <Paper variant="outlined" sx={{ mt: 1.5, p: 1.5, borderRadius: 2 }}>
            <Typography sx={{ mb: 0.5 }} fontWeight={600}>
              Loại phòng
            </Typography>
            <Select
              fullWidth
              size="small"
              value={Number(values.roomTypeId)}
              onChange={(e) =>
                onChange("roomTypeId", Number(e.target.value) || "")
              }
            >
              {roomTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>

            {selectedType && (
              <Grid
                container
                sx={{ mt: 1.5, bgcolor: "#2E90FA0d", p: 1.5, borderRadius: 4 }}
              >
                <Grid size={4}>
                  <Typography variant="caption" color="text.secondary">
                    Giá tiền
                  </Typography>
                  <Typography fontWeight={600}>
                    {Number(selectedType.basePrice).toLocaleString("vi-VN")} VND
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography variant="caption" color="text.secondary">
                    Số người
                  </Typography>
                  <Typography fontWeight={600}>
                    {selectedType.capacity}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography variant="caption" color="text.secondary">
                    Dịch vụ
                  </Typography>
                  {selectedType.amenities?.map((amenity: AmenityResponse) => (
                    <Typography key={amenity.label} variant="body2">
                      {amenity.label}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            )}
          </Paper>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Lưu
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
