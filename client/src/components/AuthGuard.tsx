"use client";
import userAuthStore from "@/store/userAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = userAuthStore((state) => state.user);
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
  const checkAuth = userAuthStore((state) => state.checkAuth);


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const verifyAuth = async () => {
      const valid = await checkAuth();
      console.log("AuthGuard: User is authenticated:", valid);
      if(valid){
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
        if (!valid) {
          router.push("/");
        }
      }

      // Schedule next check in 14 minutes
      timeoutId = setTimeout(verifyAuth, 14 * 60 * 1000);
    };

    // Initial call
    verifyAuth();

    // Cleanup clears any pending timeout
    return () => timeoutId && clearTimeout(timeoutId);
  }, [checkAuth]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthGuard;

