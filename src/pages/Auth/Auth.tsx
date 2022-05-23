import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Login } from "./Login";
import { Email, Password } from "@/interfaces/User";
import { auth } from "@/firebase";

export const Auth: React.FC = () => {
  const login = async (email: Email, password: Password) => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  };

  return (
    <div>
      Auth
      <Login onLogin={login} />
    </div>
  );
};
