import { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";

export type SearchHouseKeepingTask = {
  status?: HousekeepingTaskStatus;
  bookingId?: string;
};
