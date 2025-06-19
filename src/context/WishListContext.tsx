"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Product } from "../lib/products-api"; 
import { useAuth } from "./AuthContext";

interface WishlistItem extends Product {}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistItemCount: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userEmail, isLoggedIn } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isLoggedIn && userEmail) {
        const savedWishlist = localStorage.getItem(
          `modern-e-shop-wishlist-${userEmail}`
        );
        setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
      } else {
        setWishlistItems([]);
      }
    }
  }, [userEmail, isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined" && isLoggedIn && userEmail) {
      localStorage.setItem(
        `modern-e-shop-wishlist-${userEmail}`,
        JSON.stringify(wishlistItems)
      );
    }
  }, [wishlistItems, isLoggedIn, userEmail]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some((item) => item.id === productId);
    },
    [wishlistItems]
  );

  const wishlistItemCount = useMemo(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const contextValue: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistItemCount,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
