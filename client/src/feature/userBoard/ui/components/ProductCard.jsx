import { useState } from "react";

const ProductCard = ({ product }) => {
  // First safely destructure product
  const {
    _id,
    title,
    description,
    images = [],
    price = {},
    sizes = [],
  } = product || {};

  const {
    amount,
    currency = "INR",
  } = price;

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  // Product data abhi load nahi hua
  if (!product) {
    return (
      <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-md">
        <div className="h-80 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200" />

        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  const nextImage = () => {
    if (images.length === 0) return;

    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (images.length === 0) return;

    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartProduct = {
      productId: _id,
      title,
      price: amount,
      size: selectedSize?.size || null,
      quantity: 1,
    };

    console.log("Cart Product:", cartProduct);
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg">

      {/* IMAGE */}
      <div className="relative h-[420px] w-full bg-gray-100">

        {images.length > 0 ? (
          <img
            src={images[currentImage]}
            alt={title || "Product"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={previousImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xl shadow-md hover:bg-gray-100"
          >
            ‹
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xl shadow-md hover:bg-gray-100"
          >
            ›
          </button>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 w-2 rounded-full ${
                  currentImage === index
                    ? "bg-black"
                    : "bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-5">

        {/* TITLE */}
        <h2 className="text-lg font-semibold capitalize text-gray-900">
          {title || "Product Name"}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {description || "No description available"}
        </p>

        {/* PRICE */}
        <div className="mt-3">
          <span className="text-xl font-bold text-gray-900">
            {currency} {amount ?? "N/A"}
          </span>
        </div>

        {/* SIZE */}
        {sizes.length > 0 && (
          <div className="mt-4">

            <p className="mb-2 text-sm font-medium text-gray-700">
              Select Size
            </p>

            <div className="flex flex-wrap gap-2">

              {sizes.map((item) => {

                const outOfStock = item.stock <= 0;
                const selected =
                  selectedSize?.size === item.size;

                return (
                  <button
                    key={item._id || item.size}
                    disabled={outOfStock}
                    onClick={() => setSelectedSize(item)}
                    className={`
                      min-w-[45px]
                      rounded-md
                      border
                      px-3
                      py-2
                      text-sm
                      font-medium
                      transition

                      ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-700"
                      }

                      ${
                        outOfStock
                          ? "cursor-not-allowed opacity-40 line-through"
                          : "hover:border-black"
                      }
                    `}
                  >
                    {item.size}
                  </button>
                );
              })}

            </div>
          </div>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="mt-5 w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;