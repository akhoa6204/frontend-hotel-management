import type { AmenityResponse } from "./AmenityResponse";
import type { RoomTypeImageResponse } from "./RoomTypeImageResponse";

export interface RoomTypeResponse {
  id: number;
  name: string;
  description: string;
  capacity: number;
  basePrice: number;
  roomTypeImages: RoomTypeImageResponse[];
  amenities: AmenityResponse[];
  isAvailable?: boolean;
  discountAmount?: number;
  roomId?: number;
}
