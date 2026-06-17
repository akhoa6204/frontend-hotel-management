import useSnackbar from "@hooks/useSnackbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { sleep } from "@utils/sleep";
import { diffNights } from "@utils/format";
import MyBookingService from "@services/me/booking.service";
import { BookingCancelRequest } from "@constant/request/BookingCancelRequest";

const useBookingDetail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const { alert, closeSnackbar, showError, showSuccess } = useSnackbar();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking-detail", id],
    queryFn: async () => {
      if (!id) return;
      return MyBookingService.getById(id);
    },
    enabled: !!id,
  });

  const onBack = () => navigate("/account/bookings");

  const onReview = () =>
    navigate("/account/reviews/create", {
      state: { bookingId: id },
    });

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const openCancelDialog = () => {
    setCancelReason("");
    setCancelOpen(true);
  };

  const closeCancelDialog = () => {
    setCancelOpen(false);
    setCancelReason("");
  };

  const cancelMutation = useMutation({
    mutationFn: async (payload: BookingCancelRequest) =>
      MyBookingService.cancel(payload),
    onSuccess: async () => {
      showSuccess("Hủy đặt phòng thành công");
      closeCancelDialog();
      await queryClient.invalidateQueries({ queryKey: ["booking-detail", id] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        "Hủy đặt phòng thất bại, vui lòng thử lại.";
      showError(msg);
    },
  });

  const confirmCancel = () => {
    if (!cancelReason.trim()) {
      showError("Vui lòng nhập lý do hủy phòng.");
      return;
    }
    if (!booking?.id) return;

    cancelMutation.mutate({
      id: booking.id,
      reason: cancelReason.trim(),
    });
  };

  const onReBook = () => {
    if (!booking) return;

    navigate("/search", {
      state: {
        roomTypeId: booking.room.roomType.id,
        nights: diffNights(booking.checkInDate, booking.checkOutDate),
      },
    });
  };

  return {
    booking,
    loadingBooking: isLoading,
    onBack,
    onReview,
    alert,
    closeSnackbar,

    onReBook,
    confirmCancel,

    cancelOpen,
    cancelReason,
    setCancelReason,
    openCancelDialog,
    closeCancelDialog,
  };
};

export default useBookingDetail;
