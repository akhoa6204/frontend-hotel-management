import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { GlobalSnackbar } from "@components";
import BookingInformation from "./components/BookingInformation";
import BookingRoomAndPrice from "./components/BookingRoomAndPrice";
import BookingStayOverview from "./components/BookingStayOverview";
import CancelBookingDialog from "./components/CancelBookingDialog";
import useBookingDetail from "./useBookingDetail";
import { getBookingReviewAction } from "@utils/bookingReview";

const statusLabels = {
  PENDING: "Đang chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CANCELLED: "Đã hủy",
  CHECKED_IN: "Đang lưu trú",
  CHECKED_OUT: "Đã hoàn tất",
} as const;

const statusColors = {
  PENDING: { color: "#8A6116", background: "#FFF6DD" },
  CONFIRMED: { color: "#176B59", background: "#EAF7F2" },
  CANCELLED: { color: "#A13D38", background: "#FCEDEC" },
  CHECKED_IN: { color: "#185E86", background: "#EAF4FA" },
  CHECKED_OUT: { color: "#565D66", background: "#EFF1F3" },
} as const;

const BookingDetailPage = () => {
  const {
    booking,
    existingReview,
    loadingReviews,
    loadingBooking,
    bookingError,
    onBack,
    alert,
    closeSnackbar,
    onReBook,
    onReview,
    onViewReview,
    confirmCancel,
    cancelling,
    cancelOpen,
    cancelReason,
    setCancelReason,
    openCancelDialog,
    closeCancelDialog,
  } = useBookingDetail();

  if (loadingBooking) {
    return (
      <Stack minHeight={420} alignItems="center" justifyContent="center" spacing={2}>
        <CircularProgress size={28} thickness={3} />
        <Typography color="text.secondary">Đang tải thông tin kỳ nghỉ…</Typography>
      </Stack>
    );
  }

  if (bookingError || !booking) {
    return (
      <Stack minHeight={420} alignItems="center" justifyContent="center" spacing={2} textAlign="center">
        <ErrorOutlineRounded sx={{ color: "text.secondary", fontSize: 38 }} />
        <Box>
          <Typography variant="h6" fontWeight={600}>Không thể tải đặt phòng</Typography>
          <Typography color="text.secondary" mt={0.5}>
            Đặt phòng không tồn tại hoặc hiện chưa thể truy cập.
          </Typography>
        </Box>
        <Button onClick={onBack} startIcon={<ArrowBackRounded />} sx={{ textTransform: "none" }}>
          Trở về đặt phòng của tôi
        </Button>
      </Stack>
    );
  }

  const canRebook = booking.status === "CHECKED_OUT" || booking.status === "CANCELLED";
  const reviewAction = loadingReviews
    ? { type: "none" as const }
    : getBookingReviewAction(booking, booking.id, existingReview);
  const statusStyle = statusColors[booking.status];

  return (
    <Box sx={{ width: 1, pb: { xs: 4, md: 6 } }}>
      <Button
        onClick={onBack}
        startIcon={<ArrowBackRounded />}
        sx={{ color: "text.secondary", textTransform: "none", px: 0, mb: { xs: 2.5, md: 3.5 } }}
      >
        Đặt phòng của tôi
      </Button>

      <Box component="header" sx={{ mb: { xs: 2.25, md: 3 } }}>
        <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={{ xs: 1.5, sm: 2 }}>
          <Box>
            <Typography
              component="p"
              sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", mb: 1 }}
            >
              KỲ NGHỈ CỦA BẠN
            </Typography>
            <Typography
              component="h1"
              sx={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 32, md: 44 }, lineHeight: 1.12, color: "#173C4B" }}
            >
              {booking.room.roomType.name}
            </Typography>
            <Typography color="text.secondary" mt={1} fontSize={14}>
              Mã đặt phòng: {booking.bookingCode}
            </Typography>
          </Box>
          <Box
            role="status"
            sx={{ alignSelf: { xs: "flex-start", sm: "center" }, display: "inline-flex", alignItems: "center", gap: 1, px: 1.5, py: 0.75, borderRadius: 99, color: statusStyle.color, bgcolor: statusStyle.background, fontSize: 13, fontWeight: 650 }}
          >
            <Box aria-hidden sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "currentColor" }} />
            {statusLabels[booking.status]}
          </Box>
        </Stack>
      </Box>

      <BookingStayOverview booking={booking} />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.5fr) minmax(300px, .8fr)" }, gap: { xs: 4, md: 3.5, xl: 4.5 }, mt: { xs: 4, md: 5.5 }, alignItems: "stretch" }}>
        <BookingInformation booking={booking} />
        <BookingRoomAndPrice booking={booking} />
      </Box>

      <Box component="section" sx={{ mt: { xs: 4, md: 5.5 }, pt: { xs: 3, md: 3.5 }, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography component="h2" sx={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "#173C4B", fontSize: 24, mb: 1 }}>
          Chính sách đặt phòng
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7 }}>
          {booking.refundable
            ? "Đặt phòng này được ghi nhận là có thể hoàn tiền. Điều kiện và số tiền hoàn thực tế được áp dụng theo xác nhận của khách sạn."
            : "Đặt phòng này được ghi nhận là không hoàn tiền. Vui lòng liên hệ khách sạn nếu bạn cần hỗ trợ."}
        </Typography>
      </Box>

      {(booking.status === "CONFIRMED" || canRebook) && (
        <Stack
          component="section"
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          spacing={1}
          sx={{ mt: { xs: 3, md: 3.25 }, pt: 2.25, borderTop: "1px solid", borderColor: "divider", "& .MuiButton-root": { minHeight: 42, textTransform: "none", px: 2.25, width: { xs: 1, sm: "auto" } } }}
        >
          <Box>
            <Typography fontWeight={650} color="#173C4B">Quản lý đặt phòng</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.2}>Các thao tác hiện có cho đặt phòng này.</Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ width: { xs: 1, sm: "auto" } }}
          >
            {booking.status === "CONFIRMED" && (
              <Button color="error" variant="outlined" onClick={openCancelDialog}>
                Hủy đặt phòng
              </Button>
            )}
            {canRebook && (
              <Button
                variant="outlined"
                startIcon={<ReplayRounded />}
                onClick={onReBook}
                sx={{ order: { xs: reviewAction.type === "write" ? 2 : 1, sm: 1 } }}
              >
                Đặt lại phòng
              </Button>
            )}
            {reviewAction.type === "write" && (
              <Button
                variant="contained"
                startIcon={<StarOutlineRounded />}
                onClick={onReview}
                sx={{ order: { xs: 1, sm: 2 } }}
              >
                Viết đánh giá
              </Button>
            )}
            {reviewAction.type === "view" && (
              <Button
                variant="outlined"
                startIcon={<StarOutlineRounded />}
                onClick={() => onViewReview(reviewAction.reviewId)}
                sx={{ order: { xs: 1, sm: 2 } }}
              >
                Xem đánh giá
              </Button>
            )}
          </Stack>
        </Stack>
      )}

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
      <CancelBookingDialog
        open={cancelOpen}
        onClose={closeCancelDialog}
        onConfirm={confirmCancel}
        reason={cancelReason}
        onChangeReason={setCancelReason}
        loading={cancelling}
      />
    </Box>
  );
};

export default BookingDetailPage;
