// src/components/ProductReviewsSection.tsx
// Create this new file in your project: `src/components/ProductReviewsSection.tsx`

"use client";

import React from 'react';
import { Product } from '../data/products'; // Assuming Product interface is accessible

interface ProductReviewsSectionProps {
  reviews?: Product['reviews']; // Directly use the reviews type from Product
}

const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ reviews }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-dark-text mb-2">Reviews:</h2>
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-sm font-semibold text-dark-text">Rating: {review.rating}/5</p>
              <p className="text-light-text italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-light-text">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviewsSection;
