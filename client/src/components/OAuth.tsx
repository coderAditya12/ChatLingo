// import { Button } from "flowbite-react";
import React from "react";
// import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/utilis/Firebase";
import { AArrowUp } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("result", result.user.displayName);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <button
      className="btn btn-outline btn-primary w-full rounded-3xl"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      continue with Google
    </button>
  );
};

export default OAuth;
