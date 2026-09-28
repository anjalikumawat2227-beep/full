import { Navigate, Outlet } from "react-router"
import { useAuth } from "../../feature/auth/hooks/useAuth"

export const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Safe checks lagayein
  if (!allowedRoles.includes(user?.role)) {
    console.log("User Role:", user?.role);
    console.log("Allowed Roles:", allowedRoles);
    
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export  const RoleBasedRedirect = () => {

 const {user}= useAuth()
 
  if (user.role === "seller") {
    return <Navigate to="seller" replace />;
  }
  
  if (user.role === "user") {
    return <Navigate to="buyer" replace />;
  }

  return <Navigate to="/login" replace />;
};
