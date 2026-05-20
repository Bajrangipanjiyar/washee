import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB47KGghohQRzELl9NPoONm-d1tU7pIzmg",
  authDomain: "car-wash-3e724.firebaseapp.com",
  projectId: "car-wash-3e724",
  storageBucket: "car-wash-3e724.firebasestorage.app",
  messagingSenderId: "826389837117",
  appId: "1:826389837117:web:51b0700a597ec356f3c154",
  // measurementId: "G-TJZ3Y47KB3" // Iski abhi zarurat nahi hai
};

// Ensures Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);