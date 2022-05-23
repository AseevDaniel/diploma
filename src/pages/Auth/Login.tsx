import React, { useState } from "react";
import { Email, Password } from "@/interfaces/User";
import { checkIsCredsValid } from "@/pages/Auth/helpers/credsHelper";
import { MIN_PASSWORD_LENGTH } from "@/constants/credentials";

interface LoginProps {
  onLogin: (email: Email, password: Password) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = () => {
    if (checkIsCredsValid(email, password, MIN_PASSWORD_LENGTH))
      onLogin(email!, password!);
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Log in</button>
    </div>
  );
};
