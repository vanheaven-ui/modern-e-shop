"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { Product } from "../../../lib/products-api"; // UPDATED IMPORT
import { useWishlist } from "@/context/WishListContext";

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      showToast("Please sign in to view your wishlist.", "info", 5000);
      router.push("/signin");
    }
  }, [isLoggedIn, router, showToast]);

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast(`${product.name} moved to cart!`, "success");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-light-text text-xl">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-dark-text">Your Wishlist</h1>
        <button
          onClick={() => router.push("/profile/dashboard")}
          className="inline-flex items-center bg-secondary-gray text-dark-text px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-light-text mb-6">
            Your wishlist is empty.
          </p>
          <Link
            href="/products"
            className="bg-primary-blue text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-4 space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-semibold text-dark-text">
                  {item.name}
                </h3>
                <p className="text-light-text text-sm">{item.category}</p>
                <p className="text-primary-blue font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 text-sm font-semibold"
            >
              Clear All Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
