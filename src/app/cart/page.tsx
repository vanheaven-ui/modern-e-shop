"use client"; // This page uses client-side hooks like useCart, so it must be a client component.

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import { useCart } from "../../context/CartContext"; // Import the useCart hook

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();
  const router = useRouter(); // Initialize useRouter

  // Handle quantity change from input field
  const handleQuantityChange = (
    productId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(event.target.value, 10);
    updateQuantity(productId, newQuantity);
  };

  // Handle quantity decrement
  const handleDecrement = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity - 1);
  };

  // Handle quantity increment
  const handleIncrement = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  // Handle navigation to checkout page
  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/checkout"); // Navigate to the /checkout page
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-dark-text mb-8 text-center">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-light-text mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="bg-primary-blue text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-dark-text mb-6">
              Items
            </h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-secondary-gray pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={96} // Smaller image for cart list
                      height={96}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-dark-text">
                      {item.name}
                    </h3>
                    <p className="text-light-text text-sm">{item.category}</p>
                    <p className="text-primary-blue font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      className="bg-secondary-gray text-dark-text w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                      disabled={item.quantity <= 1} // Disable decrement button if quantity is 1
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      min="1"
                    />
                    <button
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      className="bg-secondary-gray text-dark-text w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={clearCart}
              className="mt-6 text-red-500 hover:text-red-700 transition-colors duration-200 text-sm font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-semibold text-dark-text mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 text-dark-text">
              <div className="flex justify-between items-center">
                <span className="text-lg">
                  Subtotal ({cartItems.length} items)
                </span>
                <span className="font-semibold text-lg">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Shipping</span>
                <span className="font-semibold text-lg">$0.00</span>{" "}
                {/* For simplicity, assuming free shipping */}
              </div>
              <div className="border-t border-secondary-gray pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Order Total</span>
                <span className="text-xl font-bold text-primary-blue">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="mt-8 w-full bg-primary-blue text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
