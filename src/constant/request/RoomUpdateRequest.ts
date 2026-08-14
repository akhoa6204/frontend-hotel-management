import type { RoomStatus } from "src/enums/RoomStatus";

export type RoomUpdateRequest = {
  name?: string;
  status?: RoomStatus;
  roomTypeId?: number;
};
