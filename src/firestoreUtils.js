import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection } from "firebase/firestore"; 
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

export const setUserOnline = async (userId, username) => {
  const userRef = doc(db, 'online_users', userId);
  await setDoc(userRef, {
    last_active: new Date().toISOString(),
    username,
  });
};

export const listenToOnlineUsers = (updateUIFunction) => {
  const onlineUsersCollection = collection(db, 'online_users');
  return onSnapshot(onlineUsersCollection, (snapshot) => {
    const onlineCount = snapshot.size;
    updateUIFunction(onlineCount);
  });
  
};
