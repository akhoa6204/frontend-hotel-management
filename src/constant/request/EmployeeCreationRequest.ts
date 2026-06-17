import { UserRole } from "@enums/UserRole";

export type EmployeeCreationRequest = {
  fullName: string;
  email: string;
  phone: string;
  role: Omit<UserRole, "USER">;
};
