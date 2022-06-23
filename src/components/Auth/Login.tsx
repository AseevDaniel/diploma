import React from "react";
import { useHistory } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { User } from "../../interfaces/User";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleLogin = (user: User) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        push("/profile");
      })
      .catch(() => alert("Invalid user!"));
  };

  return <Form handleClick={handleLogin} />;
};

export { Login };
