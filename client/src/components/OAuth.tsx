// import { Button } from "flowbite-react";
import React from "react";
// import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/utilis/Firebase";
import { AArrowUp } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import axios from "axios";

const OAuth = () => {
  const [user, setUser] = React.useState<object | null>(null);
  const[loading,setLoading] = React.useState<boolean>(false);
  const [error,setError] = React.useState<string | null>(null);
  let userObject = null;
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      userObject = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      }
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/auth/googleauth",
        userObject
      );
      if (response.status === 201) {
        setUser(response.data.user);
      }
      setLoading(false);
    } catch (error:any) {
      console.log("error", error);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-outline btn-primary w-full rounded-3xl"
      onClick={handleGoogleClick}
    >
      {loading ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        <>
          <AiFillGoogleCircle className="w-6 h-6 mr-2" />
          continue with Google
        </>
      )}
    </button>
  );
};

export default OAuth;
