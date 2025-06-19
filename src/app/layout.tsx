import type { Metadata } from "next";
import "./globals.css";

import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishListContext";

export const metadata: Metadata = {
  title: "Modern-E-Shop",
  description:
    "A modern product showcase application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`antialiased bg-app-bg text-dark-text min-h-screen flex flex-col`}
      >
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                  {children}
                </main>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
