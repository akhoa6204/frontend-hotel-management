import { BookingStatus } from "@enums/BookingStatus";
import { RoomResponse } from "./RoomResponse";
import { UserShortResponse } from "./UserShortResponse";

export interface BookingResponse {
  id: string;
  bookingCode: string;
  invoiceId: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  guestEmail: string;
  guestPhone: string;
  guestName: string;
  promotionCode?: string;
  estimatedArrivalTime: string;
  bookingForSomeoneElse: boolean;
  refundable: boolean;
  room: RoomResponse;
  staff?: UserShortResponse;
  customer?: UserShortResponse;

  inspected: boolean;
  inspectionTaskId?: number;
  finalAmount?: number;
  remainingAmount?: number;
  roomAmount?: number;
  roomDiscountAmount?: number;
  roomFinalAmount?: number;
  depositPaidAmount?: number;
  roomPaymentPaidAmount?: number;
  hasReview?: boolean;
}
