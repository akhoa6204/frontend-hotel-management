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
import { useTranslation } from "react-i18next";
export type BookingForm = BookingCreationRequest;
const useBooking = () => {
  const { t, i18n } = useTranslation("client");
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
      locale: i18n.resolvedLanguage === "en" ? "EN" : "VI",
    },
    (form) => {
      const validationErrors: Partial<Record<keyof BookingForm, string>> = {};
      const fullName = form.guestName?.trim() || "";
      const phone = form.guestPhone?.trim() || "";
      const email = form.guestEmail?.trim() || "";
      const checkIn = form.checkInDate || "";
      const checkOut = form.checkOutDate || "";

      if (!fullName) validationErrors.guestName = t("booking.validation.guestNameRequired");
      if (!phone) validationErrors.guestPhone = t("booking.validation.phoneRequired");
      else if (!/^\d{9,11}$/.test(phone)) validationErrors.guestPhone = t("booking.validation.phoneInvalid");
      if (!email) validationErrors.guestEmail = t("booking.validation.emailRequired");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.guestEmail = t("booking.validation.emailInvalid");
      if (!checkIn) validationErrors.checkInDate = t("booking.validation.checkInRequired");
      if (!checkOut) validationErrors.checkOutDate = t("booking.validation.checkOutRequired");

      if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        if (isNaN(start.getTime())) validationErrors.checkInDate = t("booking.validation.checkInInvalid");
        if (isNaN(end.getTime())) validationErrors.checkOutDate = t("booking.validation.checkOutInvalid");
        if (!validationErrors.checkInDate && !validationErrors.checkOutDate && start >= end) {
          validationErrors.checkOutDate = t("booking.validation.checkOutAfterCheckIn");
        }
      }

      return validationErrors;
    },
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
        showError(t("booking.errors.missingRoom"));
        return;
      }

      return GuestBookingService.create({
        ...data,
        locale: i18n.resolvedLanguage === "en" ? "EN" : "VI",
      });
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
      showError(msg || t("booking.errors.creationFailed"));
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
    onError: () => showError(t("booking.errors.quoteFailed")),
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
