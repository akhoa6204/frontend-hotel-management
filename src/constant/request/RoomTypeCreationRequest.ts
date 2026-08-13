export type RoomTypeImageMetadata = {
  secureUrl: string;
  publicId?: string;
  alt?: string;
};

export type RoomTypeCreationRequest = {
  name: string;
  description: string;
  capacity: number;
  basePrice: number;

  amenities: string[];
  roomTypeImages: string[];
  roomTypeImageMetadata?: RoomTypeImageMetadata[];
}
