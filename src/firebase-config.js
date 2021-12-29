import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfHUbVW8mxLbcVkMl_eMcfAccFNsAV-j4",
  authDomain: "slidecontroller-43511.firebaseapp.com",
  projectId: "slidecontroller-43511",
  storageBucket: "slidecontroller-43511.appspot.com",
  messagingSenderId: "344633352168",
  appId: "1:344633352168:web:1e83090e57441e17098e5d",
  measurementId: "G-PR59J14DLG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
