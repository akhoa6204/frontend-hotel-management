import { PaymentMethod } from "@enums/PaymentMethod";
import { PaymentType } from "@enums/PaymentType";

export type PaymentCreationRequest = {
  invoiceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
};
