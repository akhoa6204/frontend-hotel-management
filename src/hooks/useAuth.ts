import {
  isManager,
  isCustomer,
  hasRole,
  hasAnyRole,
  canAccessManager,
  canAccessCustomer,
} from "@utils/roleUtils";
import { useAppSelector } from "./useRedux";
import type { UserRole } from "src/enums/UserRole";

const useAuth = () => {
  const user = useAppSelector((state) => state.account.user);

  return {
    user,
    isManager: () => isManager(user),
    isCustomer: () => isCustomer(user),
    hasRole: (role: UserRole) => hasRole(user, role),
    hasAnyRole: (roles: UserRole[]) => hasAnyRole(user, roles),
    canAccessManager: () => canAccessManager(user),
    canAccessCustomer: () => canAccessCustomer(user),
  };
};

export default useAuth;
