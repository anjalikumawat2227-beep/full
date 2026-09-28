import { getAllProducts } from "../api/product.api"

import {useQuery} from "@tanstack/react-query"
export const useBuyer=()=>{
const {data,isFetching ,isLoading,isPending} = useQuery({
    queryKey:["products"],
    queryFn:getAllProducts
})

return {
    data,isFetching,isLoading,isPending
}

}