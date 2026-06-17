import { UserRole } from "@enums/UserRole";

export type SearchSchedule = {
  startDate: string;
  endDate: string;
  q?: string;
  position?: UserRole;
};
