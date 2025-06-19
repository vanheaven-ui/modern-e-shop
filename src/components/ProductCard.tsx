"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/products-api'; 
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '@/context/WishListContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();

  const isProductInWishlist = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      showToast("Please sign in to add items to your wishlist.", "info");
      return;
    }

    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist.`, 'info');
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist!`, 'success');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors duration-200 z-10
          ${isProductInWishlist ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-gray-500 hover:text-red-500'}
        `}
        aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>

      <Link href={`/products/${product.id}`} className="block">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-t-lg"
          priority
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-dark-text mb-2">{product.name}</h3>
          <span className="text-sm text-primary-blue bg-blue-100 px-2 py-1 rounded-full inline-block mb-2">
            {product.category}
          </span>
          <p className="text-lg font-bold text-dark-text">${product.price.toFixed(2)}</p>
          <div className="block text-center bg-primary-blue text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 mt-4 w-full">
            View Details
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
