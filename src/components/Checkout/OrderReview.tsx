"use client";

import { useCart } from "@/context/CartContext";
import React from "react";

interface ShippingInfo {
  // Re-define or import from ShippingForm if it's exported
  fullName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

interface OrderReviewProps {
  shippingInfo: ShippingInfo;
  paymentMethod: string;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  shippingInfo,
  paymentMethod,
}) => {
  const { cartItems, cartTotal } = useCart();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark-text mb-4">Order Review</h2>
      {/* Shipping Info Review */}
      <div className="bg-gray-50 p-4 rounded-lg border border-secondary-gray">
        <h3 className="text-lg font-semibold text-dark-text mb-2">
          Shipping To:
        </h3>
        <p className="text-dark-text">{shippingInfo.fullName}</p>
        <p className="text-light-text">{shippingInfo.address}</p>
        <p className="text-light-text">
          {shippingInfo.city}, {shippingInfo.zip}
        </p>
        <p className="text-light-text">{shippingInfo.country}</p>
      </div>

      {/* Payment Method Review */}
      <div className="bg-gray-50 p-4 rounded-lg border border-secondary-gray">
        <h3 className="text-lg font-semibold text-dark-text mb-2">
          Payment With:
        </h3>
        <p className="text-dark-text">
          {paymentMethod
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
      </div>

      {/* Items Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border border-secondary-gray">
        <h3 className="text-lg font-semibold text-dark-text mb-2">
          Items in Cart:
        </h3>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between text-dark-text">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="border-t border-secondary-gray pt-4 flex justify-between items-center text-dark-text">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold text-primary-blue">
          ${cartTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderReview;
