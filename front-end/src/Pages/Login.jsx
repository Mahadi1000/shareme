/* eslint-disable no-unused-vars */

import { FaGoogle } from "react-icons/fa";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Firebase/AuthProvider";
import { client } from "../Client";
const Login = () => {
  const {  signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signInWithGoogle().then((result) => {
      toast.success("Successfully Logged In!");
      const { displayName, uid, photoURL, email } = result.user;

      // Send data to Sanity
      const doc = {
        _id: uid,
        _type: "user",
        userName: displayName,
        image: photoURL,
        email: email,
      };
 localStorage.setItem("user", JSON.stringify(doc));
      // Update the user data in Firebase (if needed)
      // You can skip this step if Firebase is only used for authentication
      // Update this part based on your Firebase database structure
      // firebase.database().ref(`users/${uid}`).set({
      //   userName: displayName,
      //   image: photoURL,
      //   email: email,
      // });

      // Create or update the document in Sanity
      client.createIfNotExists(doc).then(() => {
        navigate("/");
      });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-70">
          <div className="p-5">
            <img src={logo} width="130px" alt="Logo" />
          </div>

          <div className="shadow-2xl">
            <button
              onClick={handleSignInWithGoogle}
              className="flex items-center"
            >
              <FaGoogle className="mr-4" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
