import type { HousekeepingTaskType } from "@enums/HousekeepingTaskType";
import type { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";

import type { RoomResponse } from "./RoomResponse";
import type { UserShortResponse } from "./UserShortResponse";

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
