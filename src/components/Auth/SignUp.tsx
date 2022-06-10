import React from "react";
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { writeUserData } from "../../services/userService";
import { User } from "../../interfaces/User";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleRegister = (user: User) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );

        writeUserData({
          email: user.email!,
          uid: user.uid,
          role: "default",
        });

        push("/");
      })
      .catch(console.error);
  };

  return <Form handleClick={handleRegister} isRegister />;
};

export { SignUp };
