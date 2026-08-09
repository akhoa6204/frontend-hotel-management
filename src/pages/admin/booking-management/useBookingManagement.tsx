import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useLocation, useNavigate } from "react-router-dom";
import useSnackbar from "@hooks/useSnackbar";
import useForm from "@hooks/useForm";

import useSocket from "@hooks/useSocket";
import { useEntityPicker } from "@hooks/useEntityPickerDialog";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { BookingCreationRequest } from "@constant/request/BookingCreationRequest";
import { PaymentCreationRequest } from "@constant/request/PaymentCreationRequest";
import { PaymentMethod } from "@enums/PaymentMethod";
import { QuoteResponse } from "@constant/response/QuoteResponse";
import { InvoiceItemUpdateRequest } from "@constant/request/InvoiceItemUpdateRequest";
import { PaymentStatus } from "@enums/PaymentStatus";
import { PaymentType } from "@enums/PaymentType";
import { BookingResponse } from "@constant/response/BookingResponse";
import { RoomResponse } from "@constant/response/RoomResponse";
import { HousekeepingCreationRequest } from "@constant/request/HousekeepingCreationRequest";
import { HousekeepingUpdateRequest } from "@constant/request/HousekeepingUpdateRequest";
import { ServiceType } from "@enums/ServiceType";
import { QrState } from "@constant/internal/QrState";
import { DialogState } from "@constant/internal/DialogState";
import StaffBookingService from "@services/staff/booking.service";
import StaffInvoiceService from "@services/staff/invoice.service";
import { StaffExtraServiceService } from "@services/staff/extraService.service";
import { SearchExtraService } from "@constant/internal/SearchExtraService";
import { InvoiceItemCreationRequest } from "@constant/request/InvoiceItemCreationRequest";
import StaffRoomService from "@services/staff/room.service";
import StaffPaymentService from "@services/staff/payment.service";
import StaffRoomTypeService from "@services/staff/roomType.service";
import StaffHousekeepingService from "@services/staff/housekeeping.service";
import { BookingCancelRequest } from "@constant/request/BookingCancelRequest";

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

const validateBookingForm = (form: BookingForm) => {
  const errors: Record<string, string> = {};
  if (!form.roomId) {
    errors["roomId"] = "Vui lòng chọn phòng";
  }
  if (!form.checkInDate) {
    errors["checkInDate"] = "Vui lòng chọn ngày nhận phòng";
  }

  if (!form.checkOutDate) {
    errors["checkOutDate"] = "Vui lòng chọn ngày trả phòng";
  }

  if (
    form.checkInDate &&
    form.checkOutDate &&
    dayjs(form.checkOutDate).isBefore(dayjs(form.checkInDate))
  ) {
    errors["checkOutDate"] = "Ngày trả phòng phải sau ngày nhận phòng";
  }
  return errors;
};
export default function useBookingManagement() {
  const qc = useQueryClient();
  const { alert, showError, showSuccess, closeSnackbar, showWarning } =
    useSnackbar();

  const getLabelStatus: Partial<Record<PaymentStatus, string>> = {
    SUCCESS: "Thành công",
    FAILED: "Thất bại",
    PENDING: "Đang chờ",
  };
  const getLabelMethod: Record<PaymentMethod, string> = {
    CASH: "Tiền mặt",
    BANK_TRANSFER: "Chuyển khoản",
    E_WALLET: "Ví điện tử",
  };
  const getLabelType: Record<PaymentType, string> = {
    DEPOSIT: "Đặt cọc",
    ROOM_PAYMENT: "Thanh toán tiền phòng",
    SERVICE_PAYMENT: "Thanh toán dịch vụ",
    REFUND: "Hoàn tiền",
  };
  const getLabeBookinglStatus = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    CHECKED_IN: "Đang ở",
    CHECKED_OUT: "Đã trả phòng",
  };
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
    const subtotal = Number(invoiceDetail?.subtotal || 0);
    const discount = Number(invoiceDetail?.discountAmount || 0);
    const tax = Number(invoiceDetail?.taxAmount || 0);
    const total = subtotal - discount + tax;
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
      showSuccess("Thanh toán tiền mặt thành công");
      return;
    }

    await handleCreateQr(paymentId);
  });

  const [bookingViewTab, setBookingViewTab] = useState<
    "info" | "service" | "payment" | "housekeeping"
  >("info");

  const {
    selectedId,
    selectedRow,
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
    updateForm,
    onChangeField,
    resetForm: resetBookingForm,
    errors: bookingFormErrors,
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
    validateBookingForm,
    async (form: BookingForm) => {
      try {
        const { id, invoiceId, remainingAmount } =
          await mCreateBooking.mutateAsync(form);

        const { id: paymentId } = await mCreatePayment.mutateAsync({
          invoiceId,
          paymentMethod: form.paymentMethod,
          paymentType: "ROOM_PAYMENT",
          amount: Number(remainingAmount),
        });

        if (form.paymentMethod === "CASH") {
          await mMarkPaymentAsPaid.mutateAsync(paymentId);

          showSuccess("Đặt phòng và thanh toán thành công");
          resetForm();
          return;
        }
        resetForm();
        showSuccess(
          "Đặt phòng thành công, tiếp tục thanh toán để xác nhận đặt phòng",
        );
        await handleCreateQr(paymentId);
      } catch (error: Error | any) {
        const msg = error?.message || "Tạo đặt phòng thất bại";
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

  const { data: bookingListResponse, isLoading: loadingBookingList } = useQuery(
    {
      queryKey: ["admin-bookings", filter],
      queryFn: () => StaffBookingService.getList(filter),
    },
  );

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
      if (!canQuote) showError("Thiếu thông tin phòng hoặc ngày");
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
          showSuccess(
            `Áp dụng mã ${
              bookingForm.promotionCode
            } thành công, giảm ${data.totalDiscount.toLocaleString()}₫`,
          );
        } else {
          showError("Mã giảm giá không áp dụng cho đơn này");
        }
      }
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        "Không áp dụng được mã khuyến mãi. Vui lòng kiểm tra lại.";
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
      showError("Vui lòng chọn phòng và ngày nhận trả phòng hợp lệ");
      return;
    }

    await mQuoteBooking.mutateAsync();
  };

  const mCreateBooking = useMutation({
    mutationFn: async (form: BookingForm) => {
      if (!form.roomId) throw new Error("Thiếu thông tin phòng");

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
        "Tạo đặt phòng thất bại, vui lòng thử lại";
      showError(msg);
    },
  });

  const mCreatePayment = useMutation({
    mutationFn: async (data: PaymentCreationRequest) => {
      return await StaffPaymentService.create(data);
    },

    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Tạo thanh toán thất bại";
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
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["available-rooms-create"] });
      showSuccess(`Thanh toán thành công`);
    },
    onError: () => {
      showError("Thanh toán đã hoàn thành thất bại");
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
      showSuccess("Hủy thanh toán thành công");
    },
    onError: () => {
      showError("Hủy thanh toán thất bại");
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
      showError("Tạo thanh toán online thất bại");
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
      showSuccess("Thay đổi phòng thành công");

      await qc.invalidateQueries({
        queryKey: ["booking-detail", selectedBookingId],
      });

      qc.invalidateQueries({ queryKey: ["admin-bookings"] });

      qc.invalidateQueries({
        queryKey: ["available-rooms-change"],
      });
    },
    onError: (e: any) => {
      const msg = e.response?.data?.message || "Thay đổi phòng thất bại";
      showError(msg);
    },
  });
  const mConfirmCheckIn = useMutation({
    mutationFn: (bookingId: string) => StaffBookingService.checkin(bookingId),
    onSuccess: (_data) => {
      showSuccess("Nhận phòng thành công");
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["booking-detail", selectedBookingId] });
    },
    onError: () => {
      showError("Nhận phòng thất bại");
    },
  });

  const mConfirmCheckOut = useMutation({
    mutationFn: (bookingId: string) => StaffBookingService.checkout(bookingId),
    onSuccess: (_data, bookingId) => {
      showSuccess("Trả phòng thành công");
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["booking-detail", bookingId] });
    },
    onError: () => {
      showError("Trả phòng thất bại");
    },
  });

  const mConfirmCancelled = useMutation({
    mutationFn: (body: BookingCancelRequest) =>
      StaffBookingService.cancel(body),
    onSuccess: (_data, bookingId) => {
      showSuccess("Hủy phòng thành công");
      closeCancelDialog();
      qc.invalidateQueries({ queryKey: ["admin-bookings", filter] });
      qc.invalidateQueries({ queryKey: ["booking-detail", selectedBookingId] });
    },
    onError: () => {
      showError("Hủy phòng thất bại");
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
      showError("Yêu cầu thanh toán toàn bộ hóa đơn trước khi trả phòng");
      return;
    }
    await mConfirmCheckOut.mutateAsync(bookingId);
  };

  const handleCheckIn = async (bookingId: string, remain: number) => {
    if (remain) {
      setBookingViewTab("payment");
      showError("Yêu cầu thanh toán tiền phòng trước khi nhận phòng");
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

  useSocket({
    topic: selectedBookingId
      ? `/topic/bookings/${selectedBookingId}/inspection`
      : undefined,
    handler: (data) => {
      if (data.bookingId === selectedBookingId) {
        qc.invalidateQueries({
          queryKey: ["booking-detail", selectedBookingId],
        });

        qc.invalidateQueries({
          queryKey: ["housekeeping-detail", selectedBookingId],
        });

        showSuccess("Phòng đã được kiểm tra xong");
      }
    },
  });

  const mCreateHousekeepingTask = useMutation({
    mutationFn: async (data: HousekeepingCreationRequest) =>
      await StaffHousekeepingService.create(data),
    onSuccess: (data) => {
      if (data.staff?.id) {
        showSuccess("Tạo nhiệm vụ dọn phòng thành công");
      } else {
        showWarning("Không có nhân viên dọn phòng đang trong ca làm!");
      }

      qc.invalidateQueries({
        queryKey: ["booking-detail", selectedBookingId],
      });
      qc.invalidateQueries({
        queryKey: ["housekeeping-detail", selectedBookingId, selectedTaskId],
      });
      qc.invalidateQueries({
        queryKey: [
          "housekeeping-list",
          selectedBookingId,
          filtersHouseKeepingList.limit,
          filtersHouseKeepingList.page,
        ],
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Tạo nhiệm vụ buồng phòng thất bại";
      showError(msg);
    },
  });

  const mUpdateInspectionTask = useMutation({
    mutationFn: async (data: HousekeepingUpdateRequest) =>
      await StaffHousekeepingService.update(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["housekeeping-detail", selectedBookingId, selectedTaskId],
      });
    },
  });

  const handleUpdateTask = async (data: HousekeepingUpdateRequest) =>
    await mUpdateInspectionTask.mutateAsync(data);

  const handleCreateTask = async (data: HousekeepingCreationRequest) =>
    await mCreateHousekeepingTask.mutateAsync(data);

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
      showError("Vui lòng nhập lý do hủy phòng.");
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
        console.error("Kiểm tra trạng thái thanh toán thất bại", error);
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
    handleCancelled,
    handleChangeRoom,
    showLoadingOverlay: mMarkPaymentAsPaid.isPending,
    onChangePageService,
    services,
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
    getLabelMethod,
    getLabelStatus,
    getLabelType,
    getLabeBookinglStatus,
    isPendingCreateQr: mCreatePaymentOnline.isPending,
    handleMarkPaymentAsPaid,
  };
}
