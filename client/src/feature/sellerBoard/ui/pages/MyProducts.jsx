import { useSeller } from "../../hook/useSeller.js"
import MyProductCard from "../components/MyProductCard.jsx";

const MyProducts = () => {
  const {data,isLoading,handleEditProduct, deleteProductMutation} =useSeller()
  if (isLoading) return <h1>Loading..</h1>;
  
  return (
  <div className="mx-2 my-2 p-4 rounded bg-gray-300 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-y-scroll">
 {
  data?.product.map((product)=>{
    return <MyProductCard key={product._id} product={product} handleEditProduct={handleEditProduct}  deleteProductMutation={ deleteProductMutation}/>
  })
 }
    </div>
    
  )
}

export default MyProducts