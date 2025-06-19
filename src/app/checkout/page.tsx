"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import CheckoutProgressIndicator from "@/components/Checkout/CheckoutProgressIndicator";
import ShippingForm from "@/components/Checkout/ShippingForm";
import PaymentMethodSelection from "@/components/Checkout/PaymentMethodSelection";
import OrderReview from "@/components/Checkout/OrderReview";

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Redirect to cart if it's empty
  useEffect(() => {
    if (cartItems.length === 0 && currentStep === 1) {
      showToast(
        "Your cart is empty. Please add items to proceed to checkout.",
        "info",
        5000
      );
      router.push("/cart");
    }
  }, [cartItems, currentStep, router, showToast]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const { fullName, address, city, zip, country } = shippingInfo;
      if (!fullName || !address || !city || !zip || !country) {
        showToast("Please fill in all shipping information.", "error");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePlaceOrder = () => {
    showToast("Order Placed Successfully!", "success", 5000);
    clearCart();
    router.push("/");
  };

  if (cartItems.length === 0 && currentStep > 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-light-text text-xl">Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-dark-text mb-8 text-center">
        Checkout
      </h1>

      {/* Use the new Progress Indicator component */}
      <CheckoutProgressIndicator currentStep={currentStep} />

      {/* Step Content */}
      <div className="p-6 border border-secondary-gray rounded-lg">
        {currentStep === 1 && (
          <ShippingForm
            shippingInfo={shippingInfo}
            onShippingChange={handleShippingChange}
          />
        )}

        {currentStep === 2 && (
          <PaymentMethodSelection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        )}

        {currentStep === 3 && (
          <OrderReview
            shippingInfo={shippingInfo}
            paymentMethod={paymentMethod}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={handlePrevStep}
            className="bg-secondary-gray text-dark-text px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={handleNextStep}
            className={`px-6 py-3 rounded-lg shadow-md transition-colors duration-200 ${
              currentStep === 1 ? "ml-auto" : ""
            } ${
              cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-blue text-white hover:bg-blue-700"
            }`}
            disabled={cartItems.length === 0}
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 ml-auto"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
