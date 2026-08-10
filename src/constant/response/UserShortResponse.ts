import type { UserRole } from "src/enums/UserRole";

export interface UserShortResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleName: UserRole;
  active: boolean;
}
