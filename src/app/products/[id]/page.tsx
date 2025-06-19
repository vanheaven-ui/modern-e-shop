"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import ProductDetailsSection from "../../../components/ProductDetailsSection"; // Assuming this import path is correct
import { getProductById, Product } from "../../../lib/products-api"; // UPDATED IMPORT
import { useWishlist } from "@/context/WishListContext";

interface ProductDetailPageProps {
  params: { id: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      setError(null);
      const foundProduct = getProductById(params.id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Product not found.");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-light-text text-xl">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-xl text-dark-text">{error}</p>
        <button
          onClick={() => router.back()}
          className="bg-secondary-gray text-dark-text px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 mt-8"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Product Not Found
        </h1>
        <p className="text-xl text-dark-text">
          The product you are looking for does not exist.
        </p>
        <button
          onClick={() => router.back()}
          className="bg-secondary-gray text-dark-text px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 mt-8"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center bg-secondary-gray text-dark-text px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 mb-8"
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
        Back to Products
      </button>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-6 rounded-lg shadow-md">
        <div className="w-full lg:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={450}
            className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
            priority
          />
        </div>
        <ProductDetailsSection product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
