import type { UserRole } from "@enums/UserRole";

export type SearchSchedule = {
  startDate: string;
  endDate: string;
  q?: string;
  position?: UserRole;
  page?: number;
  limit?: number;
  sort?: string;
};
