import type { UserRole } from "@enums/UserRole";
import type { ShiftResponse } from "./ShiftResponse";

export type AssignmentInfoResponse = {
  id: number;
  staffId: string;
  workDate: string;
  position: Omit<UserRole, "USER">;
  shift: ShiftResponse;
};
