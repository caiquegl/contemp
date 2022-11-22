// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd1esMX39kN4HP6o-xR3AY9-4iJE7WoTg",
  authDomain: "contemp-1e58c.firebaseapp.com",
  projectId: "contemp-1e58c",
  storageBucket: "contemp-1e58c.appspot.com",
  messagingSenderId: "76953996875",
  appId: "1:76953996875:web:4475650df751f966b007ce",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Export function to initialize firebase.
export const initFirebase = () => {
  return app;
};
