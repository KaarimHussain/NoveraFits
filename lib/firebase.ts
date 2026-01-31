import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0piVfT5d__0Uxelv3W8esqZd2k7iTOh4",
  authDomain: "novera-fits.firebaseapp.com",
  projectId: "novera-fits",
  storageBucket: "novera-fits.firebasestorage.app",
  messagingSenderId: "540880173591",
  appId: "1:540880173591:web:030335e567880426413a52",
  measurementId: "G-EG8P8FFC2K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
