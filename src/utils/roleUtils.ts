import { UserShortResponse } from "@constant/response/UserShortResponse";
import { UserRole } from "src/enums/UserRole";

export const isManager = (user?: UserShortResponse): boolean =>
  user?.roleName === "ADMIN" || user?.roleName === "MANAGER";

export const isCustomer = (user?: UserShortResponse): boolean =>
  user?.roleName === "USER";

export const hasRole = (user?: UserShortResponse, role?: UserRole): boolean =>
  user?.roleName === role;

export const hasAnyRole = (
  user?: UserShortResponse,
  roles: UserRole[] = [],
): boolean => {
  if (!user) return false;
  return roles.includes(user.roleName);
};

export const canAccessManager = (user?: UserShortResponse): boolean =>
  isManager(user);

export const canAccessCustomer = (user?: UserShortResponse): boolean =>
  isCustomer(user) || isManager(user);
