import type { PaymentMethod } from "@enums/PaymentMethod";
import type { PaymentStatus } from "@enums/PaymentStatus";
import type { PaymentType } from "@enums/PaymentType";

export type PaymentResponse = {
  id: number;
  invoiceId: string;
  invoiceCode: string;
  paymentCode: string;
  method: PaymentMethod;
  status: PaymentStatus;
  type: PaymentType;
  amount: number;
  transactionCode: string;
  paidAt: string;
  expiredAt: string;
};
