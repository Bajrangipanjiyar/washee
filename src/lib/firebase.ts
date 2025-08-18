
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, type User } from "firebase/auth";

// IMPORTANT: This Firebase config object is now set up with your project details.
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
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

const createUserInFirestore = async (user: User) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        lastLogin: new Date()
    };
    // Use setDoc with merge: true to create or update the document
    await setDoc(userRef, userData, { merge: true });
}


export { app, db, auth, createUserInFirestore };
