import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth } from './firebase';

// Initialize Firestore
const db = getFirestore();

export const addUserToFirestore = async (uid, displayName, photoURL) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const data = {
      displayName: displayName,
      photoURL: photoURL,
      // Add any more user data here
    };

    await setDoc(userRef, data);
  }
};

// You can add more Firestore utility functions here