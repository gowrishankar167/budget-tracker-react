import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWNLAJsbRKIPsVoQ19qby7fHuCaRg6iYQ",
  authDomain: "budget-tracker-c591b.firebaseapp.com",
  projectId: "budget-tracker-c591b",
  storageBucket: "budget-tracker-c591b.firebasestorage.app",
  messagingSenderId: "415929693331",
  appId: "1:415929693331:web:e36492b177a9977bbc8966"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;