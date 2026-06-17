export interface ReviewCreationRequest {
  overall: number;
  amenities: number;
  cleanliness: number;
  comfort: number;
  locationScore: number;
  valueForMoney: number;
  hygiene: number;
  comment?: string;
  bookingId: string;
}
