import useSnackbar from "@hooks/useSnackbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useForm from "@hooks/useForm";
import useAuth from "@hooks/useAuth";
import type { AxiosError } from "axios";
import type { QuoteResponse } from "@constant/response/QuoteResponse";
import type { BookingCreationRequest } from "@constant/request/BookingCreationRequest";
import GuestRoomService from "@services/guest/room.service";
import GuestBookingService from "@services/guest/booking.service";
const validateForm = (form: BookingForm) => {
  const errors: Partial<Record<keyof BookingForm, string>> = {};

  const fullName = form.guestName?.trim() || "";
  const phone = form.guestPhone?.trim() || "";
  const email = form.guestEmail?.trim() || "";
  const checkIn = form.checkInDate || "";
  const checkOut = form.checkOutDate || "";

  if (!fullName) {
    errors.guestName = "Vui lòng nhập họ tên người đặt phòng";
  }

  if (!phone) {
    errors.guestPhone = "Vui lòng nhập số điện thoại";
  } else if (!/^\d{9,11}$/.test(phone)) {
    errors.guestPhone = "Số điện thoại không hợp lệ";
  }

  if (!email) {
    errors.guestEmail = "Vui lòng nhập email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.guestEmail = "Email không hợp lệ";
  }

  if (!checkIn) {
    errors.checkInDate = "Vui lòng chọn ngày nhận phòng";
  }

  if (!checkOut) {
    errors.checkOutDate = "Vui lòng chọn ngày trả phòng";
  }

  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime())) {
      errors.checkInDate = "Ngày nhận phòng không hợp lệ";
    }

    if (isNaN(end.getTime())) {
      errors.checkOutDate = "Ngày trả phòng không hợp lệ";
    }

    if (!errors.checkInDate && !errors.checkOutDate && start >= end) {
      errors.checkOutDate = "Ngày trả phòng phải sau ngày nhận phòng";
    }
  }

  return errors;
};
export type BookingForm = BookingCreationRequest;
const useBooking = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { state } = useLocation() as {
    state?: { roomId?: number; startDate?: string; endDate?: string };
  };

  useEffect(() => {
    if (!state?.roomId || !state?.startDate || !state.endDate) {
      navigate("/search");
    }
  }, [navigate, state?.roomId, state?.startDate, state?.endDate]);

  const { alert, showError, closeSnackbar } = useSnackbar();

  const {
    form: bookingForm,
    onChangeField,
    errors,
    onSubmit,
  } = useForm<BookingForm>(
    {
      guestName: auth.user?.fullName || "",
      guestPhone: auth.user?.phone || "",
      guestEmail: auth.user?.email || "",
      bookingForSomeoneElse: false,
      estimatedArrivalTime: "14:00",
      checkInDate: state?.startDate ?? "",
      checkOutDate: state?.endDate ?? "",
      roomId: state?.roomId ?? 0,
      customerId: auth.user?.id,
    },
    validateForm,
    async () => {
      if (mCreateBooking.isPending) return;
      await mCreateBooking.mutateAsync(bookingForm);
    },
  );

  const {
    data: room,
    isLoading: loadingRoom,
    isFetching: fetchingRoom,
  } = useQuery({
    queryKey: ["room-detail", state?.roomId],
    queryFn: async () => {
      return GuestRoomService.getById(Number(state?.roomId));
    },
    enabled: !!state?.roomId,
  });
  const mCreateBooking = useMutation({
    mutationFn: async (data: BookingCreationRequest) => {
      if (!data.roomId) {
        showError("Thiếu thông tin phòng");
        return;
      }

      return GuestBookingService.create(data);
    },
    onSuccess: (data) => {
      navigate(`/payment`, {
        state: {
          booking: data,
        },
      });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const msg = error.response?.data?.message;
      showError(msg || "Tạo đặt phòng thất bại");
    },
  });

  const [pricing, setPricing] = useState<QuoteResponse>();

  const {
    mutate: quoteBooking,
    isPending: loadingQuote,
  } = useMutation({
    mutationFn: async () => {
      return await GuestBookingService.quote({
        roomId: bookingForm.roomId,
        startDate: bookingForm.checkInDate,
        endDate: bookingForm.checkOutDate,
        promotionCode: bookingForm.promotionCode,
      });
    },
    onSuccess: (data) => setPricing(data),
    onError: () => showError("Không thể cập nhật giá cho kỳ nghỉ này"),
  });
  useEffect(() => {
    if (!room) return;
    quoteBooking();
  }, [quoteBooking, room]);

  const loadingRoomDetail = loadingRoom || fetchingRoom;
  const loadingCreateBooking = mCreateBooking.isPending;
  return {
    room,
    loadingRoom,
    fetchingRoom,

    bookingForm,
    onChangeField,
    errors,

    alert,
    closeSnackbar,

    pricing,

    loadingRoomDetail,
    loadingCreateBooking,
    loadingQuote,

    onSubmit,
  };
};

export default useBooking;
