"use client";

import React from "react";

interface CheckoutProgressIndicatorProps {
  currentStep: number;
}

const CheckoutProgressIndicator: React.FC<CheckoutProgressIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="flex justify-between items-center mb-10 relative">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-secondary-gray rounded-full"></div>
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-blue rounded-full transition-all duration-300`}
        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
      ></div>

      <div className="flex flex-col items-center flex-1 z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
            currentStep >= 1 ? "bg-primary-blue" : "bg-secondary-gray"
          }`}
        >
          1
        </div>
        <span className="mt-2 text-dark-text text-sm">Shipping</span>
      </div>
      <div className="flex flex-col items-center flex-1 z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
            currentStep >= 2 ? "bg-primary-blue" : "bg-secondary-gray"
          }`}
        >
          2
        </div>
        <span className="mt-2 text-dark-text text-sm">Payment</span>
      </div>
      <div className="flex flex-col items-center flex-1 z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
            currentStep >= 3 ? "bg-primary-blue" : "bg-secondary-gray"
          }`}
        >
          3
        </div>
        <span className="mt-2 text-dark-text text-sm">Review</span>
      </div>
    </div>
  );
};

export default CheckoutProgressIndicator;
