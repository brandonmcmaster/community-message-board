import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  
  const handleCreateAccount = () => {
    if (password === confirmPassword) {
      // Create the account logic
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Navigate to home page after account creation
          navigate('/');
        })
        .catch((error) => {
          console.log("Account creation failed:", error);
        });
    } else {
      console.log("Passwords do not match.");
    }
  };

  return (
    <div className="text-center mt-12 bg-black text-white">
      <h1 className="text-2xl mb-4">Create Account</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="block mx-auto mb-4 p-2 w-64 bg-gray-800 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="block mx-auto mb-4 p-2 w-64 bg-gray-800 rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="block mx-auto mb-4 p-2 w-64 bg-gray-800 rounded"
      />
      {password !== confirmPassword && (
        <p className="text-red-600">Passwords do not match</p>
      )}
      <button
        onClick={handleCreateAccount}
        className="bg-red-600 p-2 rounded text-white"
      >
        Create Account
      </button>
    </div>
  );
};

export default CreateAccount;
