import type { InvoiceStatus } from "@enums/InvoiceStatus";
import type { ServiceResponse } from "./ServiceResponse";
import type { PaymentResponse } from "./PaymentResponse";

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
