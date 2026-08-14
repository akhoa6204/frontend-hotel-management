import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useLocation, useNavigate } from "react-router-dom";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";

import useSocket from "@hooks/useSocket";
import { useEntityPicker } from "@hooks/useEntityPickerDialog";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { BookingCreationRequest } from "@constant/request/BookingCreationRequest";
import type { PaymentCreationRequest } from "@constant/request/PaymentCreationRequest";
import type { PaymentMethod } from "@enums/PaymentMethod";
import type { QuoteResponse } from "@constant/response/QuoteResponse";
import type { InvoiceItemUpdateRequest } from "@constant/request/InvoiceItemUpdateRequest";
import type { BookingResponse } from "@constant/response/BookingResponse";
import type { RoomResponse } from "@constant/response/RoomResponse";
import type { HousekeepingCreationRequest } from "@constant/request/HousekeepingCreationRequest";
import type { HousekeepingUpdateRequest } from "@constant/request/HousekeepingUpdateRequest";
import type { ServiceType } from "@enums/ServiceType";
import type { QrState } from "@constant/internal/QrState";
import type { DialogState } from "@constant/internal/DialogState";
import StaffBookingService from "@services/staff/booking.service";
import StaffInvoiceService from "@services/staff/invoice.service";
import { StaffExtraServiceService } from "@services/staff/extraService.service";
import type { SearchExtraService } from "@constant/internal/SearchExtraService";
import type { InvoiceItemCreationRequest } from "@constant/request/InvoiceItemCreationRequest";
import StaffRoomService from "@services/staff/room.service";
import StaffPaymentService from "@services/staff/payment.service";
import StaffRoomTypeService from "@services/staff/roomType.service";
import StaffHousekeepingService from "@services/staff/housekeeping.service";
import type { BookingCancelRequest } from "@constant/request/BookingCancelRequest";
import { useTranslation } from "react-i18next";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";

export type BookingForm = Omit<BookingCreationRequest, "roomId"> & {
  roomTypeId?: number;
  paymentMethod: PaymentMethod;
  roomId?: number;
};

const defaultBookingFilter: SearchFilter = {
  q: "",
  page: 1,
  limit: 20,
};

export type ServiceFilter = SearchExtraService & SearchFilter;

type BookingInspectionSocketResponse = {
  bookingId: string;
  inspectionTaskId: number;
  inspected: boolean;
};

const validateBookingForm = (form: BookingForm, translate: (key: string) => string) => {
  const errors: Record<string, string> = {};
  if (!form.roomId) {
    errors["roomId"] = translate("validation.roomRequired");
  }
  if (!form.checkInDate) {
    errors["checkInDate"] = translate("validation.checkInRequired");
  }

  if (!form.checkOutDate) {
    errors["checkOutDate"] = translate("validation.checkOutRequired");
  }

  if (
    form.checkInDate &&
    form.checkOutDate &&
    dayjs(form.checkOutDate).isBefore(dayjs(form.checkInDate))
  ) {
    errors["checkOutDate"] = translate("validation.checkOutAfterCheckIn");
  }
  return errors;
};
export default function useBookingManagement() {
  const { t } = useTranslation("bookings");
  const qc = useQueryClient();
  const { alert, showError, showSuccess, closeSnackbar, showWarning } =
    useSnackbar();

  const [filter, setFilter] = useState<SearchFilter>(defaultBookingFilter);
  const [dialog, setDialog] = useState<DialogState>({ open: false });
  const [selectedBookingId, setSelectedBookingId] = useState<string>();
  const {
    form: filterService,
    onChangeField: onChangeFilterService,
    updateForm: updateFilterService,
    resetForm: resetFilterService,
  } = useForm<ServiceFilter>({
    type: "SERVICE",
    page: 1,
    limit: 4,
  });
  const {
    form: formViewBooking,
    onChangeField: onChangeFormViewBooking,
    onSubmit: onSubmitFormViewBooking,
    resetForm: resetFormViewBooking,
  } = useForm<{
    method: PaymentMethod;
  }>({ method: "CASH" }, undefined, async () => {
    const remain = Number(invoiceDetail?.remainingAmount || 0);

    if (!bookingDetail) return;
    const { id: paymentId } = await mCreatePayment.mutateAsync({
      invoiceId: bookingDetail.invoiceId,
      paymentMethod: formViewBooking.method,
      paymentType: "ROOM_PAYMENT",
      amount: Number(remain),
    });

    if (formViewBooking.method === "CASH") {
      await mMarkPaymentAsPaid.mutateAsync(paymentId);
      qc.invalidateQueries({
        queryKey: ["invoice-detail", selectedBookingId],
      });
      showSuccess(t("messages.cashPaymentSuccess"));
      return;
    }

    await handleCreateQr(paymentId);
  });

  const [bookingViewTab, setBookingViewTab] = useState<
    "info" | "service" | "payment" | "housekeeping"
  >("info");

  const {
    selectedId,
    setSelectedId,
    open: openEntityPickerDialog,
    openPicker,
    closePicker,
    select,
    mergeOptions,
    resetEntityPicker,
  } = useEntityPicker<RoomResponse>();

  const onChangeBookingViewTab = (v: "info" | "service" | "payment") =>
    setBookingViewTab(v);
  const onChangePageService = (page: number) =>
    onChangeFilterService("page", page);
  const onChangeTabService = (tab: ServiceType) =>
    updateFilterService({ type: tab, page: 1 });

  const openDialog = (mode: "CREATE" | "VIEW") => {
    return setDialog({ open: true, mode });
  };
  const closeDialog = () => {
    setDialog({ open: false, mode: undefined });
    resetFilterService();
    setBookingViewTab("info");
    resetFormViewBooking();
    resetEntityPicker();
    setSelectedTaskId(null);
    setFiltersHouseKeepingList((pre) => ({ ...pre, page: 1, limit: 5 }));
  };

  const {
    form: bookingForm,
    onChangeField,
    resetForm: resetBookingForm,
    onSubmit: onSubmitBookingForm,
  } = useForm<BookingForm>(
    {
      roomTypeId: undefined,
      roomId: undefined,
      checkInDate: dayjs().format("YYYY-MM-DD"),
      checkOutDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
      promotionCode: "",
      guestName: "",
      guestPhone: "",
      paymentMethod: "CASH",
    },
    (form) => validateBookingForm(form, t),
    async (form: BookingForm) => {
      try {
        const { invoiceId, remainingAmount } =
          await mCreateBooking.mutateAsync(form);

        const { id: paymentId } = await mCreatePayment.mutateAsync({
          invoiceId,
          paymentMethod: form.paymentMethod,
          paymentType: "ROOM_PAYMENT",
          amount: Number(remainingAmount),
        });

        if (form.paymentMethod === "CASH") {
          await mMarkPaymentAsPaid.mutateAsync(paymentId);

          showSuccess(t("messages.bookingAndPaymentSuccess"));
          resetForm();
          return;
        }
        resetForm();
        showSuccess(
          t("messages.bookingCreatedContinuePayment"),
        );
        await handleCreateQr(paymentId);
      } catch (error: Error | any) {
        const msg = error?.message || t("messages.createBookingError");
        showError(msg);
      }
    },
  );

  const [pricing, setPricing] = useState<QuoteResponse>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as
      | { bookingId?: string; action?: "CHECK_IN" | "CHECK_OUT" }
      | undefined;
    if (!state?.bookingId) return;

    onView(state.bookingId);
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const result = params.get("result");
    const paymentId = params.get("paymentId");

    if (result === "success") {
      mMarkPaymentAsPaid.mutateAsync(Number(paymentId));
    } else if (result === "cancel" || result === "fail") {
      mMarkPaymentAsCancelled.mutateAsync(Number(paymentId));
    }

    if (result) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, []);

  const onView = (id: string) => {
    setSelectedBookingId(id);
    openDialog("VIEW");
  };

  const { data: bookingDetail, isLoading: loadingCheckInDetail } = useQuery({
    queryKey: ["booking-detail", selectedBookingId],
    queryFn: async () => {
      return await StaffBookingService.getById(selectedBookingId!);
    },
    enabled: !!selectedBookingId,
  });

  const { data: invoiceDetail, isLoading: loadingInvoiceDetail } = useQuery({
    queryKey: ["invoice-detail", selectedBookingId],
    queryFn: async () => {
      if (!bookingDetail?.invoiceId) return;
      return await StaffInvoiceService.getById(bookingDetail.invoiceId);
    },
    enabled: !!bookingDetail?.invoiceId,
  });

  const { data: servicesResponse, isLoading: loadingServices } = useQuery({
    queryKey: [
      "services",
      filterService.type,
      filterService.q,
      filterService.page,
    ],
    queryFn: async () => await StaffExtraServiceService.getAll(filterService),
  });
  const services = useMemo(
    () => servicesResponse?.data || [],
    [servicesResponse?.data],
  );
  const metaServices = useMemo(
    () => servicesResponse?.pagination,
    [servicesResponse?.pagination],
  );

  const updateService = async (id: number, quantity: number) => {
    await mUpdateService.mutateAsync({ id, quantity });
  };
  const removeService = async (id: number) =>
    await mRemoveService.mutateAsync(id);

  const addService = async (invoiceId: string, serviceId: number) => {
    await mAddService.mutateAsync({ invoiceId, serviceId });
  };
  const mRemoveService = useMutation({
    mutationFn: async (id: number) =>
      await StaffInvoiceService.deleteInvoiceItem(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoice-detail"] });
      qc.invalidateQueries({ queryKey: ["booking-detail"] });
    },
  });

  const mAddService = useMutation({
    mutationFn: async (data: InvoiceItemCreationRequest) =>
      await StaffInvoiceService.addInvoiceItem(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoice-detail"] });
      qc.invalidateQueries({ queryKey: ["booking-detail"] });
    },
  });
  const mUpdateService = useMutation({
    mutationFn: async (data: InvoiceItemUpdateRequest) =>
      await StaffInvoiceService.updateInvoiceItem(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoice-detail"] });
      qc.invalidateQueries({ queryKey: ["booking-detail"] });
    },
  });

  const {
    data: bookingListResponse,
    isLoading: loadingBookingList,
    isError: bookingListError,
  } = useQuery({
      queryKey: ["admin-bookings", filter],
      queryFn: () => StaffBookingService.getList(filter),
  });

  const bookings = bookingListResponse?.data || ([] as BookingResponse[]);
  const pagination = bookingListResponse?.pagination;

  const handleSearchBooking = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter((prev) => ({ ...prev, q: value.trim(), page: 1 }));
  };

  const handleChangePage = (page: number) =>
    setFilter((prev) => ({ ...prev, page }));

  const nights = useMemo(() => {
    const start = dayjs(bookingForm.checkInDate);
    const end = dayjs(bookingForm.checkOutDate);
    const diff = end.diff(start, "day");
    return Math.max(1, Number.isFinite(diff) ? diff : 1);
  }, [bookingForm.checkInDate, bookingForm.checkOutDate]);

  const resetForm = () => {
    resetBookingForm();
    setPricing(undefined);
    closeDialog();
  };

  const canCheckRooms =
    !!bookingForm.checkInDate &&
    !!bookingForm.checkOutDate &&
    dayjs(bookingForm.checkOutDate).isAfter(bookingForm.checkInDate);

  const canQuote = !!bookingForm.roomId && canCheckRooms;

  const [filtersAvailableRooms, setFiltersAvailableRooms] =
    useState<SearchFilter>({
      q: "",
      page: 1,
      limit: 4,
    });

  const openPickerHandler = () => {
    setFiltersAvailableRooms((prev) => ({
      ...prev,
      limit: 6,
      page: 1,
      q: "",
    }));
    openPicker();
  };
  const closePickerHandler = () => {
    setFiltersAvailableRooms((prev) => ({
      ...prev,
      limit: 4,
      page: 1,
      q: "",
    }));
    closePicker();
  };
  const onChangePage = (page: number) => {
    setFiltersAvailableRooms((prev) => ({ ...prev, page }));
  };

  const onSearch = (value: string) =>
    setFiltersAvailableRooms((prev) => ({ ...prev, q: value }));

  const isViewMode = dialog.mode === "VIEW";

  // ===== Available rooms for CREATE booking =====
  const { data: createAvailableRoomsResponse, isLoading: loadingCreateRooms } =
    useQuery({
      queryKey: [
        "available-rooms-create",
        bookingForm.checkInDate,
        bookingForm.checkOutDate,
        bookingForm.roomTypeId,
        filtersAvailableRooms.page,
        filtersAvailableRooms.q,
        filtersAvailableRooms.limit,
      ],
      queryFn: async () =>
        await StaffRoomService.getList({
          startDate: bookingForm.checkInDate,
          endDate: bookingForm.checkOutDate,
          roomTypeId: bookingForm.roomTypeId
            ? Number(bookingForm.roomTypeId)
            : undefined,
          ...filtersAvailableRooms,
        }),
      enabled: canCheckRooms && !isViewMode,
    });

  const { data: changeAvailableRoomsResponse, isLoading: loadingChangeRooms } =
    useQuery({
      queryKey: [
        "available-rooms-change",
        bookingDetail?.id,
        bookingDetail?.checkOutDate,
        filtersAvailableRooms.page,
        filtersAvailableRooms.q,
        filtersAvailableRooms.limit,
      ],
      queryFn: async () => {
        if (!bookingDetail) return;
        const today = dayjs().startOf("day");
        const bookingCheckIn = dayjs(bookingDetail?.checkInDate).startOf("day");

        const effectiveCheckIn = bookingCheckIn.isAfter(today)
          ? bookingCheckIn
          : today;

        return await StaffRoomService.getList({
          startDate: effectiveCheckIn.format("YYYY-MM-DD"),
          endDate: bookingDetail.checkOutDate,
          limit: filtersAvailableRooms.limit,
          page: filtersAvailableRooms.page,
          q: filtersAvailableRooms.q,
        });
      },
      enabled: !!bookingDetail?.id && isViewMode,
    });

  const availableRoomsResponse = isViewMode
    ? changeAvailableRoomsResponse
    : createAvailableRoomsResponse;

  const loadingRooms = isViewMode ? loadingChangeRooms : loadingCreateRooms;

  const availableRooms = useMemo(() => {
    const items = availableRoomsResponse?.data || [];

    if (isViewMode && bookingDetail?.room) {
      const exists = items.some((r: any) => r.id === bookingDetail.room.id);

      const merged = exists ? items : [bookingDetail.room, ...items];

      return mergeOptions(merged);
    }

    return mergeOptions(items);
  }, [availableRoomsResponse?.data, bookingDetail?.room?.id, isViewMode]);

  useEffect(() => {
    if (!isViewMode) return;
    if (!bookingDetail?.room) return;

    select(bookingDetail.room);
  }, [isViewMode, bookingDetail?.room?.id]);
  const metaAvailabelRooms = availableRoomsResponse?.pagination;

  const mQuoteBooking = useMutation({
    mutationFn: async () => {
      if (!canQuote) showError(t("validation.missingRoomOrDates"));
      return await StaffBookingService.quote({
        roomId: Number(bookingForm.roomId),
        startDate: bookingForm.checkInDate,
        endDate: bookingForm.checkOutDate,
        promotionCode: bookingForm.promotionCode,
      });
    },
    onSuccess: (data) => {
      setPricing(data);
      if (bookingForm.promotionCode) {
        if (data.totalDiscount > 0) {
          showSuccess(t("messages.promotionApplied", {
            code: bookingForm.promotionCode,
            discount: data.totalDiscount.toLocaleString(),
          }));
        } else {
          showError(t("messages.promotionNotApplicable"));
        }
      }
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        t("messages.promotionApplyError");
      showError(msg);
    },
  });

  useEffect(() => {
    const shouldQuote =
      bookingForm.roomId &&
      dayjs(bookingForm.checkOutDate).isAfter(bookingForm.checkInDate);

    if (!shouldQuote) return;

    (async () => {
      try {
        const data = await mQuoteBooking.mutateAsync();
        setPricing(data);
      } catch {}
    })();
  }, [bookingForm.roomId, bookingForm.checkInDate, bookingForm.checkOutDate]);

  const handleApplyPromo = async () => {
    if (!canQuote) {
      showError(t("validation.validRoomAndDatesRequired"));
      return;
    }

    await mQuoteBooking.mutateAsync();
  };

  const mCreateBooking = useMutation({
    mutationFn: async (form: BookingForm) => {
      if (!form.roomId) throw new Error(t("validation.missingRoom"));

      const payload: BookingCreationRequest = {
        ...form,
        roomId: form.roomId,
      };

      return await StaffBookingService.create(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        t("messages.createBookingRetryError");
      showError(msg);
    },
  });

  const mCreatePayment = useMutation({
    mutationFn: async (data: PaymentCreationRequest) => {
      return await StaffPaymentService.create(data);
    },

    onError: (err: any) => {
      const msg = err?.response?.data?.message || t("messages.createPaymentError");
      showError(msg);
    },
  });
  const handleMarkPaymentAsPaid = async (id: number) => {
    await mMarkPaymentAsPaid.mutateAsync(id);
  };
  const mMarkPaymentAsPaid = useMutation({
    mutationFn: async (paymentId: number) => {
      return await StaffPaymentService.update({
        paymentId,
        status: "SUCCESS",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["available-rooms-create"] });
      showSuccess(t("messages.paymentSuccess"));
    },
    onError: () => {
      showError(t("messages.completePaymentError"));
    },
  });

  const mMarkPaymentAsCancelled = useMutation({
    mutationFn: async (paymentId: number) =>
      await StaffPaymentService.update({
        paymentId,
        status: "FAILED",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      showSuccess(t("messages.cancelPaymentSuccess"));
    },
    onError: () => {
      showError(t("messages.cancelPaymentError"));
    },
  });

  const [qrState, setQrState] = useState<QrState>({
    paymentQrDialogOpen: false,
    paid: false,
    open: false,
  });
  const closePaymentDialog = () =>
    setQrState({ paymentQrDialogOpen: false, paid: false, open: false });
  const mCreatePaymentOnline = useMutation({
    mutationFn: async ({ paymentId }: { paymentId: number }) => {
      setQrState((pre) => ({
        ...pre,
        open: true,
      }));
      return StaffPaymentService.createCheckoutLink(paymentId);
    },

    onSuccess: (data) => {
      qc.invalidateQueries({
        queryKey: ["invoice-detail", selectedBookingId],
      });
      if (data.qrUrl) {
        setQrState((pre) => ({
          ...pre,
          qrUrl: data.qrUrl,
          paymentQrDialogOpen: true,
          onlinePaymentId: data.paymentId,
        }));
      }
    },

    onError: () => {
      showError(t("messages.createOnlinePaymentError"));
    },
  });
  const handleCreateQr = async (paymentId: number) =>
    await mCreatePaymentOnline.mutateAsync({ paymentId });
  const mUpdateRoom = useMutation({
    mutationFn: async ({ roomId }: { roomId: number }) => {
      if (!selectedBookingId) return;
      return await StaffBookingService.update({
        id: selectedBookingId,
        roomId,
      });
    },
    onSuccess: async (_data) => {
      showSuccess(t("messages.changeRoomSuccess"));

      await qc.invalidateQueries({
        queryKey: ["booking-detail", selectedBookingId],
      });

      qc.invalidateQueries({ queryKey: ["admin-bookings"] });

      qc.invalidateQueries({
        queryKey: ["available-rooms-change"],
      });
    },
    onError: (e: any) => {
      const msg = e.response?.data?.message || t("messages.changeRoomError");
      showError(msg);
    },
  });
  const mConfirmCheckIn = useMutation({
    mutationFn: (bookingId: string) => StaffBookingService.checkin(bookingId),
    onSuccess: (data, bookingId) => {
      showSuccess(t("messages.checkInSuccess"));
      qc.setQueryData<BookingResponse>(["booking-detail", bookingId], data);
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["booking-detail", bookingId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "checkins"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "checkouts"] });
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["available-rooms-create"] });
      qc.invalidateQueries({ queryKey: ["available-rooms-change"] });
    },
    onError: () => {
      showError(t("messages.checkInError"));
    },
  });

  const mConfirmCheckOut = useMutation({
    mutationFn: (bookingId: string) => StaffBookingService.checkout(bookingId),
    onSuccess: (data, bookingId) => {
      showSuccess(t("messages.checkOutSuccess"));
      qc.setQueryData<BookingResponse>(["booking-detail", bookingId], data);
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["booking-detail", bookingId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "checkins"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "checkouts"] });
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["available-rooms-create"] });
      qc.invalidateQueries({ queryKey: ["available-rooms-change"] });
    },
    onError: () => {
      showError(t("messages.checkOutError"));
    },
  });

  const mConfirmCancelled = useMutation({
    mutationFn: (body: BookingCancelRequest) =>
      StaffBookingService.cancel(body),
    onSuccess: () => {
      showSuccess(t("messages.cancelBookingSuccess"));
      closeCancelDialog();
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["booking-detail", selectedBookingId] });
    },
    onError: () => {
      showError(t("messages.cancelBookingError"));
    },
  });
  const handleChangeRoom = async (roomId: number) => {
    await mUpdateRoom.mutateAsync({ roomId });
  };

  const handleCancelled = async ({ id, reason }: BookingCancelRequest) => {
    await mConfirmCancelled.mutateAsync({ id, reason });
  };

  const handleCheckout = async (bookingId: string, remain: number) => {
    if (remain) {
      setBookingViewTab("payment");
      showError(t("messages.paymentRequiredBeforeCheckOut"));
      return;
    }
    await mConfirmCheckOut.mutateAsync(bookingId);
  };

  const handleCheckIn = async (bookingId: string, remain: number) => {
    if (remain) {
      setBookingViewTab("payment");
      showError(t("messages.paymentRequiredBeforeCheckIn"));
      return;
    }
    await mConfirmCheckIn.mutateAsync(bookingId);
  };

  const { data: roomTypes = [] } = useQuery({
    queryKey: ["room-types"],
    queryFn: async () => {
      const res = await StaffRoomTypeService.getList();
      return res.data || [];
    },
    staleTime: 30_000,
  });

  const handleChangeBookingForm = (field: keyof BookingForm, value: any) => {
    if (
      field === "roomTypeId" ||
      field === "checkInDate" ||
      field === "checkOutDate"
    ) {
      setPricing(undefined);
    }
    if (field === "roomId" && value === "") {
      setPricing(undefined);
    }
    if (field === "roomId") {
      setSelectedId(value);
    }

    onChangeField(field, value);
  };

  useSocket<BookingInspectionSocketResponse>({
    topic: selectedBookingId
      ? `/topic/bookings/${selectedBookingId}/inspection`
      : undefined,
    handler: (data) => {
      if (data.bookingId === selectedBookingId) {
        qc.setQueryData<BookingResponse>(
          ["booking-detail", selectedBookingId],
          (current) =>
            current
              ? {
                  ...current,
                  inspected: data.inspected,
                  inspectionTaskId: data.inspectionTaskId,
                }
              : current,
        );
        qc.invalidateQueries({
          queryKey: ["booking-detail", selectedBookingId],
        });

        qc.invalidateQueries({
          queryKey: ["housekeeping-detail", selectedBookingId],
        });

        showSuccess(t("messages.roomInspectionComplete"));
      }
    },
  });

  const mCreateHousekeepingTask = useMutation({
    mutationFn: async (data: HousekeepingCreationRequest) =>
      await StaffHousekeepingService.create(data),
    onSuccess: (data) => {
      if (data.staff?.id) {
        showSuccess(t("messages.housekeepingTaskCreated"));
      } else {
        showWarning(t("messages.noHousekeepingStaffOnShift"));
      }

      if (data.type === "INSPECTION" && selectedBookingId) {
        qc.setQueryData<BookingResponse>(
          ["booking-detail", selectedBookingId],
          (current) =>
            current
              ? {
                  ...current,
                  inspected: data.status === "COMPLETED",
                  inspectionTaskId: data.id,
                }
              : current,
        );
      }

      const listKey = [
        "housekeeping-list",
        selectedBookingId,
        filtersHouseKeepingList.limit,
        filtersHouseKeepingList.page,
      ];

      qc.setQueryData<ApiResponse<HouseKeepingTaskResponse[]>>(
        listKey,
        (current) => {
          if (!current?.data) return current;
          const exists = current.data.some((task) => task.id === data.id);
          return {
            ...current,
            data: exists
              ? current.data.map((task) => (task.id === data.id ? data : task))
              : [data, ...current.data],
            pagination: current.pagination
              ? {
                  ...current.pagination,
                  total: exists
                    ? current.pagination.total
                    : current.pagination.total + 1,
                }
              : current.pagination,
          };
        },
      );

      void qc.invalidateQueries({
        queryKey: ["booking-detail", selectedBookingId],
      });
      void qc.invalidateQueries({
        queryKey: ["housekeeping-detail", selectedBookingId, selectedTaskId],
      });
      void qc.invalidateQueries({
        queryKey: listKey,
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        t("messages.createHousekeepingTaskError");
      showError(msg);
    },
  });

  const mUpdateInspectionTask = useMutation({
    mutationFn: async (data: HousekeepingUpdateRequest) =>
      await StaffHousekeepingService.update(data),
    onSuccess: async (updatedTask) => {
      qc.setQueryData(
        ["housekeeping-detail", selectedBookingId, updatedTask.id],
        updatedTask,
      );

      if (
        updatedTask.type === "INSPECTION" &&
        updatedTask.bookingId === selectedBookingId
      ) {
        qc.setQueryData<BookingResponse>(
          ["booking-detail", selectedBookingId],
          (current) =>
            current
              ? {
                  ...current,
                  inspected: updatedTask.status === "COMPLETED",
                  inspectionTaskId: updatedTask.id,
                }
              : current,
        );

        await qc.invalidateQueries({
          queryKey: ["booking-detail", selectedBookingId],
        });
      }

      await qc.invalidateQueries({
        queryKey: ["housekeeping-detail", selectedBookingId, selectedTaskId],
      });
      qc.invalidateQueries({
        queryKey: ["housekeeping-list", selectedBookingId],
      });
    },
  });

  const handleUpdateTask = async (data: HousekeepingUpdateRequest) =>
    await mUpdateInspectionTask.mutateAsync(data);

  const handleCreateTask = async (data: HousekeepingCreationRequest) => {
    if (mCreateHousekeepingTask.isPending) return;
    await mCreateHousekeepingTask.mutateAsync(data);
  };

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [filtersHouseKeepingList, setFiltersHouseKeepingList] = useState<{
    page: number;
    limit: number;
  }>({ page: 1, limit: 5 });
  const { data: housekeepingDetail, isLoading: loadingHousekeepingDetail } =
    useQuery({
      queryKey: ["housekeeping-detail", selectedBookingId, selectedTaskId],
      queryFn: async () => {
        if (!selectedTaskId) return;
        return await StaffHousekeepingService.getById(selectedTaskId);
      },
      enabled: !!selectedTaskId,
    });
  const { data: housekeepingListResponse, isLoading: loadingHousekeepingList } =
    useQuery({
      queryKey: [
        "housekeeping-list",
        selectedBookingId,
        filtersHouseKeepingList.limit,
        filtersHouseKeepingList.page,
      ],
      queryFn: async () =>
        await StaffHousekeepingService.getList({
          bookingId: bookingDetail?.id,
          ...filtersHouseKeepingList,
        }),
      enabled: !!bookingDetail?.id,
    });

  const housekeepingList = housekeepingListResponse?.data || [];
  const metaHousekeepingList = housekeepingListResponse?.pagination;
  const onSelectTask = (id: number) => setSelectedTaskId(id);
  const onChangePageHousekeeping = (page: number) =>
    setFiltersHouseKeepingList((pre) => ({ ...pre, page }));

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

  const confirmCancel = () => {
    if (!cancelReason.trim()) {
      showError(t("validation.cancelReasonRequired"));
      return;
    }
    if (!selectedBookingId) return;

    handleCancelled({
      id: selectedBookingId,
      reason: cancelReason.trim(),
    });
  };

  useEffect(() => {
    if (
      !qrState.paymentQrDialogOpen ||
      !qrState.onlinePaymentId ||
      qrState.paid
    ) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const payment = await StaffPaymentService.getById(
          qrState.onlinePaymentId!,
        );

        if (payment?.status === "SUCCESS") {
          setQrState((prev) => ({
            ...prev,
            paid: true,
          }));

          qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
          qc.invalidateQueries({ queryKey: ["available-rooms-create"] });
          qc.invalidateQueries({
            queryKey: ["booking-detail", selectedBookingId],
          });
          qc.invalidateQueries({
            queryKey: ["invoice-detail", selectedBookingId],
          });
        }
      } catch (error) {
        console.error("Payment status check failed", error);
      }
    }, 15_000);

    return () => clearInterval(intervalId);
  }, [
    qrState.paymentQrDialogOpen,
    qrState.onlinePaymentId,
    qrState.paid,
    qc,
    filter,
    selectedBookingId,
  ]);

  const invoiceSummary = useMemo(() => {
    if (!invoiceDetail) return;

    const subtotal = Number(invoiceDetail.subtotal || 0);
    const discount = Number(invoiceDetail.discountAmount || 0);
    const tax = Number(invoiceDetail.taxAmount || 0);
    const total = subtotal - discount + tax;
    const remain = Number(invoiceDetail.remainingAmount || 0);
    const paid = total - remain;

    const roomAmount = Array.isArray(invoiceDetail.invoiceItems)
      ? invoiceDetail.invoiceItems
          .filter((i: any) => i.type === "ROOM")
          .reduce(
            (sum: number, i: any) =>
              sum + Number(i.unitPrice || 0) * Number(i.quantity || 1),
            0,
          )
      : 0;

    const serviceAmount = Array.isArray(invoiceDetail.invoiceItems)
      ? invoiceDetail.invoiceItems
          .filter((i: any) => i.type !== "ROOM")
          .reduce(
            (sum: number, i: any) =>
              sum + Number(i.unitPrice || 0) * Number(i.quantity || 1),
            0,
          )
      : 0;

    return {
      subtotal,
      discount,
      tax,
      roomAmount,
      serviceAmount,
      total,
      paid,
      remain,
    };
  }, [invoiceDetail]);

  const disablePay = useMemo(() => {
    if (!bookingDetail) return;
    const now = dayjs();
    const checkOutTime = dayjs(bookingDetail.checkOutDate)
      .hour(12)
      .minute(0)
      .second(0);

    const isOverdue =
      bookingDetail.status !== "CHECKED_IN" &&
      bookingDetail.status !== "CHECKED_OUT" &&
      !now.isBefore(checkOutTime);

    return (
      bookingDetail.status === "CANCELLED" ||
      (invoiceSummary?.remain ?? 0) <= 0 ||
      isOverdue
    );
  }, [bookingDetail?.status, bookingDetail?.checkOutDate, invoiceSummary]);

  const canEdit = useMemo(() => {
    if (!bookingDetail) return;
    const now = dayjs();
    const checkOutTime = dayjs(bookingDetail.checkOutDate)
      .hour(12)
      .minute(0)
      .second(0);

    const isOverdue =
      bookingDetail.status !== "CHECKED_IN" &&
      bookingDetail.status !== "CHECKED_OUT" &&
      !now.isBefore(checkOutTime);

    if (bookingDetail.status !== "CHECKED_IN") return false;
    if (isOverdue) return false;

    return true;
  }, [bookingDetail?.status, bookingDetail?.checkOutDate]);

  return {
    disablePay,
    canEdit,
    dialog,
    openDialog,
    closeDialog,
    bookingForm,
    handleChangeBookingForm,
    availableRooms: availableRooms || [],
    nights,
    pricing,
    canCheckRooms,
    canQuote,
    loadingRooms,
    quoting: mQuoteBooking.isPending,
    creating: mCreateBooking.isPending,
    handleApplyPromo,
    handleCreateBooking: onSubmitBookingForm,
    roomTypes,
    bookings,
    loadingBookingList,
    bookingListError,
    alert,
    closeSnackbar,
    pagination,
    handleSearchBooking,
    handleChangePage,
    selectedBookingId,
    bookingDetail,
    loadingCheckInDetail,
    handleCheckIn,
    handleCheckout,
    isCheckingIn: mConfirmCheckIn.isPending,
    isCheckingOut: mConfirmCheckOut.isPending,
    handleCancelled,
    handleChangeRoom,
    showLoadingOverlay: mMarkPaymentAsPaid.isPending,
    onChangePageService,
    services,
    loadingServices,
    onView,
    filterService,
    onChangeTabService,
    metaServices,
    bookingViewTab,
    onChangeBookingViewTab,
    invoiceDetail,
    loadingInvoiceDetail,
    updateService,
    removeService,
    handleCreateTask,
    isCreatingHousekeepingTask: mCreateHousekeepingTask.isPending,
    handleUpdateTask,
    housekeepingDetail,
    loadingHousekeepingDetail,
    formViewBooking,
    onChangeFormViewBooking,
    onSubmitFormViewBooking,

    openEntityPickerDialog,
    closePickerHandler,
    openPickerHandler,
    onChangePage,
    onSearch,
    selectedId,
    metaAvailabelRooms,
    select,
    filtersAvailableRooms,

    housekeepingList,
    loadingHousekeepingList,
    onSelectTask,
    selectedTaskId,
    onChangePageHousekeeping,
    metaHousekeepingList,

    cancelOpen,
    openCancelDialog,
    closeCancelDialog,
    confirmCancel,
    cancelReason,
    setCancelReason,
    addService,

    qrState,
    closePaymentDialog,
    handleCreateQr,
    invoiceSummary,
    isPendingCreateQr: mCreatePaymentOnline.isPending,
    isPendingMarkPaymentAsPaid: mMarkPaymentAsPaid.isPending,
    handleMarkPaymentAsPaid,
  };
}
