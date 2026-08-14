import type { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import type { HousekeepingTaskType } from "@enums/HousekeepingTaskType";

export type HousekeepingUpdateRequest = {
  id: number;
  staffId?: string;
  status?: HousekeepingTaskStatus;
  note?: string;
  roomId?: number;
  type?: HousekeepingTaskType;
};
