import userAuthStore from "@/store/userAuth";
import { useEffect } from "react";


export const useTokenManager = () => {
  const { checkAuth } = userAuthStore(); 
  useEffect(() => {
    checkAuth(); 
    const timeout = setTimeout(() => {
      checkAuth();
    }, 2 * 60 * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [checkAuth]); 
};
