import { HousekeepingTaskType } from "@enums/HousekeepingTaskType";
import { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";

import { RoomResponse } from "./RoomResponse";
import { UserShortResponse } from "./UserShortResponse";

export type HouseKeepingTaskResponse = {
  id: number;
  room: RoomResponse;
  staff?: UserShortResponse;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  type: HousekeepingTaskType;
  status: HousekeepingTaskStatus;
  note?: string;
};
