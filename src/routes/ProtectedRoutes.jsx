import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.accessToken);

  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/login" state={{ origin: location.pathname }} />;
}
