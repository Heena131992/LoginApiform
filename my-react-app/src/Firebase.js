// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwYGtkaRflOFPkly99tnHqosRMVKE_RJo",
  authDomain: "loginapi-b1476.firebaseapp.com",
  databaseURL: "https://loginapi-b1476-default-rtdb.firebaseio.com",
  projectId: "loginapi-b1476",
  storageBucket: "loginapi-b1476.firebasestorage.app",
  messagingSenderId: "805959376888",
  appId: "1:805959376888:web:9eaefce544649e6605800d",
  measurementId: "G-RFVM52KMY8",
  database: "https://console.firebase.google.com/project/loginapi-b1476/database/loginapi-b1476-default-rtdb/data/~2F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Auth aur Database export karein
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;