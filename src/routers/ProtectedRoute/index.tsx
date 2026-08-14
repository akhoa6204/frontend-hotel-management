import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { useMemo } from "react";
import type { UserRole } from "src/enums/UserRole";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: UserRole;
  requiredAnyRole?: UserRole[];
  requiredRoles?: UserRole[];
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredAnyRole,
  requiredRoles,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const { user, hasRole, hasAnyRole } = useAuth();

  const defaultUnauthorized = useMemo(() => {
    if (!user) return "/";
    if (user.roleName === "ADMIN") return "/manager/dashboard";

    if (user.roleName === "RECEPTIONIST") return "/manager/front-desk";

    if (user.roleName === "HOUSEKEEPING") return "/manager/housekeeping-tasks";

    return "/";
  }, [user?.roleName]);

  if (!user) return <Navigate to={fallbackPath} replace />;

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={defaultUnauthorized} replace />;
  }

  const acceptedRoles = requiredRoles ?? requiredAnyRole;
  if (acceptedRoles?.length && !hasAnyRole(acceptedRoles)) {
    return <Navigate to={defaultUnauthorized} replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

export const AdminRoute = () => (
  <ProtectedRoute requiredRoles={["ADMIN"]}>
    <Outlet />
  </ProtectedRoute>
);

export const StaffRoute = ({ roles }: { roles: UserRole[] }) => (
  <ProtectedRoute requiredRoles={["ADMIN", ...roles]}>
    <Outlet />
  </ProtectedRoute>
);

export const CustomerRoute = () => (
  <ProtectedRoute requiredRole="USER">
    <Outlet />
  </ProtectedRoute>
);
