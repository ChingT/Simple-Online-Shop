import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const location = useLocation();
  console.log("Login location", location);

  const isAuthenticated = useSelector((state) => state.user.accessToken);
  console.log(`ProtectedRoutes Is logged in ? ${isAuthenticated}`);

  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/login" replace state={{ from: location }} />;
}
