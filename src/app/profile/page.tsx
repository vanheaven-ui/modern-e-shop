"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// No need for Link or useAuth/useToast directly on this redirecting page
// import Link from 'next/link';
// import { useAuth } from '../../context/AuthContext';
// import { useToast } from '../../context/ToastContext';

const UserProfileRedirectPage: React.FC = () => {
  const router = useRouter();

  // Redirect directly to the dashboard when /profile is accessed
  useEffect(() => {
    router.replace("/profile/dashboard");
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-light-text text-xl">Redirecting to dashboard...</p>
    </div>
  );
};

export default UserProfileRedirectPage;
