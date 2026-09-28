import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../feature/auth/hooks/useAuth.js";

const PublicRoute = () => {
  const { isAuthenticat, isloading } = useAuth();
  if (isloading) return <h1>Loading....</h1>;

  if (isAuthenticat) {
    return <Navigate to="/main" />;
  } else return <Outlet />;
};

export default PublicRoute;
