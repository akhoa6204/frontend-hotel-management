import type { AxiosError } from "axios";
import type { QrState } from "@constant/internal/QrState";
import type { PaymentCreationRequest } from "@constant/request/PaymentCreationRequest";
import type { BookingResponse } from "@constant/response/BookingResponse";
import useAuth from "@hooks/useAuth";
import useSnackbar from "@hooks/useSnackbar";
import GuestPaymentService from "@services/guest/payment.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEPOSIT_AMOUNT = 150_000;

interface PaymentNotice {
  open: boolean;
  type: "success" | "error";
}

const usePayment = () => {
  const { t } = useTranslation("client");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useLocation() as { state?: { booking?: BookingResponse } };
  const booking = state?.booking;
  const { alert, showSuccess, showError, closeSnackbar } = useSnackbar();

  const [showNotice, setShowNotice] = useState<PaymentNotice>({ open: false, type: "success" });
  const [qrState, setQrState] = useState<QrState>({
    paymentQrDialogOpen: false,
    paid: false,
    open: false,
  });

  useEffect(() => {
    if (!booking?.id) navigate("/search", { replace: true });
  }, [booking?.id, navigate]);

  const closePaymentDialog = () => {
    setQrState((previous) => ({ ...previous, open: false }));
  };

  const mCreatePaymentOnline = useMutation({
    mutationFn: ({ paymentId }: { paymentId: number }) => GuestPaymentService.createCheckoutLink(paymentId),
    onSuccess: (data) => {
      if (!data?.qrUrl) {
        showError(t("payment.errors.missingQr"));
        return;
      }
      setQrState((previous) => ({
        ...previous,
        open: true,
        qrUrl: data.qrUrl,
        paymentQrDialogOpen: true,
        onlinePaymentId: data.paymentId,
      }));
    },
    onError: () => showError(t("payment.errors.createQr")),
  });

  const mCreatePayment = useMutation({
    mutationFn: (data: PaymentCreationRequest) => GuestPaymentService.create(data),
    onSuccess: (data) => {
      const paymentId = Number(data.id);
      setQrState((previous) => ({ ...previous, open: true, onlinePaymentId: paymentId }));
      mCreatePaymentOnline.mutate({ paymentId });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      showError(error.response?.data?.message || t("payment.errors.createPayment"));
    },
  });

  const onPayment = () => {
    if (!booking || mCreatePayment.isPending || mCreatePaymentOnline.isPending) return;

    if (qrState.qrUrl) {
      setQrState((previous) => ({ ...previous, open: true }));
      return;
    }

    if (qrState.onlinePaymentId) {
      setQrState((previous) => ({ ...previous, open: true }));
      mCreatePaymentOnline.mutate({ paymentId: qrState.onlinePaymentId });
      return;
    }

    mCreatePayment.mutate({
      invoiceId: booking.invoiceId,
      paymentMethod: "BANK_TRANSFER",
      amount: DEPOSIT_AMOUNT,
      paymentType: "DEPOSIT",
    });
  };

  useEffect(() => {
    if (!qrState.paymentQrDialogOpen || !qrState.onlinePaymentId || qrState.paid) return;

    const paymentId = qrState.onlinePaymentId;
    const intervalId = window.setInterval(async () => {
      try {
        const payment = await GuestPaymentService.getById(paymentId);
        if (payment?.status !== "SUCCESS") return;

        setQrState({ paymentQrDialogOpen: false, paid: true, open: false });
        setShowNotice({ open: true, type: "success" });
        showSuccess(t("payment.notice.successTitle"));
      } catch {
        // A temporary polling failure should not interrupt the active QR payment.
      }
    }, 15_000);

    return () => window.clearInterval(intervalId);
  }, [qrState.onlinePaymentId, qrState.paid, qrState.paymentQrDialogOpen, showSuccess, t]);

  const backToHome = () => {
    if (!booking) {
      navigate("/", { replace: true });
      return;
    }
    navigate(user ? `/account/bookings/${booking.id}` : "/", { replace: true });
  };

  const loadingPayment = mCreatePayment.isPending || mCreatePaymentOnline.isPending;
  const finalTotal = Number(booking?.finalAmount ?? booking?.remainingAmount ?? 0);
  const remainingBalance = Math.max(0, finalTotal - DEPOSIT_AMOUNT);

  return {
    booking,
    depositAmount: DEPOSIT_AMOUNT,
    finalTotal,
    remainingBalance,
    onPayment,
    loadingPayment,
    alert,
    closeSnackbar,
    showNotice,
    backToHome,
    qrState,
    closePaymentDialog,
    isPendingCreateQr: mCreatePaymentOnline.isPending,
  };
};

export default usePayment;
