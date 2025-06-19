// src/components/ProductImageSection.tsx

"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '../data/products'; 

interface ProductImageSectionProps {
  product: Product;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({ product }) => {
  return (
    <div className="w-full lg:w-1/2">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={600} 
        height={450} 
        className="w-full h-auto object-contain rounded-lg shadow-md"
        priority 
      />
    </div>
  );
};

export default ProductImageSection;
