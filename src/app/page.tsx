import React, { useMemo } from "react";
import Link from "next/link";
import { getProducts } from "../lib/products-api"; 
import ProductCard from "../components/ProductCard"; 

const HomePage: React.FC = () => {
  const featuredProducts = useMemo(() => getProducts().slice(0, 4), []); // Get first 4 products as featured

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-dark-text mb-6">
        Discover Our Amazing Products
      </h1>
      <p className="text-lg text-light-text mb-8 max-w-2xl mx-auto">
        Explore a curated collection of high-quality items designed to enhance
        your life.
      </p>
      <Link
        href="/products"
        className="bg-primary-blue text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 inline-block"
      >
        Explore Products
      </Link>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-dark-text mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
