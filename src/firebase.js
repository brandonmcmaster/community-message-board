// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth"; // Importing auth library
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // <-- Add this line for Storage


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBou4vRSSy8ux53vc17tLgO2IHwEzTBafc",
    authDomain: "community-message-board.firebaseapp.com",
    projectId: "community-message-board",
    storageBucket: "community-message-board.appspot.com",
    messagingSenderId: "136727632828",
    appId: "1:136727632828:web:3cde8589ba05d4600be9b9",
    measurementId: "G-8RWE12EVZB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

const db = getFirestore();

const storage = getStorage(app);



export { auth, createUserWithEmailAndPassword, googleProvider, db, onAuthStateChanged, updateProfile, storage  };// Export it so you can use it in other components

