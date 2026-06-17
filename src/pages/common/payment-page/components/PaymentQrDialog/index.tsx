// Replace your current PaymentQrDialog with this version
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { QrState } from "@constant/internal/QrState";

interface Props {
  qrState: QrState;
  closePaymentDialog: () => void;
  isPendingCreateQr: boolean;
}
export default function PaymentQrDialog({
  qrState,
  closePaymentDialog,
  isPendingCreateQr,
}: Props) {
  return (
    <Dialog
      open={qrState.open}
      onClose={closePaymentDialog}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        {qrState.paid ? "Thanh toán thành công" : "Thanh toán bằng mã QR"}
      </DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          py={qrState.paid ? 3 : 1}
        >
          {qrState.paid ? (
            <>
              <CheckCircleIcon sx={{ fontSize: 96, color: "#00C853" }} />

              <Typography variant="h6" color="#00C853" fontWeight={700}>
                Thanh toán thành công
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Hệ thống đã nhận được giao dịch và cập nhật trạng thái thanh
                toán.
              </Typography>
            </>
          ) : !isPendingCreateQr ? (
            <>
              <img
                src={qrState.qrUrl}
                alt="QR thanh toán"
                style={{
                  width: 260,
                  height: 260,
                  objectFit: "contain",
                }}
              />
              <Typography fontWeight={600}>
                Nội dung chuyển khoản: DH{qrState.onlinePaymentId}
              </Typography>
            </>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <CircularProgress />

              <Typography color="text.secondary">
                Đang tạo mã QR thanh toán...
              </Typography>
            </Box>
          )}

          {!qrState.paid && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Vui lòng quét mã QR để thanh toán. Hệ thống sẽ tự động cập nhật
              sau khi nhận được giao dịch.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={closePaymentDialog}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: 2,
            px: 2.5,
            py: 1,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
