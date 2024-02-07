import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASqdsKIIDjuXLmGVYiDEOYQaNxE_im1wk",
  authDomain: "web-exam-6c390.firebaseapp.com",
  databaseURL: "https://web-exam-6c390-default-rtdb.firebaseio.com",
  projectId: "web-exam-6c390",
  storageBucket: "web-exam-6c390.appspot.com",
  messagingSenderId: "302504114962",
  appId: "1:302504114962:web:6f8848cd8ae8550b7311cb",
  measurementId: "G-6RSLB9LJNP",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
