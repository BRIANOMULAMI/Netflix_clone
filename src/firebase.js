import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore
} from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD5hDH2wPcUz5FWUw8Y-NhrzvNSfSSHLpI",
  authDomain: "netflix-clone-1491a.firebaseapp.com",
  projectId: "netflix-clone-1491a",
  storageBucket: "netflix-clone-1491a.firebasestorage.app",
  messagingSenderId: "1087317730317",
  appId: "1:1087317730317:web:be0bcbe4f90b8d8220e144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;  // Corrected variable name

    console.log("User created:", user.uid);

    // Corrected Firestore document addition
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User data added to Firestore");

  } catch (error) {
    console.error("Error signing up:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully");
  } catch (error) {
    console.error("Login error:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

export { auth, db, login, signup, logout };
