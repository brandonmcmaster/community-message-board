import React, { useEffect, useState } from 'react';
import { db } from './firebase';  // Adjust the import to match your file structure
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const UserLink = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      }
    };

    console.log("Attempting to fetch user with ID:", userId);  // Log userId
    
    if (userId) {  // Check if userId is defined
      fetchUser();
    }
  }, [userId]);

  return user ? (
    <Link to={`/user/${userId}`}>
      <img src={user.photoURL} alt={`${user.username}'s avatar`} />
      <span>{user.displayName}</span>
    </Link>
  ) : null;
};

export default UserLink;
