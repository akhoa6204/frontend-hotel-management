import useSnackbar from "@hooks/useSnackbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { diffNights } from "@utils/format";
import MyBookingService from "@services/me/booking.service";
import MyReviewService from "@services/me/review.service";
import type { BookingCancelRequest } from "@constant/request/BookingCancelRequest";
import { useTranslation } from "react-i18next";

const useBookingDetail = () => {
  const { t } = useTranslation("client");
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

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["my-review-index"],
    queryFn: () => MyReviewService.getAllForCurrentCustomer(),
    enabled: booking?.status === "CHECKED_OUT" && booking.hasReview === true,
    staleTime: 5 * 60 * 1000,
  });

  const existingReview = reviews?.find((review) => review.bookingId === booking?.id);

  const onBack = () => navigate("/account/bookings");

  const onReview = () =>
    navigate("/account/reviews/create", {
      state: { bookingId: id },
    });

  const onViewReview = (reviewId: number) =>
    navigate(`/account/reviews/${reviewId}`);

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
      showSuccess(t("bookingDetail.messages.cancelSuccess"));
      closeCancelDialog();
      await queryClient.invalidateQueries({ queryKey: ["booking-detail", id] });
    },
    onError: () => {
      showError(t("bookingDetail.messages.cancelError"));
    },
  });

  const confirmCancel = () => {
    if (!cancelReason.trim()) {
      showError(t("bookingDetail.cancelDialog.reasonRequired"));
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
    existingReview,
    loadingReviews,
    loadingBooking: isLoading,
    bookingError: isError,
    onBack,
    onReview,
    onViewReview,
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
