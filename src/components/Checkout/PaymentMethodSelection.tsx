"use client";

import React from "react";

interface PaymentMethodSelectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark-text mb-4">Payment Method</h2>
      <div className="flex flex-col space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer p-4 border border-secondary-gray rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <input
            type="radio"
            name="paymentMethod"
            value="credit_card"
            checked={paymentMethod === "credit_card"}
            onChange={() => onPaymentMethodChange("credit_card")}
            className="form-radio h-5 w-5 text-primary-blue focus:ring-primary-blue"
          />
          <span className="text-dark-text font-medium">Credit Card</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer p-4 border border-secondary-gray rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => onPaymentMethodChange("paypal")}
            className="form-radio h-5 w-5 text-primary-blue focus:ring-primary-blue"
          />
          <span className="text-dark-text font-medium">PayPal</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer p-4 border border-secondary-gray rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <input
            type="radio"
            name="paymentMethod"
            value="bank_transfer"
            checked={paymentMethod === "bank_transfer"}
            onChange={() => onPaymentMethodChange("bank_transfer")}
            className="form-radio h-5 w-5 text-primary-blue focus:ring-primary-blue"
          />
          <span className="text-dark-text font-medium">Bank Transfer</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
