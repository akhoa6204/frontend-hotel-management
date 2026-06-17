import { PaymentStatus } from "@enums/PaymentStatus";

export type PaymentUpdateRequest = {
  paymentId: number;
  status: PaymentStatus;
  transactionCode?: string;
};
