import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { removeUser } from "../../store/slices/userSlice";
import { getUserData } from "../../services/userService";
import { UserRoles, UserWithData } from "../../interfaces/User";
import { AuthContext } from "../../App";
import { PROFILE_IMAGE } from "../../constants/images";

interface ProfileSectionProps {}

export const ProfileSection: React.FC<ProfileSectionProps> = ({}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userData = useContext(AuthContext);

  const logOut = () => {
    dispatch(removeUser());
    location.pathname = "/login";
  };

  return (
    <div className="profileSection">
      {userData ? (
        <>
          <Link className="profileLink" to="/profile">
            <img src={PROFILE_IMAGE} alt="" />
          </Link>
          <div className="authButton logout">
            <p onClick={logOut}>Log Out</p>
          </div>
          <div className="authButton name">
            <p>
              {userData?.name || " - "}
              <span>({userData?.role})</span>
            </p>
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
