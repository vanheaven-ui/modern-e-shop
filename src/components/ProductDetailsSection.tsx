"use client";

import React from "react";
import { Product } from "../lib/products-api"; // UPDATED IMPORT
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "@/context/WishListContext";

interface ProductDetailsSectionProps {
  product: Product;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  product,
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();

  const isProductInWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      showToast("Please sign in to add items to your wishlist.", "info");
      return;
    }

    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist.`, "info");
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist!`, "success");
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-0 lg:p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-dark-text mb-4">
          {product.name}
        </h1>
        <span className="text-lg text-primary-blue bg-blue-100 px-3 py-1 rounded-full inline-block mb-4">
          {product.category}
        </span>
        <p className="text-2xl font-bold text-primary-blue mb-6">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-base text-dark-text leading-relaxed mb-6">
          {product.description}
        </p>

        <h2 className="text-xl font-semibold text-dark-text mb-2">Features:</h2>
        <ul className="list-none space-y-2 mb-6">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start text-dark-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-grow bg-primary-blue text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={handleToggleWishlist}
            className={`p-3 rounded-lg shadow-md transition-colors duration-200
                ${
                  isProductInWishlist
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-secondary-gray text-dark-text hover:bg-gray-300"
                }
            `}
            aria-label={
              isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
