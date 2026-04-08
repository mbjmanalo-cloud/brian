import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz5iW5ll9wHPR11AHVIiivwZ_aq2CEGBE",
  authDomain: "note-app-e5388.firebaseapp.com",
  projectId: "note-app-e5388",
  storageBucket: "note-app-e5388.firebasestorage.app",
  messagingSenderId: "850826817201",
  appId: "1:850826817201:web:cc235080b718737b2bfc90",
  measurementId: "G-QRMZ8L998Q"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };      