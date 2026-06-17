import { useBookingManagementContext } from "@context/booking-management";
import { InvoiceResponse } from "@constant/response/InvoiceResponse";
import { PaymentMethod } from "@enums/PaymentMethod";
import { PaymentStatus } from "@enums/PaymentStatus";
import { PaymentType } from "@enums/PaymentType";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { fmtVND, formatDate } from "@utils/format";

function Row({
  label,
  value,
  color,
  fontWeight,
}: {
  label: string;
  value: number;
  color?: string;
  fontWeight?: number;
}) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography color={color} fontWeight={fontWeight}>
        {fmtVND(value)}đ
      </Typography>
    </Box>
  );
}
export default function BookingPaymentTab() {
  const {
    loadingInvoiceDetail,
    invoiceSummary,
    invoiceDetail,
    handleCreateQr,
    formViewBooking,
    onSubmitFormViewBooking,
    onChangeFormViewBooking,
    disablePay,
    getLabelMethod,
    getLabelStatus,
    getLabelType,
  } = useBookingManagementContext();
  const now = new Date();
  return (
    <>
      {loadingInvoiceDetail || !invoiceSummary ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          minHeight={300}
          spacing={2}
        >
          <CircularProgress size={28} />
          <Typography variant="body2">
            Đang tải thông tin thanh toán...
          </Typography>
        </Stack>
      ) : (
        <Box display="flex" gap={3}>
          {/* Payment history */}
          <Paper sx={{ flex: 2, p: 1.5 }}>
            <Typography fontWeight={600} mb={2}>
              Lịch sử thanh toán
            </Typography>

            <List>
              {invoiceDetail?.payments?.map((p) => (
                <ListItem
                  key={p.id}
                  divider
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "#f7f7f7",
                    },
                  }}
                  onClick={
                    new Date(p.expiredAt) > now && p.status == "PENDING"
                      ? () => handleCreateQr(p.id)
                      : () => {}
                  }
                >
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* Left */}
                    <Box>
                      <Typography fontWeight={600}>
                        {getLabelMethod[p.method]}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {getLabelType[p.type]}{" "}
                        {p.paidAt &&
                          `• ${formatDate(p.paidAt, { withTime: true, withWeekday: true })}`}
                      </Typography>
                    </Box>

                    {/* Right */}
                    <Box textAlign="right">
                      <Typography fontWeight={700} fontSize={15}>
                        {fmtVND(p.amount)}đ
                      </Typography>

                      <Box
                        sx={{
                          mt: 0.5,
                          px: 1.2,
                          py: 0.3,
                          borderRadius: 1,
                          fontSize: 12,
                          fontWeight: 600,
                          display: "inline-block",
                          bgcolor:
                            p.status === "SUCCESS" ? "#2E90FA0d" : "#FFF4E5",
                          color: p.status === "SUCCESS" ? "#2E90FA" : "#ED6C02",
                        }}
                      >
                        {new Date(p.expiredAt) < now && p.status === "PENDING"
                          ? "Quá hạn"
                          : getLabelStatus[p.status]}
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Payment summary */}
          <Paper
            sx={{ flex: 1, p: 1.5 }}
            component={"form"}
            onSubmit={onSubmitFormViewBooking}
          >
            <Typography fontWeight={600} mb={2}>
              Tổng thanh toán
            </Typography>

            <Stack spacing={1}>
              <Row label="Tiền phòng" value={invoiceSummary.roomAmount} />
              <Row label="Dịch vụ" value={invoiceSummary.serviceAmount} />

              <Divider sx={{ my: 1 }} />

              <Row label="Tạm tính" value={invoiceSummary.subtotal} />

              <Row
                label="Giảm giá"
                value={-invoiceSummary.discount}
                color="error.main"
              />

              <Row label="Thuế" value={invoiceSummary.tax} />

              <Divider sx={{ my: 1 }} />

              <Row
                label="Tổng cộng"
                value={invoiceSummary.total}
                fontWeight={700}
              />

              <Row
                label="Đã thanh toán"
                value={invoiceSummary.paid}
                color="success.main"
              />

              <Row
                label="Còn lại"
                value={invoiceSummary.remain}
                color="warning.main"
                fontWeight={700}
              />
            </Stack>

            <Box mt={1}>
              <Typography variant="body2" mb={0.5}>
                Phương thức thanh toán
              </Typography>

              <TextField
                select
                size="small"
                value={formViewBooking.method}
                onChange={(e) =>
                  onChangeFormViewBooking(
                    "method",
                    e.target.value as PaymentMethod,
                  )
                }
                fullWidth
              >
                <MenuItem value={"CASH"}>Tiền mặt</MenuItem>
                <MenuItem value={"BANK_TRANSFER"}>Thanh toán online</MenuItem>
              </TextField>
            </Box>
            <Button
              fullWidth
              variant="contained"
              disabled={disablePay}
              sx={{
                mt: 1,
                bgcolor: "#2E90FA",
                "&:hover": { bgcolor: "#1e8f5c" },
              }}
              type="submit"
            >
              Thanh toán
            </Button>
          </Paper>
        </Box>
      )}
    </>
  );
}
