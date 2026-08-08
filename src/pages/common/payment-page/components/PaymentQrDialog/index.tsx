import type { QrState } from "@constant/internal/QrState";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

interface Props {
  qrState: QrState;
  closePaymentDialog: () => void;
  isPendingCreateQr: boolean;
}

const PaymentQrDialog = ({ qrState, closePaymentDialog, isPendingCreateQr }: Props) => (
  <Dialog
    open={qrState.open}
    onClose={closePaymentDialog}
    maxWidth="xs"
    fullWidth
    PaperProps={{ sx: { borderRadius: 2, bgcolor: "#fff", backgroundImage: "none" } }}
  >
    <DialogTitle sx={{ px: { xs: 2.5, sm: 3.5 }, pt: 3, pb: 1, fontFamily: "Georgia, serif", fontSize: 27, color: "#183746" }}>
      Thanh toán bằng mã QR
    </DialogTitle>
    <DialogContent sx={{ px: { xs: 2.5, sm: 3.5 } }}>
      <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
        Quét mã bằng ứng dụng ngân hàng. Bạn có thể đóng cửa sổ này trong khi hệ thống tiếp tục kiểm tra giao dịch.
      </Typography>

      <Stack alignItems="center" spacing={2.25} sx={{ py: 3 }}>
        {isPendingCreateQr || !qrState.qrUrl ? (
          <>
            <CircularProgress size={34} />
            <Typography color="text.secondary">Đang tạo mã QR thanh toán...</Typography>
          </>
        ) : (
          <>
            <Box sx={{ width: "min(260px, 100%)", aspectRatio: "1", p: 1.5, border: "1px solid #dedbd4", bgcolor: "#fff" }}>
              <Box component="img" src={qrState.qrUrl} alt="Mã QR thanh toán tiền cọc" sx={{ display: "block", width: 1, height: 1, objectFit: "contain" }} />
            </Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#183746" }}>
              <AccountBalanceOutlinedIcon sx={{ fontSize: 20, color: "primary.main" }} />
              <Typography fontWeight={700}>Nội dung chuyển khoản: DH{qrState.onlinePaymentId}</Typography>
            </Stack>
          </>
        )}
      </Stack>

      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ lineHeight: 1.65 }}>
        Không tải lại trang sau khi thanh toán. Trạng thái được cập nhật tự động khi hệ thống ghi nhận giao dịch.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: { xs: 2.5, sm: 3.5 }, pb: 3, pt: 2 }}>
      <Button onClick={closePaymentDialog} variant="outlined" fullWidth sx={{ minHeight: 46, borderRadius: 1.25, color: "#183746", borderColor: "#b9c3c7" }}>
        Đóng
      </Button>
    </DialogActions>
  </Dialog>
);

export default PaymentQrDialog;
