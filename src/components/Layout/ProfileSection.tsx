import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { removeUser } from "../../store/slices/userSlice";

interface ProfileSectionProps {}

export const ProfileSection: React.FC<ProfileSectionProps> = ({}) => {
  const dispatch = useAppDispatch();

  const { email, isAuth } = useAuth();

  return (
    <div className="profileSection">
      {isAuth ? (
        <>
          <Link className="profileLink" to="/profile">
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/12-peoples-avatars/user-profile.png"
              alt=""
            />
          </Link>
          <div className="authButton logout">
            <p onClick={() => dispatch(removeUser())}>Log Out</p>
          </div>
        </>
      ) : (
        <Link className="authButton" to="/login">
          Sign In
        </Link>
      )}
    </div>
  );
};
