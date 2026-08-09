import CloseRounded from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reason: string;
  onChangeReason: (value: string) => void;
  loading: boolean;
}

const CancelBookingDialog = ({
  open,
  onClose,
  onConfirm,
  reason,
  onChangeReason,
  loading,
}: Props) => {
  const [reasonError, setReasonError] = useState(false);

  useEffect(() => {
    if (!open) setReasonError(false);
  }, [open]);

  const handleReasonChange = (value: string) => {
    if (value.trim()) setReasonError(false);
    onChangeReason(value);
  };

  const handleConfirm = () => {
    if (!reason.trim()) {
      setReasonError(true);
      return;
    }
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      aria-labelledby="cancel-booking-dialog-title"
      maxWidth={false}
      fullWidth
      slotProps={{
        backdrop: { sx: { bgcolor: "rgba(15, 28, 33, 0.42)" } },
        paper: {
          sx: {
            width: { xs: "calc(100% - 32px)", sm: 560 },
            maxWidth: 560,
            m: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: "#FCFBF8",
            boxShadow: "0 20px 55px rgba(18, 42, 51, 0.18)",
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogTitle
        id="cancel-booking-dialog-title"
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          pt: { xs: 2.5, sm: 3 },
          pb: 0,
          pr: { xs: 7, sm: 8 },
          color: "text.primary",
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: { xs: 22, sm: 24 },
          lineHeight: 1.25,
        }}
      >
        Xác nhận hủy đặt phòng
      </DialogTitle>

      <IconButton
        onClick={onClose}
        disabled={loading}
        aria-label="Đóng hộp thoại hủy đặt phòng"
        sx={{
          position: "absolute",
          right: { xs: 12, sm: 18 },
          top: { xs: 12, sm: 18 },
          width: 40,
          height: 40,
          color: "text.secondary",
          "&:hover": { bgcolor: "rgba(23, 60, 75, 0.06)", color: "text.primary" },
        }}
      >
        <CloseRounded fontSize="small" />
      </IconButton>

      <DialogContent sx={{ px: { xs: 2.5, sm: 3.5 }, pt: 1.25, pb: 0 }}>
        <Typography sx={{ color: "#263F49", fontWeight: 600, mb: 0.5 }}>
          Bạn có chắc muốn hủy đặt phòng này?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2.5 }}>
          Vui lòng cho chúng tôi biết lý do để khách sạn có thể ghi nhận yêu cầu của bạn.
        </Typography>

        <Stack spacing={0.85}>
          <Typography component="label" htmlFor="cancel-booking-reason" variant="body2" fontWeight={600}>
            Lý do hủy phòng{" "}
            <Box component="span" sx={{ color: "error.main" }} aria-hidden>
              *
            </Box>
          </Typography>
          <TextField
            id="cancel-booking-reason"
            multiline
            rows={3}
            fullWidth
            required
            error={reasonError}
            helperText={reasonError ? "Vui lòng nhập lý do hủy phòng." : " "}
            placeholder="Nhập lý do hủy phòng của bạn…"
            value={reason}
            onChange={(event) => handleReasonChange(event.target.value)}
            disabled={loading}
            inputProps={{ "aria-describedby": reasonError ? "cancel-booking-reason-helper-text" : undefined }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                bgcolor: "rgba(255,255,255,.72)",
                fontSize: 14,
                alignItems: "flex-start",
                "& fieldset": { borderColor: "rgba(23, 60, 75, 0.16)" },
                "&:hover fieldset": { borderColor: "rgba(23, 60, 75, 0.30)" },
                "&.Mui-focused fieldset": { borderWidth: 1.5 },
              },
              "& .MuiFormHelperText-root": { mx: 0, mt: 0.65, minHeight: 18, fontSize: 12 },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          pt: 1.25,
          pb: { xs: 2.5, sm: 3 },
          gap: 1.25,
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "flex-end",
          "& > :not(style) ~ :not(style)": { ml: 0 },
          "& .MuiButton-root": { minHeight: 42, px: 2.25, width: { xs: 1, sm: "auto" } },
        }}
      >
        <Button variant="contained" onClick={onClose} disabled={loading}>
          Giữ đặt phòng
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={handleConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {loading ? "Đang hủy…" : "Xác nhận hủy"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelBookingDialog;
