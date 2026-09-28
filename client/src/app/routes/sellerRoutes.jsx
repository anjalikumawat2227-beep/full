import AddProducts from "../../feature/sellerBoard/ui/pages/AddProducts.jsx";
import DashBoard from "../../feature/sellerBoard/ui/pages/DasBoard.jsx";
import MyProducts from "../../feature/sellerBoard/ui/pages/MyProducts.jsx";



export const sellerRoutes = [ 
    {
        path: "", 
        element: <DashBoard/>
    },
    {
        path: "products", 
        element: <MyProducts/>
    },
    {
        path: "products/create", 
        element: <AddProducts/>
    }
];
