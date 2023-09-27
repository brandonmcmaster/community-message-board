import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";  // Import your Firestore and auth objects here

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const user = auth.currentUser;

  const getUserProfile = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username);
      setAvatarUrl(data.avatarUrl);
    } else {
      // Handle case where there is no existing profile for this user
      // This could involve setting default values or prompting the user to complete their profile
    }
  };

  const updateUserProfile = async () => {
    const docRef = doc(db, "users", user.uid);

    await setDoc(docRef, {
      username: newUsername,
      avatarUrl: newAvatarUrl
    });
    
    // Update local state to reflect changes
    setUsername(newUsername);
    setAvatarUrl(newAvatarUrl);
  };

  useEffect(() => {
    getUserProfile();
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <img src={avatarUrl} alt="User avatar" width="100" height="100" />
        <p>Username: {username}</p>
      </div>
      <div>
        <input 
          type="text" 
          placeholder="New username" 
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)} 
        />
        <button onClick={updateUserProfile}>Update Username</button>
      </div>
      <div>
        <input 
          type="text" 
          placeholder="New avatar URL" 
          value={newAvatarUrl}
          onChange={(e) => setNewAvatarUrl(e.target.value)} 
        />
        <button onClick={updateUserProfile}>Update Avatar</button>
      </div>
    </div>
  );
};

export default Dashboard;
