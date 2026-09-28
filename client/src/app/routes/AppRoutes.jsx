import { createBrowserRouter, RouterProvider } from "react-router";
import PublicRoute from "../protectedRoutes/PublicRoute.jsx"
import AuthLayout from "../layout/AuthLayout.jsx";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute.jsx"
import MainLayout from "../layout/MainLayout.jsx";
import RegisterFrom from "../../feature/auth/ui/pages/Register.jsx";
import LoginFrom from "../../feature/auth/ui/pages/Login.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../feature/auth/state/authAction.jsx";
import {RoleBasedRedirect, RoleBasedRoute} from "../protectedRoutes/RoleBasedRoute.jsx"
import { sellerRoutes } from "./sellerRoutes.jsx";
import { buyerRoutes } from "./buyerRoutes.jsx";
import UnAuthorized from "../../feature/dashBoard/ui/pages/UnAuthorized.jsx";



const AppRoutes =() => {
 const dispatch = useDispatch()


  useEffect(()=>{
    (()=>{
      dispatch(getMe())
    })()
  },[])
  

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute/>,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <RegisterFrom />,
            },
            {
              path: "/login",
              element: <LoginFrom />,
            },
          ],
        },
      ],
    },
     {
      path: "/main",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
      {
            index: true, 
            element: <RoleBasedRedirect/>
          },
            {
              path: "seller", //  /main/seller
              element: <RoleBasedRoute allowedRoles={["seller"]} />, 
              children: sellerRoutes,
            },
            {
             path:"buyer", // /main/buyer
              element: <RoleBasedRoute allowedRoles={["user"]} />, 
              children: buyerRoutes,
            },
          ],
        },
      ],
    },
    {
      path:"/unauthorized",
      element:<UnAuthorized/>
    }
  ]);
  return <RouterProvider router={routes} />;
};
export default AppRoutes;
