export type BookingCreationRequest = {
  checkInDate: string;
  checkOutDate: string;
  guestEmail?: string;
  guestPhone: string;
  guestName: string;
  promotionCode?: string;
  estimatedArrivalTime?: string;
  bookingForSomeoneElse?: boolean;
  staffId?: string;
  customerId?: string;
  roomId: number;
};
