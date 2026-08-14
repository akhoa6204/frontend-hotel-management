import type { HousekeepingTaskType } from "@enums/HousekeepingTaskType";

export type HousekeepingCreationRequest = {
  staffId?: string;
  roomId: number;
  type: HousekeepingTaskType;
  bookingId?: string;
};
