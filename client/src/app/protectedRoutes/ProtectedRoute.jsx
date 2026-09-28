import { Navigate, Outlet } from "react-router"
import { useAuth } from "../../feature/auth/hooks/useAuth"


const ProtectedRoute = () => {
 const {isloading,isAuthenticat}= useAuth()
 if(isloading) return <h1>Loading...</h1>
 
 if(!isAuthenticat){
  return <Navigate to="/login"/>
 }
  return <Outlet/>
}

export default ProtectedRoute
