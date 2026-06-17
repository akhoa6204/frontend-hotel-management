import { RoomStatus } from "src/enums/RoomStatus";
import { RoomTypeResponse } from "./RoomTypeResponse";

export interface RoomResponse {
  id: number;
  name: string;
  status: RoomStatus;
  roomType: RoomTypeResponse;
}
