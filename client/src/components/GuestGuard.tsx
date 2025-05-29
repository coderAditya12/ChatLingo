"use client";
import userAuthStore from "@/store/userAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = userAuthStore((state) => state.user);
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${rootUrl}/auth/verify`, {
          withCredentials: true,
        });
        setIsLoading(false);
        router.push("/dashboard");
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, rootUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return <>{children}</>;
};

export default GuestGuard;
