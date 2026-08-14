import type { RoomTypeResponse } from "./response/RoomTypeResponse";

export type Errors<T> = Partial<Record<keyof T, string>>;

export type RoomType = "all" | "standard" | "deluxe" | "suite";

export interface Room {
  id: number;
  hotel_id: number;
  name: string;
  type: string;
  price: number;
  capacity: number;
  description: string;
  images: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RoomTypeGuest extends RoomTypeResponse {
  image?: string;
}

export interface SearchState {
  from: string;
  to: string;
  capacity: number;
}

export type PaymentMethod = "CASH" | "CARD";

export interface Booking {
  checkIn: string;
  checkOut: string;
  fullName: string;
  email?: string;
  phone?: string;
  room: {
    name: string;
    roomType?: {
      name: string;
      basePrice: number;
    };
  };
  baseAmount: number;
  discountAmount?: number;
  totalPaid?: number;
}
