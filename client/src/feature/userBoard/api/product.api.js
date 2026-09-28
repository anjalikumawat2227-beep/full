import api from "../../../config/axiosinstens"

export const  getAllProducts =async()=>{
  let res = await api.get("/products/")
  return res.data.data
  }