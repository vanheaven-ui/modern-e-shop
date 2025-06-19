// src/components/FilterSidebar.tsx

"use client";

import React from 'react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  onCategoryChange: (category: string | null) => void;
  onMinPriceChange: (price: string) => void;
  onMaxPriceChange: (price: string) => void;
  onSearchTermChange: (term: string) => void;
  onApplyFilters: () => void; // Prop to trigger the application of filters
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  searchTerm,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearchTermChange,
  onApplyFilters,
}) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm lg:sticky lg:top-24 lg:self-start">
      <h2 className="text-2xl font-bold text-dark-text mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 py-1 cursor-pointer text-dark-text">
            <input
              type="radio"
              name="category"
              className="form-radio h-4 w-4 text-primary-blue border-gray-300 focus:ring-primary-blue"
              checked={selectedCategory === null}
              onChange={() => onCategoryChange(null)}
            />
            <span>All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 py-1 cursor-pointer text-dark-text">
              <input
                type="radio"
                name="category"
                className="form-radio h-4 w-4 text-primary-blue border-gray-300 focus:ring-primary-blue"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>

      <button
        onClick={onApplyFilters} // This calls the onApplyFilters prop from the parent
        className="bg-primary-blue text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
