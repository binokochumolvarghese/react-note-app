// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FB_API_KEY,
  authDomain: "react-note-app-4a475.firebaseapp.com",
  projectId: "react-note-app-4a475",
  storageBucket: "react-note-app-4a475.appspot.com",
  messagingSenderId: "373650162725",
  appId: "1:373650162725:web:82e3019a396630f756ebcc"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}