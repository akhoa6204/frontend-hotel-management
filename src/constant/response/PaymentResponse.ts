import { PaymentMethod } from "@enums/PaymentMethod";
import { PaymentStatus } from "@enums/PaymentStatus";
import { PaymentType } from "@enums/PaymentType";

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
