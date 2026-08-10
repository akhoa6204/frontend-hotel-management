import type { UserRole } from "@enums/UserRole";
import type { TFunction } from "i18next";

export const employeeRoleTranslationKeys: Record<UserRole, string> = {
  ADMIN: "roles.ADMIN",
  MANAGER: "roles.MANAGER",
  RECEPTIONIST: "roles.RECEPTIONIST",
  HOUSEKEEPING: "roles.HOUSEKEEPING",
  USER: "roles.USER",
};

export const getEmployeeRoleLabel = (t: TFunction, role?: UserRole) =>
  role ? t(employeeRoleTranslationKeys[role], { ns: "common" }) : "—";
