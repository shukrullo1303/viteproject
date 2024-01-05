import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getApp, getApps } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBtcVpYavJm5xF0hShlnPKyMLR3qDH1_rU",
  authDomain: "vite-project-4800b.firebaseapp.com",
  projectId: "vite-project-4800b",
  storageBucket: "vite-project-4800b.appspot.com",
  messagingSenderId: "683412260340",
  appId: "1:683412260340:web:70c50dea79ba8c36eca5a1",
  measurementId: "G-YHJ9B6NNT2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app 
export {db, auth} 