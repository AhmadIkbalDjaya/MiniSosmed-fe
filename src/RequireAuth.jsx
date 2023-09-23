import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  return auth.status ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
