"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProducts, Product } from "../lib/products-api"; // Import getProducts and Product interface
import { useWishlist } from "@/context/WishListContext";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { cartItemCount } = useCart();
  const { wishlistItemCount } = useWishlist();
  const { isLoggedIn, userEmail, signOut } = useAuth();
  const router = useRouter(); // Initialize useRouter

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    router.push("/"); // Redirect to home page after sign out
  };

  // Handle search input change and fetch suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      // Fetch suggestions after 2 characters
      const fetchedSuggestions = getProducts({ search: searchTerm }).slice(
        0,
        5
      ); // Limit to 5 suggestions
      setSuggestions(fetchedSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Clear search term after submitting
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  return (
    <nav className="sticky top-0 z-20 bg-white px-4 sm:px-6 py-4 border-b border-secondary-gray shadow-md text-base">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Site Logo/Name */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-primary-blue hover:text-blue-700 transition-colors duration-200"
        >
          <Image
            src="/favicon.svg"
            alt="Modern-E-Shop Logo"
            width={28}
            height={28}
            className="text-primary-blue"
          />
          <span className="text-2xl font-bold">Modern-E-Shop</span>
        </Link>

        {/* Desktop Navigation Links, Search, & Icons */}
        <div className="hidden md:flex items-center space-x-2 relative">
          {" "}
          {/* Added relative for search suggestions positioning */}
          <Link
            href="/"
            className="text-dark-text text-lg hover:text-primary-blue transition-colors duration-200 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-dark-text hover:text-primary-blue transition-colors duration-200 px-3 py-2 rounded-md"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-dark-text hover:text-primary-blue transition-colors duration-200 px-3 py-2 rounded-md"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-dark-text hover:text-primary-blue transition-colors duration-200 px-3 py-2 rounded-md"
          >
            About Us
          </Link>
          <div className="border-l border-gray-300 h-6 mx-2"></div>
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() =>
                searchTerm.length > 2 &&
                setSuggestions(
                  getProducts({ search: searchTerm }).slice(0, 5)
                ) &&
                setShowSuggestions(true)
              }
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay hiding to allow click
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onMouseDown={() => handleSuggestionClick(product.id)} // Use onMouseDown to prevent blur
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={32}
                      height={32}
                      className="rounded-md object-cover"
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </form>
          {/* Cart Icon with Count (Always visible on Desktop) */}
          <Link
            href="/cart"
            className="text-dark-text hover:text-primary-blue transition-colors duration-200 p-2 rounded-md relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {/* Wishlist Icon with Count (Always visible on Desktop, only if logged in) */}
          {isLoggedIn && (
            <Link
              href="/profile/wishlist"
              className="text-dark-text hover:text-red-500 transition-colors duration-200 p-2 rounded-md relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
          )}
          {/* Conditional rendering for Auth status (Desktop) */}
          {isLoggedIn ? (
            <>
              {/* User Icon/My Account */}
              <Link
                href="/profile/dashboard"
                className="flex items-center space-x-2 text-dark-text hover:text-primary-blue transition-colors duration-200 px-3 py-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden lg:inline">
                  {userEmail?.split("@")[0] || "My Account"}
                </span>
              </Link>
              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-red-600 transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Sign In & Register Buttons */}
              <Link
                href="/signin"
                className="bg-primary-blue text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="border border-primary-blue text-primary-blue px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu and specific mobile action buttons */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon with Count (Always visible on Mobile) */}
          <Link
            href="/cart"
            className="text-dark-text hover:text-primary-blue transition-colors duration-200 p-2 rounded-md relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {/* Wishlist Icon with Count (Always visible on Mobile, only if logged in) */}
          {isLoggedIn && (
            <Link
              href="/profile/wishlist"
              className="text-dark-text hover:text-red-500 transition-colors duration-200 p-2 rounded-md relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
          )}
          {/* Sign In button for mobile (only if logged out) */}
          {!isLoggedIn && (
            <Link
              href="/signin"
              className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In
            </Link>
          )}
          {/* User Icon/Sign Out for mobile (only if logged in) */}
          {isLoggedIn && (
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-red-600 transition-colors duration-200"
            >
              Sign Out
            </button>
          )}
          {/* Mobile menu button (Hamburger) */}
          <button
            onClick={toggleMobileMenu}
            className="text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-blue rounded-md p-2"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (includes search bar for mobile) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-secondary-gray">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4 px-2">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() =>
                searchTerm.length > 2 &&
                setSuggestions(
                  getProducts({ search: searchTerm }).slice(0, 5)
                ) &&
                setShowSuggestions(true)
              }
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onMouseDown={() => handleSuggestionClick(product.id)}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={32}
                      height={32}
                      className="rounded-md object-cover"
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </form>

          <div className="flex flex-col items-start space-y-2 px-2">
            <Link
              href="/"
              onClick={toggleMobileMenu}
              className="w-full text-dark-text hover:text-primary-blue transition-colors duration-200 py-2 px-3 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={toggleMobileMenu}
              className="w-full text-dark-text hover:text-primary-blue transition-colors duration-200 py-2 px-3 rounded-md"
            >
              Products
            </Link>
            <Link
              href="/categories"
              onClick={toggleMobileMenu}
              className="w-full text-dark-text hover:text-primary-blue transition-colors duration-200 py-2 px-3 rounded-md"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={toggleMobileMenu}
              className="w-full text-dark-text hover:text-primary-blue transition-colors duration-200 py-2 px-3 rounded-md"
            >
              About Us
            </Link>
            <div className="w-full h-px bg-gray-300 my-2"></div>
            {/* Conditional rendering for Auth status in Mobile Menu */}
            {isLoggedIn ? (
              <Link
                href="/profile/dashboard"
                onClick={toggleMobileMenu}
                className="w-full text-dark-text hover:text-primary-blue transition-colors duration-200 py-2 px-3 rounded-md flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>My Account</span>
              </Link>
            ) : (
              <Link
                href="/register"
                onClick={toggleMobileMenu}
                className="w-full border border-primary-blue text-primary-blue py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
