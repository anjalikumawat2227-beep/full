import { useState } from "react";

const MyProductCard = ({ product,handleEditProduct, deleteProductMutation}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-68 min-w-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.images[selectedImage]}
          alt={product.title}
          className="w-full h-72 object-cover"
        />

        {/* Image count */}
        <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {selectedImage + 1} / {product.images.length}
        </span>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-1 px-2 pt-3 overflow-x-auto ">
        {product.images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`w-15 h-15 rounded-lg overflow-hidden border-2 shrink-0 ${
              selectedImage === index
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <img
              src={image}
              alt={`${product.title}-${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Product Details */}
      <div className="p-3">

        <h2 className="text-lg font-bold text-gray-800 truncate">
          {product.title}
        </h2>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.amount}
          </span>

          <span className="text-xs text-gray-500">
            {product.price.currency}
          </span>
        </div>

        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Sizes & Stock */}
        <div className="mt-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Sizes & Stock
          </h3>

          <div className="space-y-2">
            {product.sizes.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border border-gray-200 rounded-lg px-3 py-2"
              >
                <span className="font-medium text-gray-700">
                  {item.size}
                </span>

                <span className="text-green-600 font-semibold">
                  {item.stock}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          <button
            type="button"
            onClick={() => handleEditProduct(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() =>deleteProductMutation.mutate(product._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2rounded-lg font-medium transition"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default MyProductCard;