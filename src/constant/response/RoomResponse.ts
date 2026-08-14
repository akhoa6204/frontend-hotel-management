import type { RoomStatus } from "src/enums/RoomStatus";
import type { RoomTypeResponse } from "./RoomTypeResponse";

export interface RoomResponse {
  id: number;
  name: string;
  status: RoomStatus;
  roomType: RoomTypeResponse;
}
