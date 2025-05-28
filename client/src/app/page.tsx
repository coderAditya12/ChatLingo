"use client";
import userAuthStore from "@/store/userAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const user = userAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  axios.defaults.withCredentials = true; // Ensure axios uses credentials

  useEffect(() => {
    // Direct async function call
    
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/verify",{
            withCredentials:true,
          }
        );
        console.log(response.data);

        if (response.data.authenticated) {
          router.push("/dashboard");
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log("error", error);
        r
      }
    };

    verifyAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
};

export default Home;
