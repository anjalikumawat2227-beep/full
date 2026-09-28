
import Cart from "../../feature/userBoard/ui/pages/Cart.jsx";
import Oderes from "../../feature/userBoard/ui/pages/Oderes.jsx";
import Products from "../../feature/userBoard/ui/pages/Products.jsx";

export const buyerRoutes = [
    {
        path: "",
        element: <Products/>
    },
    {
        path: "cart", 
        element: <Cart/>
    },
    {
        path: "orders", 
        element: <Oderes/>
    }
];

