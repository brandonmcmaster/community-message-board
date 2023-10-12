import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { auth } from './firebase';

// Initialize Firestore
const db = getFirestore();

export const addUserToFirestore = async (uid, displayName, photoURL) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const data = {
      displayName,
      photoURL,
      role: 'user',
      isPremium: false,
    };
    await setDoc(userRef, data);
  }
};

export const createThread = async (title, description, section, isPrivate = false) => {
  const threadRef = doc(collection(db, 'threads'));
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const threadData = {
    title,
    description,
    section,
    createdBy: userId,
    isPrivate,
  };
  await setDoc(threadRef, threadData);
};

export const addSection = async (name, description, isPrivate = false) => {
  const sectionRef = collection(db, 'sections');
  const newSection = {
    name,
    description,
    isPrivate,
    createdAt: new Date().toISOString(),
  };
  await addDoc(sectionRef, newSection);
};

export const createPost = async (threadId, content) => {
  const postRef = doc(collection(db, 'posts'));
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const postData = {
    threadId,
    content,
    postedBy: userId,
  };
  await setDoc(postRef, postData);
};

export const createNewThread = async (title, description, sectionId, userId) => {
  const threadRef = collection(db, 'threads');
  const newThread = {
    title,
    description,
    sectionId,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPremium: false,
  };
  await addDoc(threadRef, newThread);
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

// Function to fetch sections from Firestore
export const fetchSections = async () => {
  const sectionsRef = collection(db, 'sections');
  const q = query(sectionsRef);
  const querySnapshot = await getDocs(q);
  const sections = [];

  querySnapshot.forEach((doc) => {
    sections.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return sections;
};

// Function to fetch the role of the current user
export const fetchCurrentUserRole = async () => {
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  if (!userId) {
    return null;
  }

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().role;
  }

  return null;
};

// Function to fetch threads based on the sectionId from Firestore
export const fetchThreads = async (sectionId, setThreads) => {
  const threadsRef = collection(db, 'threads');
  const q = query(threadsRef, where('sectionId', '==', sectionId));
  const querySnapshot = await getDocs(q);
  const threads = [];

  querySnapshot.forEach((doc) => {
    threads.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  setThreads(threads);
};

export const fetchThreadsBySection = async (sectionId) => {
  const threadsRef = collection(db, 'threads');
  const q = query(threadsRef, where('sectionId', '==', sectionId));
  const querySnapshot = await getDocs(q);
  const threads = [];

  querySnapshot.forEach((doc) => {
    threads.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return threads;
};

// Function to fetch section details by sectionId from Firestore
export const fetchSectionById = async (sectionId) => {
  const sectionRef = doc(db, 'sections', sectionId);
  const sectionSnap = await getDoc(sectionRef);

  if (sectionSnap.exists()) {
    return {
      id: sectionSnap.id,
      ...sectionSnap.data(),
    };
  } else {
    console.error(`Section with id ${sectionId} not found`);
    return null;
  }
};
