import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { addUserToFirestore } from "../firestoreUtils"; // Make sure the path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in:", user);
      await addUserToFirestore(user, user.photoURL); // Pass the photoURL from Google
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      await addUserToFirestore(user, "url_of_your_generic_avatar"); // Pass the URL for a generic avatar
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <button
        onClick={handleGoogleLogin}
        className="bg-red-600 text-white p-2 rounded mb-4 w-1/4"
      >
        Login with Google
      </button>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-gray-500 text-white p-2 rounded mb-4 w-1/4"
      >
        Login with Email
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded shadow-lg w-96">
            <button
              onClick={() => setShowPopup(false)}
              className="text-red-500 hover:text-red-700"
            >
              Close
            </button>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full mt-4 bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mt-4 bg-gray-800 text-white"
            />
            <button
              onClick={handleEmailLogin}
              className="bg-red-600 text-white p-2 rounded w-full mt-4"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
