
import { useSeller } from "../../hook/useSeller"


const AddProductsFrom = () => {
  const {register,handleSubmit,addProductForm,isEditing,errors,isLoading,fields,remove,append}=useSeller()

  

  return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Add Product
          </h1>

          <p className="text-gray-500 mt-1">
            Add your product details, images, sizes and stock.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(addProductForm)}
          encType="multipart/form-data"
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
        >

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Title
            </label>

            <input
              type="text"
              placeholder="Enter product title"
              {...register("title", {
                required: "Product title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition
                ${
                  errors.title
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border resize-none outline-none transition
                ${
                  errors.description
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>

            <div className="flex gap-3">

              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Enter amount"
                  {...register("price.amount", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price cannot be negative",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border outline-none
                    ${
                      errors.price?.amount
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                />

                {errors.price?.amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price?.amount.message}
                  </p>
                )}
              </div>

              <select
                {...register("price.currency")}
                className="w-32 px-3 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-blue-500"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>

            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 cursor-pointer"
            />

            <p className="text-xs text-gray-500 mt-2">
              You can upload maximum 5 images.
            </p>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-center mb-3">

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Sizes & Stock
                </h2>

                <p className="text-sm text-gray-500">
                  Add the available sizes and their stock.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  append({
                    size: "",
                    stock: "",
                  })
                }
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
              >
                + Add Size
              </button>

            </div>

            <div className="space-y-3">

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg border border-gray-200"
                >

                  {/* Size */}
                  <div className="flex-1">
                    <select
                      {...register(`sizes.${index}.size`, {
                        required: "Select size",
                      })}
                      className={`w-full px-3 py-2.5 bg-white rounded-lg border outline-none
                        ${
                          errors.sizes?.[index]?.size
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                    >
                      <option value="">Select size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>

                    {errors.sizes?.[index]?.size && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.sizes[index].size.message}
                      </p>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Stock"
                      {...register(`sizes.${index}.stock`, {
                        required: "Stock is required",
                        min: {
                          value: 0,
                          message: "Stock cannot be negative",
                        },
                      })}
                      className={`w-full px-3 py-2.5 bg-white rounded-lg border outline-none
                        ${
                          errors.sizes?.[index]?.stock
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                    />

                    {errors.sizes?.[index]?.stock && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.sizes[index].stock.message}
                      </p>
                    )}
                  </div>

                  {/* Remove */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-3 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}

                </div>
              ))}

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition"
          >
            {isEditing ? "Save Changes (Update)" : "Submit Product (Add)"}
          </button>

        </form>
      </div>
    </div>
  );
};


export default AddProductsFrom