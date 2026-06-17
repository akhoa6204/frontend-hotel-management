import { InvoiceStatus } from "@enums/InvoiceStatus";
import { ServiceResponse } from "./ServiceResponse";
import { PaymentResponse } from "./PaymentResponse";

export interface InvoiceResponse {
  id: string;
  invoiceCode: string;
  bookingId: string;
  status: InvoiceStatus;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  remainingAmount: number;
  issuedAt: Date | string;
  paidAt?: string;
  invoiceItems: InvoiceItem[];
  payments?: PaymentResponse[];
}

interface InvoiceItem {
  id: number;
  type: "ROOM";
  extraService?: ServiceResponse;
  quantity: number;
  unitPrice: number;
}
