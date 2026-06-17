import { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import { HousekeepingTaskType } from "@enums/HousekeepingTaskType";

export type HousekeepingUpdateRequest = {
  id: number;
  staffId?: string;
  status?: HousekeepingTaskStatus;
  note?: string;
  roomId?: number;
  type?: HousekeepingTaskType;
};
