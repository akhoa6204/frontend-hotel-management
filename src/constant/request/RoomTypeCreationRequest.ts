export type RoomTypeCreationRequest = {
  name: string;
  description: string;
  capacity: number;
  basePrice: number;

  amenities: string[];
  roomTypeImages: string[];
}
