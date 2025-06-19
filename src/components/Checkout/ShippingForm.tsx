"use client";

import React from "react";

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  onShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  onShippingChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark-text mb-4">
        Shipping Information
      </h2>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={shippingInfo.fullName}
        onChange={onShippingChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={shippingInfo.address}
        onChange={onShippingChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={onShippingChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={shippingInfo.zip}
          onChange={onShippingChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
      </div>
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={shippingInfo.country}
        onChange={onShippingChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
      />
    </div>
  );
};

export default ShippingForm;
