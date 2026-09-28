import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const AsideNav = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <aside className=" w-40 shrink-0 h-132 overflow-hidden bg-gray-400 text-white mt-1.5 flex flex-col gap-3 px-4 pt-4">
      {user?.role === "seller" ? (
        <>
          <NavLink to="/main/seller">Dashboard</NavLink>
          <NavLink to="/main/seller/products">My Products</NavLink>
          <NavLink to="/main/seller/products/create">Add Product</NavLink>
        </>
      ) : (
        <>

          <NavLink to="/main/buyer">Products</NavLink>
          <NavLink to="/main/buyer/cart">Cart</NavLink>
          <NavLink to="/main/buyer/orders">My Orders</NavLink>
        </>
      )}
    </aside>
  );
};

export default AsideNav;