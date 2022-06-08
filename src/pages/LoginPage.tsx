import { Login } from "components/Auth/Login";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <Login />
      <p>
        Or <Link to="/register">register</Link>
      </p>
    </div>
  );
};
