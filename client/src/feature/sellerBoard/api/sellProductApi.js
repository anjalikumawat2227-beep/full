import api from "../../../config/axiosinstens.js"

export const getMyProduct =async()=>{
 try {
    const res = await api.get("/products/my-products")
    return res.data.data
 } catch (error) {
    return error.response.data
 }
}

export const createProduct = async (data) => {
   try {   
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

     formData.append("price", JSON.stringify(data.price));

      formData.append("sizes", JSON.stringify(data.sizes));

      if (data.images && data.images.length > 0) {
         for (let i = 0; i < data.images.length; i++) {
            formData.append("images", data.images[i]);
         }
      }

      const res = await api.post("/products/", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         }
      });
      return res.data.data;

   } catch (error) {

      console.log("Product post api error:", error.response?.data || error.message);
      throw error; 
   }
};

export const updateProduct = async ({ id, data }) => { // 👈 async add kiya
   try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", JSON.stringify(data.price));
      formData.append("sizes", JSON.stringify(data.sizes));

      if (data.images && data.images.length > 0) {
         for (let i = 0; i < data.images.length; i++) {
            formData.append("images", data.images[i]);
         }
      }

      const res = await api.put(`/products/${id}`, formData, { // 👈 await add kiya
         headers: {
            "Content-Type": "multipart/form-data",
         }
      });
      return res.data.data;
   } catch (error) {
      console.log("Product update api error:", error.response?.data || error.message);
      throw error;
   }
};

export const deleteProduct = async(id)=>{
   try {
      let res = await api.delete(`/products/${id}`)
      return res.data
   } catch (error) {
         console.log("Product delete api error:", error.response?.data || error.message);
      throw error;
   }
}
