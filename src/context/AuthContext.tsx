"use client"; // This context is client-side, so it needs this directive.

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null; // To display user's email if logged in
  signIn: (email: string) => Promise<void>; // Function to mock sign in
  signOut: () => void; // Function to mock sign out
}

// Create the Context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize login status from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isLoggedIn") === "true";
    }
    return false;
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userEmail");
    }
    return null;
  });

  // Persist login status and email to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", String(isLoggedIn));
      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
      } else {
        localStorage.removeItem("userEmail");
      }
    }
  }, [isLoggedIn, userEmail]);

  // Mock sign-in function
  const signIn = useCallback(async (email: string) => {
    // Simulate API call for sign-in (e.g., fetching user data, token)
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    setIsLoggedIn(true);
    setUserEmail(email);
  }, []);

  // Mock sign-out function
  const signOut = useCallback(() => {
    setIsLoggedIn(false);
    setUserEmail(null);
  }, []);

  const contextValue: AuthContextType = {
    isLoggedIn,
    userEmail,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
