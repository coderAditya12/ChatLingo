import { SignUp } from "@clerk/nextjs";
import React from "react";

const Register = () => {
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* sign up form -left side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <SignUp
            forceRedirectUrl="/syncuser"
            fallbackRedirectUrl="/"
            appearance={{
              elements: {
                card: "max-w-[100%] h-1/2 bg-base-100",
              },
            }}
          />
        </div>

        {/* right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/language.png"
                alt="Language connection illustration"
                className="w-full h-[80%]"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
