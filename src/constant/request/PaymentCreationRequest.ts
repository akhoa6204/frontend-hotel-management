import type { PaymentMethod } from "@enums/PaymentMethod";
import type { PaymentType } from "@enums/PaymentType";

export type PaymentCreationRequest = {
  invoiceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
};
