import useAuth from "@hooks/useAuth";
import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UnProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace={true} /> : <Outlet />;
};

export default function PublicGate() {
  const { user, hasRole, hasAnyRole } = useAuth();

  const managerPath = useMemo(() => {
    if (!user) return "/";

    if (user.roleName === "ADMIN")
      return "/manager/dashboard";

    if (user.roleName === "RECEPTIONIST") return "/manager/front-desk";

    if (user.roleName === "HOUSEKEEPING") return "/manager/housekeeping-tasks";

    return "/";
  }, [user?.roleName]);

  if (user && !hasRole("USER")) {
    return <Navigate to={managerPath} replace />;
  }
  return <Outlet />;
}
