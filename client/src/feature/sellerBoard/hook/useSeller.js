import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { createProduct, deleteProduct, getMyProduct, updateProduct } from "../api/sellProductApi.js"
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";


export const useSeller =()=>{
    const queryClient = useQueryClient();
     const navigate = useNavigate();
     const location = useLocation();
     
    const editProductData = location.state?.editProductData; 
   
    
    const {register, reset, handleSubmit, setError, control, formState: { errors }} = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: { amount: "", currency: "INR" },
            sizes: [{ size: "", stock: "" }],
            images: [],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "sizes",});

     useEffect(() => {
        if (editProductData) {
            reset({
                title: editProductData.title,
                description: editProductData.description,
                price: {
                    amount: editProductData.price?.amount || "",
                    currency: editProductData.price?.currency || "INR",
                },
                sizes: editProductData.sizes || [{ size: "", stock: "" }],
                images: [], 
            });
        }
    }, [editProductData, reset]);

    const {data,isLoading}= useQuery({
        queryKey:["products"],
        queryFn:getMyProduct
    })


  //add product
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate("/main/seller/products",{ replace: true, state: {} })
        reset({
            title: "",
            description: "",
            price: { amount: "", currency: "INR" },
            sizes: [{ size: "", stock: "" }],
            images: [],
        });
    },
    onError: (error) => {
        console.error("Mutation failed:", error);
    }
   });


   //update product
   const updateProductMutation = useMutation({
    mutationFn:updateProduct,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate("/main/seller/products", { replace: true, state: {} });
       reset({
            title: "",
            description: "",
            price: { amount: "", currency: "INR" },
            sizes: [{ size: "", stock: "" }],
            images: [],
        });; 
    },
    onError: (error) => {
        console.error("Mutation failed:", error);
    }
  });

   const handleEditProduct =(product)=>{
     navigate("/main/seller/products/create", { state: { editProductData: product } });
    }

const deleteProductMutation =useMutation({
        mutationFn:deleteProduct,
        onSuccess:(()=>{
            queryClient.invalidateQueries({queryKey: ["products"]})
        })
    })

    const addProductForm =(data)=>{
        if (editProductData?._id) {
        updateProductMutation.mutate({ id: editProductData._id, data: data });
        return;
        }
      addProductMutation.mutate(data)
    }

   

    return{
    deleteProductMutation, isEditing: !!editProductData , handleEditProduct, navigate, data ,isLoading,register,reset,handleSubmit,setError,errors,control,fields,append,remove,addProductForm
    }
}