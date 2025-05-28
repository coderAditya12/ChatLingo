"use client";
import userAuthStore from "@/store/userAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const user = userAuthStore((state) => state.isAuthenticated);
  const router = useRouter(); // Ensure axios uses credentials


  return (
    <div className="flex items-center justify-center h-screen">
      <h1>welcome to chatlingo</h1>
    </div>
  );
};

export default Home;
