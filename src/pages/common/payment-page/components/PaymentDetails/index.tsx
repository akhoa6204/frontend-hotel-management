import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { fmtVND } from "@utils/format";

interface Props {
  finalTotal: number;
  depositAmount: number;
  remainingBalance: number;
  loading: boolean;
  onPayment: () => void;
}

const PaymentDetails = ({ finalTotal, depositAmount, remainingBalance, loading, onPayment }: Props) => (
  <Box component="section" aria-labelledby="payment-today-title">
    <Typography sx={{ color: "primary.main", letterSpacing: 1.8, fontSize: 11, fontWeight: 750 }}>
      THANH TOÁN HÔM NAY
    </Typography>
    <Typography
      id="payment-today-title"
      component="h2"
      sx={{ mt: 1, fontSize: { xs: 36, sm: 42, md: 48 }, lineHeight: 1.1, fontWeight: 750, color: "text.primary" }}
    >
      {fmtVND(depositAmount)} VND
    </Typography>
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: "text.secondary" }}>
      <AccountBalanceOutlinedIcon sx={{ color: "primary.main", fontSize: 21 }} />
      <Typography>Khoản cọc cho đặt phòng hiện tại</Typography>
    </Stack>

    <Divider sx={{ my: { xs: 4, md: 5 } }} />

    <Typography component="h3" sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 700, color: "text.primary" }}>
      Tóm tắt thanh toán
    </Typography>
    <Stack spacing={1.75} sx={{ mt: 2.5, maxWidth: 620 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography color="text.secondary">Tổng giá trị kỳ nghỉ</Typography>
        <Typography fontWeight={650}>{fmtVND(finalTotal)} VND</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography color="text.secondary">Thanh toán hôm nay</Typography>
        <Typography fontWeight={700} color="text.primary">{fmtVND(depositAmount)} VND</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography color="text.secondary">Phần còn lại</Typography>
        <Typography fontWeight={650}>{fmtVND(remainingBalance)} VND</Typography>
      </Stack>
    </Stack>

    <Divider sx={{ my: { xs: 4, md: 5 } }} />

    <Box component="section" aria-labelledby="deposit-policy-title">
      <Stack direction="row" spacing={1.25} alignItems="center">
        <InfoOutlinedIcon sx={{ color: "#a36b18", fontSize: 21 }} />
        <Typography id="deposit-policy-title" component="h3" sx={{ fontSize: { xs: 22, md: 25 }, fontWeight: 700, color: "text.primary" }}>
          Điều kiện tiền cọc
        </Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 1.75, maxWidth: 650, lineHeight: 1.75 }}>
        Khoản cọc {fmtVND(depositAmount)} VND được thanh toán bằng mã QR. Phần còn lại được thanh toán theo quy trình hiện tại của khách sạn.
      </Typography>
      <Box component="ul" sx={{ m: 0, mt: 2, pl: 2.5, color: "text.secondary", "& li": { pl: 0.75, mb: 1 } }}>
        <li><Typography variant="body2" sx={{ lineHeight: 1.7 }}>Bạn chỉ được phép hủy trong vòng 24 giờ kể từ thời điểm thanh toán tiền cọc.</Typography></li>
        <li><Typography variant="body2" sx={{ lineHeight: 1.7 }}>Hủy trong thời hạn trên: hoàn lại 100% tiền cọc.</Typography></li>
        <li><Typography variant="body2" sx={{ lineHeight: 1.7 }}>Không đến nhận phòng: mất khoản tiền cọc {fmtVND(depositAmount)} VND.</Typography></li>
      </Box>
    </Box>

    <Button
      variant="contained"
      onClick={onPayment}
      disabled={loading || finalTotal <= 0}
      endIcon={<ArrowForwardRoundedIcon />}
      sx={{ mt: { xs: 4, md: 5 }, minHeight: 52, px: 3.5, borderRadius: 1.25, fontWeight: 700, width: { xs: 1, sm: "auto" } }}
    >
      {loading ? "Đang khởi tạo thanh toán…" : `Thanh toán ${fmtVND(depositAmount)} VND`}
    </Button>
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5, maxWidth: 520, lineHeight: 1.6 }}>
      Mã QR thanh toán sẽ mở trên trang này. Trạng thái giao dịch được cập nhật tự động sau khi hệ thống ghi nhận thanh toán.
    </Typography>
  </Box>
);

export default PaymentDetails;
