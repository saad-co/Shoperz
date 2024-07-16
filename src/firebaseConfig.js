// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf8GBT5QzZKH0RlmJEZSem_8o6VF3khbQ",
  authDomain: "shoperzdb.firebaseapp.com",
  projectId: "shoperzdb",
  storageBucket: "shoperzdb.appspot.com",
  messagingSenderId: "560857395467",
  appId: "1:560857395467:web:c1d7d501cf215e05a4320e",
  measurementId: "G-PZV4SK0YZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Auth

export { db, app, auth }; // Export auth as well