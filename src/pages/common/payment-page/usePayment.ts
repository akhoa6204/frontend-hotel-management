import { QrState } from "@constant/internal/QrState";
import { PaymentCreationRequest } from "@constant/request/PaymentCreationRequest";
import { BookingResponse } from "@constant/response/BookingResponse";
import useAuth from "@hooks/useAuth";
import useSnackbar from "@hooks/useSnackbar";
import GuestPaymentService from "@services/guest/payment.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePayment = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const booking: BookingResponse = location?.state?.booking;

  const [showNotice, setShowNotice] = useState({
    open: false,
    type: "success",
  });
  const [qrState, setQrState] = useState<QrState>({
    paymentQrDialogOpen: false,
    paid: false,
    open: false,
  });

  const closePaymentDialog = () =>
    setQrState({ paymentQrDialogOpen: false, paid: false, open: false });

  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (!booking?.id) {
      navigate("/search", { replace: true });
    }
  }, [booking, navigate]);

  const mCreatePaymentOnline = useMutation({
    mutationFn: async ({ paymentId }: { paymentId: number }) => {
      setQrState((pre) => ({
        ...pre,
        open: true,
      }));

      return GuestPaymentService.createCheckoutLink(paymentId);
    },

    onSuccess: (data) => {
      if (!data?.qrUrl) {
        showError("Không lấy được mã QR thanh toán");
        return;
      }

      setQrState((pre) => ({
        ...pre,
        qrUrl: data.qrUrl,
        paymentQrDialogOpen: true,
        onlinePaymentId: data.paymentId,
      }));
    },

    onError: () => {
      showError("Tạo thanh toán online thất bại");
    },
  });

  const mCreatePayment = useMutation({
    mutationFn: async (data: PaymentCreationRequest) => {
      return await GuestPaymentService.create(data);
    },
    onSuccess: async (data) => {
      await mCreatePaymentOnline.mutateAsync({
        paymentId: Number(data.id),
      });
    },

    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Tạo thanh toán thất bại";
      showError(msg);
    },
  });

  const onPayment = async () => {
    await mCreatePayment.mutateAsync({
      invoiceId: booking.invoiceId,
      paymentMethod: "BANK_TRANSFER",
      amount: 150000,
      paymentType: "DEPOSIT",
    });
  };

  const handlePaymentSuccess = async () => {
    if (!qrState.onlinePaymentId) return;

    setQrState((prev) => ({
      ...prev,
      paid: true,
    }));

    setShowNotice({ open: true, type: "success" });
    showSuccess("Thanh toán thành công");
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
        const payment = await GuestPaymentService.getById(
          qrState.onlinePaymentId!,
        );

        if (payment?.status === "SUCCESS") {
          setQrState((prev) => ({
            ...prev,
            paid: true,
          }));

          setQrState({
            paymentQrDialogOpen: false,
            paid: false,
            open: false,
          });
          setShowNotice({ open: true, type: "success" });
          showSuccess("Thanh toán thành công");
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
    queryClient,
    showSuccess,
  ]);

  const backToHome = () => {
    if (!user) {
      navigate("/", { replace: true });
    } else {
      navigate(`/account/bookings/${booking.id}`, { replace: true });
    }
  };
  return {
    booking,

    onPayment,
    loadingPayment: mCreatePayment.isPending,

    alert,
    closeSnackbar,

    showNotice,

    qrState,
    closePaymentDialog,
    handlePaymentSuccess,
    isPendingCreateQr: mCreatePaymentOnline.isPending,

    backToHome,
  };
};
export default usePayment;
