"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../../components/ProductCard"; // Assuming this import path is correct
import FilterSidebar from "../../components/FilterSidebar"; // Assuming this import path is correct
import { getProducts, getCategories, Product } from "../../lib/products-api"; // UPDATED IMPORT

const ProductsCatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<{
    category: string | null;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }>({ category: null });

  // Simulate fetching categories on mount
  useEffect(() => {
    const fetchedCategories = getCategories();
    setCategories(fetchedCategories);
  }, []);

  // Simulate fetching products based on applied filters
  useEffect(() => {
    const fetchProducts = () => {
      const fetchedProducts = getProducts({
        category: appliedFilters.category || undefined,
        minPrice: appliedFilters.minPrice,
        maxPrice: appliedFilters.maxPrice,
        search: appliedFilters.search,
      });
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, [appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      category: selectedCategory,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      search: searchTerm || undefined,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark-text mb-8 text-center lg:text-left">
        Our Products
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:sticky lg:top-24 lg:self-start lg:w-1/4">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            searchTerm={searchTerm}
            onCategoryChange={setSelectedCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onSearchTermChange={setSearchTerm}
            onApplyFilters={handleApplyFilters}
          />
        </div>

        <div className="w-full lg:w-3/4">
          {products.length === 0 ? (
            <p className="text-light-text text-center text-xl mt-12">
              No products found matching your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCatalogPage;
