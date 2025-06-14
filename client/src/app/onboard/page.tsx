"use client";
import { LANGUAGES } from "@/constants";
import userAuthStore from "@/store/userAuth";
import axios from "axios";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
interface OnboardProps {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  profilePicture: string;
}
const onboard = () => {
  const onboard = userAuthStore((state) => state.onboard);
  const setOnboard = userAuthStore((state) => state.setOnboard);
  const user = userAuthStore((state) => state.user);
  const [onboardData, setOnboardData] = useState<OnboardProps>({
    fullName: user?.fullName || "",
    bio: onboard?.bio || "",
    nativeLanguage: onboard?.nativeLanguage || "",
    learningLanguage: onboard?.learningLanguage || "",
    location: onboard?.location || "",
    profilePicture: onboard?.profilePicture || "",
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/onboard/${user?.id}`,
        onboardData,
        {
          withCredentials: true,
        }
      );
      const data = response.data?.updatedOnboard || response.data?.newOnboard;
      console.log("Onboard response:", data);
      setIsPending(false);
      
      setOnboard(data);
    } catch (error: any) {
      console.error("Onboard error:", error);
      toast.error(error.response?.data?.message || "something went wrong");
      setIsPending(false);
    }
  };
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setOnboardData({
      ...onboardData,
      profilePicture: randomAvatar,
    });
    toast.success("Random avatar generated successfully!");
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 ">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8 ">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {onboardData.profilePicture ? (
                  <img
                    src={onboardData.profilePicture}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={onboardData.fullName}
                onChange={(e) =>
                  setOnboardData({ ...onboardData, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={onboardData.bio}
                onChange={(e) =>
                  setOnboardData({ ...onboardData, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Tell others about yourself and your language learning goals "
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={onboardData.nativeLanguage}
                  onChange={(e) =>
                    setOnboardData({
                      ...onboardData,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={onboardData.learningLanguage}
                  onChange={(e) =>
                    setOnboardData({
                      ...onboardData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={onboardData.location}
                  onChange={(e) =>
                    setOnboardData({ ...onboardData, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default onboard;
