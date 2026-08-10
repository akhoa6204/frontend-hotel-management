import type { BookingResponse } from "./BookingResponse";

export interface ReviewResponse {
  id: number;
  bookingId: string;
  overall: number;
  amenities: number;
  cleanliness: number;
  comfort: number;
  locationScore: number;
  valueForMoney: number;
  hygiene: number;
  comment: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  booking: BookingResponse;
}
