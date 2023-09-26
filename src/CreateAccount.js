import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User account created:", user);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="text-center mt-12 bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
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
        onClick={handleCreateAccount} 
        className="bg-blue-600 text-white p-2 rounded w-full mt-4"
      >
        Create Account
      </button>
    </div>
  );
};

export default CreateAccount;
