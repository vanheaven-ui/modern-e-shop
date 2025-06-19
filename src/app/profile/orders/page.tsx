"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { getUserOrders, Order, OrderItem } from "@/lib/orders-api";

const OrderHistoryPage: React.FC = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      showToast("Please sign in to view your order history.", "info", 5000);
      router.push("/signin");
    }
  }, [isLoggedIn, router, showToast]);

  // Fetch orders when logged in and userEmail is available
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      setLoading(true);
      setError(null);
      try {
        // Simulate fetching orders for the logged-in user
        const userOrders = getUserOrders(userEmail);
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError("Failed to load order history. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }, [isLoggedIn, userEmail]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-light-text text-xl">Redirecting to sign in...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-light-text text-xl">Loading order history...</p>
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-dark-text">Order History</h1>
        <button
          onClick={() => router.push("/profile")} // Go back to profile page
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
          Back to Profile
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-light-text mb-6">
            You have no past orders.
          </p>
          <Link
            href="/products"
            className="bg-primary-blue text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm border border-secondary-gray"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-dark-text">
                  Order ID: {order.id}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-light-text mb-4">
                Order Date: {order.orderDate}
              </p>

              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <h3 className="text-lg font-semibold text-dark-text mb-3">
                  Items:
                </h3>
                <div className="space-y-3">
                  {order.items.map((item: OrderItem) => (
                    <div
                      key={item.productId}
                      className="flex items-center space-x-4"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded object-cover"
                      />
                      <div className="flex-grow">
                        <p className="text-dark-text font-medium">
                          {item.name}
                        </p>
                        <p className="text-light-text text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-dark-text">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-dark-text">
                  Shipping Address:
                </h3>
                <p className="text-light-text">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-light-text">
                  {order.shippingAddress.address}
                </p>
                <p className="text-light-text">
                  {order.shippingAddress.city}, {order.shippingAddress.zip}
                </p>
                <p className="text-light-text">
                  {order.shippingAddress.country}
                </p>
              </div>

              <div className="text-right text-dark-text border-t border-secondary-gray pt-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-primary-blue ml-2">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
