import React, { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { updateProfile } from "firebase/auth"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

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
    const user = auth.currentUser;
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
    <div className="bg-gray-800 p-4 rounded">
  <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
  
  <label htmlFor="avatarUpload" className="cursor-pointer mb-2 inline-block">
    <span className="bg-gray-600 text-white py-1 px-3 rounded">Upload New Avatar</span>
  </label>
  <input
    type="file"
    id="avatarUpload"
    className="hidden"
    onChange={handleAvatarUpload}
  />

  <input
    type="text"
    className="bg-white text-black p-2 rounded shadow-sm"
    value={newDisplayName}
    onChange={(e) => setNewDisplayName(e.target.value)}
    placeholder="New Display Name"
  />
  <button onClick={handleUpdateDisplayName} className="bg-blue-500 text-white p-2 rounded">Update Display Name</button>

  <div className="mt-4">
    <button onClick={handleUpdatePhotoURL} className="bg-green-500 text-white p-2 rounded">Confirm Avatar</button>
  </div>
</div>

  );
};

export default Dashboard;
