import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import useSnackbar from "@hooks/useSnackbar";
import MyBookingService from "@services/me/booking.service";
import MyReviewService from "@services/me/review.service";
import type { BookingStatus } from "@enums/BookingStatus";
import type { BookingResponse } from "@constant/response/BookingResponse";
import type { BookingCancelRequest } from "@constant/request/BookingCancelRequest";

export type BookingTab = "upcoming" | "done" | "cancelled";

const PAGE_SIZE = 5;

const mapTabToStatus = (tab: BookingTab): BookingStatus | undefined => {
  switch (tab) {
    case "upcoming":
      return "CONFIRMED";
    case "done":
      return "CHECKED_OUT";
    case "cancelled":
      return "CANCELLED";
    default:
      return undefined;
  }
};

const useMyBooking = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tab, setTab] = useState<BookingTab>("upcoming");
  const [page, setPage] = useState(1);

  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();

  // --- DANH SÁCH BOOKING ---
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["my-bookings", tab, page, PAGE_SIZE],
    queryFn: async () => {
      return MyBookingService.getList({
        page,
        limit: PAGE_SIZE,
      });
    },
  });

  const bookings = (data?.data ?? []).filter((booking) => {
    const bookingStatus = mapTabToStatus(tab);

    if (!bookingStatus) return true;

    return booking.status === bookingStatus;
  });
  const hasReviewedBookings = bookings.some(
    (booking) => booking.status === "CHECKED_OUT" && booking.hasReview,
  );
  const { data: reviews } = useQuery({
    queryKey: ["my-review-index"],
    queryFn: () => MyReviewService.getAllForCurrentCustomer(),
    enabled: hasReviewedBookings,
    staleTime: 5 * 60 * 1000,
  });
  const meta = data?.pagination;
  const totalPages = meta?.totalPages ?? 0;

  const changeTab = (next: BookingTab) => {
    setTab(next);
    setPage(1);
  };

  const onSelectBooking = (id: number | string) =>
    navigate(`/account/bookings/${id}`);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [bookingToCancel, setBookingToCancel] =
    useState<BookingResponse | null>(null);

  const openCancelDialog = (booking: BookingResponse) => {
    setBookingToCancel(booking);
    setCancelReason("");
    setCancelOpen(true);
  };

  const closeCancelDialog = () => {
    setCancelOpen(false);
    setBookingToCancel(null);
    setCancelReason("");
  };

  const cancelMutation = useMutation({
    mutationFn: async (payload: BookingCancelRequest) =>
      MyBookingService.cancel(payload),
    onSuccess: async () => {
      showSuccess("Hủy đặt phòng thành công");
      closeCancelDialog();
      await queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    },
    onError: () => {
      showError("Không thể hủy đặt phòng lúc này. Vui lòng thử lại.");
    },
  });

  const confirmCancel = () => {
    if (!bookingToCancel) return;
    if (!cancelReason.trim()) {
      showError("Vui lòng nhập lý do hủy phòng.");
      return;
    }

    cancelMutation.mutate({
      id: bookingToCancel.id,
      reason: cancelReason.trim(),
    });
  };

  const onReview = (bookingId: string) =>
    navigate("/account/reviews/create", {
      state: {
        bookingId,
      },
    });

  const onViewReview = (reviewId: number) =>
    navigate(`/account/reviews/${reviewId}`);

  const onReBook = (roomTypeId: number, nights: number) => {
    navigate("/search", {
      state: {
        roomTypeId,
        nights,
      },
    });
  };

  return {
    // list + tab
    tab,
    changeTab,
    bookings,
    page,
    totalPages,
    setPage,
    meta,
    loading: isLoading,
    error: isError,
    retry: refetch,
    fetching: isFetching,
    onSelectBooking,
    onReview,
    onViewReview,
    reviews,
    onReBook,

    // cancel dialog
    cancelOpen,
    bookingToCancel,
    cancelReason,
    setCancelReason,
    openCancelDialog,
    closeCancelDialog,
    confirmCancel,
    cancelLoading: cancelMutation.isPending,

    // snackbar
    alert,
    closeSnackbar,
  };
};

export default useMyBooking;
