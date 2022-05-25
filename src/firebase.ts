import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBcpILf8IsZulNlj_G4KDFLep-9uL4xkic",
  authDomain: "diploma-f24eb.firebaseapp.com",
  projectId: "diploma-f24eb",
  storageBucket: "diploma-f24eb.appspot.com",
  messagingSenderId: "832527666399",
  appId: "1:832527666399:web:eddf73646c9320cd9a2d6a",
};

export const app = initializeApp(firebaseConfig);

