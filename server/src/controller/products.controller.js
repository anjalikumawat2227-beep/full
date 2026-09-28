import productModel from "../model/products.module.js";
import { uploadFile } from "../services/storage.service.js";

//create a product by seller
export const createProductsController = async (req, res) => {
  const filesUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    let response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });
    filesUrls.push(response.url);
  }

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: filesUrls,
    seller: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "product created successfully",
    data: { product },
  });
};

///list all products
export async function listAllProducts(req, res) {
  const products = await productModel.find();

  res.status(200).json({
    message: "Products data fetched successfully",
    data: {
      products,
    },
  });
}

//update product
export async function updateProductController(req, res) {

  const productId = req.params.id;

 const findProduct = await productModel.findById(productId)

 if(!findProduct){
    res.status(404).json({
        success:false,
        message:"product not found"
    })
 }

 const filesUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    let response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });
    filesUrls.push(response.url);
  }

 const updateProduct = await productModel.findByIdAndUpdate(productId,{
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: filesUrls,
    seller: req.user.id,
  }, { new: true });

  res.status(200).json({
    success: true,
    message:"product updated successfully",
    data:{
        product:updateProduct
    }
  });
}

//delete product 
export async function deleteProductController(req,res){
 const productId = req.params.id;

 const findProduct = await productModel.findById(productId)

 if(!findProduct){
    res.status(404).json({
        success:false,
        message:"product not found"
    })
 } 

 await productModel.findByIdAndDelete(req.params.id);

 res.status(204).json({
    success:true,
    message:"product deleted successfully."
 })

}

//myProduct list 
export async function myProductController(req,res){

  const product = await productModel.find({seller :req.user.id})
  if(!product){
   return res.status(404).json({
    success:false,
    message:"product not found"
   })
  }
  console.log(product)

  res.status(200).json({
    success:true,
    message:"product fetch successfully",
    data:{
      product
    }
  })

}