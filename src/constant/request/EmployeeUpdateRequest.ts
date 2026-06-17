import { UserRole } from "@enums/UserRole";

export type EmployeeUpdateRequest = {
  id: string;
  fullName?: string;
  phone?: string;
  email?: string;
  active?: boolean;
  role?: Omit<UserRole, "USER">;
};
