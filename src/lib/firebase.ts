
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, type User } from "firebase/auth";

// IMPORTANT: This Firebase config object is now set up with your project details.
const firebaseConfig = {
  apiKey: "AIzaSyB47KGghohQRzELl9NPoONm-d1tU7pIzmg",
  authDomain: "car-wash-3e724.firebaseapp.com",
  projectId: "car-wash-3e724",
  storageBucket: "car-wash-3e724.appspot.com",
  messagingSenderId: "826389837117",
  appId: "1:826389837117:web:51b0700a597ec356f3c154",
  measurementId: "G-TJZ3Y47KB3"
};

// Initialize Firebase
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

const createUserInFirestore = async (user: User) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    // Only create a new document if one doesn't already exist
    if (!docSnap.exists()) {
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            createdAt: new Date(),
        };
        // Use setDoc to create the document
        await setDoc(userRef, userData);
    } else {
         // Optionally, update last login time if user already exists
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
    }
}


export { app, db, auth, createUserInFirestore };
