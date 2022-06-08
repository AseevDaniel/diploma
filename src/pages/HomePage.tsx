import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { removeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { email } = useAuth();

  return (
    <div>
      <Link to="/sessions">To session page</Link>
    </div>
  );
};

export default HomePage;
