"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { getUserOrders } from "../../../lib/orders-api";
import { useWishlist } from "@/context/WishListContext";

const UserDashboardPage: React.FC = () => {
  const { isLoggedIn, userEmail, signOut } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [orderCount, setOrderCount] = useState<number>(0);
  const { wishlistItemCount } = useWishlist(); // Get wishlist item count for display

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      showToast("Please sign in to access your dashboard.", "info", 5000);
      router.push("/signin");
    }
  }, [isLoggedIn, router, showToast]);

  // Fetch order count for dashboard summary
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      try {
        const orders = getUserOrders(userEmail);
        setOrderCount(orders.length);
      } catch (error) {
        console.error("Failed to fetch order count for dashboard:", error);
        // Optionally show a less critical toast, or handle silently
      }
    }
  }, [isLoggedIn, userEmail]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-light-text text-xl">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-dark-text mb-8 text-center">
        Welcome, {userEmail?.split("@")[0]}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Account Info Card */}
        <div className="bg-primary-blue text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-3"
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
          <h2 className="text-xl font-semibold mb-2">My Account</h2>
          <p className="text-sm opacity-90">{userEmail}</p>
          <Link
            href="/profile"
            className="mt-4 text-white hover:underline text-sm font-medium"
          >
            View Details
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">My Orders</h2>
          <p className="text-sm opacity-90">{orderCount} Total Orders</p>
          <Link
            href="/profile/orders"
            className="mt-4 text-white hover:underline text-sm font-medium"
          >
            View Order History
          </Link>
        </div>

        {/* Wishlist Summary Card */}
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-3"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">My Wishlist</h2>
          <p className="text-sm opacity-90">{wishlistItemCount} Items</p>
          <Link
            href="/profile/wishlist"
            className="mt-4 text-white hover:underline text-sm font-medium"
          >
            Explore Wishlist
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-secondary-gray">
        <h2 className="text-2xl font-bold text-dark-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/products"
            className="bg-secondary-gray text-dark-text px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-center font-semibold"
          >
            Continue Shopping
          </Link>
          <Link
            href="/settings"
            className="bg-secondary-gray text-dark-text px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-center font-semibold"
          >
            Account Settings (Future)
          </Link>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="text-center mt-8">
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 text-lg font-semibold"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserDashboardPage;
