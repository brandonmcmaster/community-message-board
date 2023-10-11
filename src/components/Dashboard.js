import React, { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { updateProfile } from "firebase/auth"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const user = auth.currentUser;
  

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName);
        setPhotoURL(userDoc.data().photoURL);
      }
    };
    fetchUserData();
  }, [user.uid]);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
    const storageRef = ref(storage, `avatars/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log("Error uploading file:", error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          setNewPhotoURL(downloadURL);
  
          // Update user auth profile
          try {
            await user.updateProfile({
              photoURL: downloadURL,
            });
  
            // Update Firestore
            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, {
              photoURL: downloadURL,
            });
  
            // Update state to refresh the UI
            setPhotoURL(downloadURL);
          } catch (error) {
            console.error("Error updating photo URL:", error);
          }
        });
      }
    );
  };
  

  const handleUpdateDisplayName = async () => {
    const user = auth.currentUser;
    console.log("Current user object:", user);
    if (user) {
      try {
        await updateProfile(user,{
          displayName: newDisplayName,
        });
        // Update Firestore
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          displayName: newDisplayName,
        });
        // Fetch the new profile to update UI
        const updatedUser = auth.currentUser;
        setNewDisplayName(updatedUser.displayName);
      } catch (error) {
        console.error("Error updating display name:", error);
      }
    } else {
      console.log("No user is signed in to update.");
    }
  };

  const handleUpdatePhotoURL = async () => {
    if (!newPhotoURL) {
      alert("Please upload an avatar before confirming.");
      return;
    }
  
    const user = auth.currentUser;
    console.log("Current user object:", user);
    if (user) {
      try {
        await updateProfile(user, {
          photoURL: newPhotoURL,
        });
        // Update Firestore
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          photoURL: newPhotoURL,
        });
        // Fetch the new profile to update UI
        const updatedUser = auth.currentUser;
        setPhotoURL(updatedUser.photoURL);
      } catch (error) {
        console.error("Error updating photo URL:", error);
      }
    } else {
      console.log("No user is signed in to update.");
    }
  };

  return (
    <div className="bg-black text-white p-6">
      <div className="flex flex-col items-center">
        <img 
          src={photoURL || 'default-avatar.jpg'} 
          alt="User Avatar" 
          className="rounded-full w-32 h-32 object-cover mb-4" 
        />
        <h2 className="text-2xl font-semibold mb-4">{displayName || 'Anonymous User'}</h2>
      </div>
      <div className="border border-gray-700 p-6 rounded">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
        
        {/* Update Display Name */}
        <div className="mb-4">
          <label className="block mb-2">New Display Name</label>
          <input 
            type="text" 
            className="bg-gray-800 text-white p-2 rounded w-full"
            value={newDisplayName} 
            onChange={(e) => setNewDisplayName(e.target.value)} 
          />
          <button 
            className="mt-2 bg-gray-700 text-white p-2 rounded w-full" 
            onClick={handleUpdateDisplayName}
          >
            Update Display Name
          </button>
        </div>

        {/* Update Avatar */}
        <div className="mb-4">
          <label className="block mb-2">New Avatar</label>
          <input 
            type="file" 
            className="bg-gray-800 text-white p-2 rounded w-full"
            onChange={handleAvatarUpload} 
          />
          <button 
            className="mt-2 bg-gray-700 text-white p-2 rounded w-full" 
            onClick={handleUpdatePhotoURL}
          >
            Confirm Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;