
import { useBuyer } from "../../hook/useBuyerHook.js";
import ProductCard from "../components/ProductCard.jsx";

const Products = () => {
  const { data, isLoading } = useBuyer();

  if (isLoading) return <h1>Loading..</h1>;
  return (
    <div className="grid grid-cols-1 gap-6 p-2 mt-2 mx-2 rounded bg-gray-300 sm:grid-cols-2 lg:grid-cols-4 overflow-y-auto">
      {data.products?.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Products;
