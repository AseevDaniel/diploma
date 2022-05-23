import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcpILf8IsZulNlj_G4KDFLep-9uL4xkic",
  authDomain: "diploma-f24eb.firebaseapp.com",
  projectId: "diploma-f24eb",
  storageBucket: "diploma-f24eb.appspot.com",
  messagingSenderId: "832527666399",
  appId: "1:832527666399:web:eddf73646c9320cd9a2d6a",
  //email - project-832527666399
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
