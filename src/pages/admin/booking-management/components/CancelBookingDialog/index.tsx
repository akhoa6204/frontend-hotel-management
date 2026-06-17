import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";
import { useBookingManagementContext } from "@context/booking-management";

const CancelBookingDialog = () => {
  const {
    cancelOpen,
    closeCancelDialog,
    confirmCancel,
    cancelReason,
    setCancelReason,
  } = useBookingManagementContext();
  return (
    <Dialog
      open={cancelOpen}
      onClose={closeCancelDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 0, overflow: "visible" },
      }}
    >
      {/* nút X */}
      <IconButton
        size="small"
        onClick={confirmCancel}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ pt: 5, pb: 3, px: 4 }}>
        {/* icon tròn đỏ */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#FFE5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "#E53935" }} />
          </Box>
        </Box>

        {/* tiêu đề + mô tả */}
        <Typography
          align="center"
          fontWeight={600}
          mb={0.5}
          variant="subtitle1"
        >
          Xác nhận hủy đặt phòng
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Vui lòng cho chúng tôi biết lý do bạn muốn hủy đặt phòng này.
        </Typography>

        {/* lý do hủy */}
        <Stack spacing={1} mb={3}>
          <Typography variant="body2" fontWeight={500}>
            Lý do hủy phòng{" "}
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>
          </Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder="Nhập lý do hủy phòng của bạn…"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </Stack>

        {/* nút hành động */}
        <Stack spacing={1.2} direction={"row"}>
          <Button
            variant="contained"
            fullWidth
            onClick={confirmCancel}
            sx={{
              bgcolor: "#E53935",
              textTransform: "none",
              "&:hover": { bgcolor: "#C62828" },
            }}
          >
            Xác nhận hủy
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={closeCancelDialog}
            sx={{
              textTransform: "none",
              bgcolor: "#fafafa",
            }}
          >
            Giữ đặt phòng
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CancelBookingDialog;
