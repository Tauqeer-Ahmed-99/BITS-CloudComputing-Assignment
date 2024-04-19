// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU40QYI_SP0ll8Dz6vlo4DX2EG4Myjv7k",
  authDomain: "test-firestore-34d9c.firebaseapp.com",
  projectId: "test-firestore-34d9c",
  storageBucket: "test-firestore-34d9c.appspot.com",
  messagingSenderId: "8013402146",
  appId: "1:8013402146:web:99749deeba4a783a4d7a7b",
  measurementId: "G-QBBTW992PD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
