"use client";
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import React from "react";
const Home = () => {
  const { isLoaded, user } = useUser();
  console.log("user", useUser());

  const handleLog = () => {
    console.log("log out");
  };
  return (
    <div>
      <button className="cursor-pointer" onClick={handleLog}>
        <SignOutButton />
      </button>
    </div>
  );
};

export default Home;
