"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const SyncPage = () => {
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const syncUserData = async () => {
      if(!isLoaded || !user){
        return;
      }
      try {
        const token = await getToken();
        const userData = {
          clerkId:user.id,
          email:user.emailAddresses[0].emailAddress,
          firstName:user.firstName,
          lastName:user.lastName,
          imageUrl:user.imageUrl
        }
        
      } catch (error) {
        
      }
    };
  });

  return <div>page</div>;
};

export default SyncPage;
