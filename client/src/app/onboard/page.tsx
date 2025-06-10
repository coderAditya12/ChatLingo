"use client";
import userAuthStore from "@/store/userAuth";
import React, { useState } from "react";
interface OnboardProps {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  profilePicture: string;
}
const onboard = async () => {
  const onboard = userAuthStore((state) => state.onboard);
  const [onboardData, setOnboardData] = useState<OnboardProps | null>(null);
  console.log("onboard user", onboard);
  return <div>onboard</div>;
};

export default onboard;
