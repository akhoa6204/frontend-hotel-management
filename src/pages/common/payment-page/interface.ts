export interface BookingForm {
  fullName: string;
  phone: string;
  email: string;
  guestType: "SELF" | "OTHER";
  arrivalTime: string;
}

export type SortKey = "price-asc" | "price-desc";
