import useSnackbar from "@hooks/useSnackbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { diffNights } from "@utils/format";
import MyBookingService from "@services/me/booking.service";
import type { BookingCancelRequest } from "@constant/request/BookingCancelRequest";

const useBookingDetail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const { alert, closeSnackbar, showError, showSuccess } = useSnackbar();

  const { data: booking, isLoading, isError } = useQuery({
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
    onError: () => {
      showError("Không thể hủy đặt phòng lúc này. Vui lòng thử lại.");
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
    bookingError: isError,
    onBack,
    onReview,
    alert,
    closeSnackbar,

    onReBook,
    confirmCancel,
    cancelling: cancelMutation.isPending,

    cancelOpen,
    cancelReason,
    setCancelReason,
    openCancelDialog,
    closeCancelDialog,
  };
};

export default useBookingDetail;
