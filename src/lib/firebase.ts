
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// IMPORTANT: Replace this with your own Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB47KGghohQRzELl9NPoONm-d1tU7pIzmg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "car-wash-3e724.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "car-wash-3e724",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "car-wash-3e724.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "826389837117",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:826389837117:web:51b0700a597ec356f3c154",
   measurementId: "G-TJZ3Y47KB3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check
if (typeof window !== 'undefined') {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ld-1g8qAAAAAPX4u2y8x8jZKVx4-9I6K-Kx_ZzP'),
    isTokenAutoRefreshEnabled: true
  });
}


const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
