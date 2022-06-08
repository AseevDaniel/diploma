import React from "react";
import "./header.scss";
import { Menu } from "./Menu";
import { ProfileSection } from "./ProfileSection";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="header">
      <div className="title">Aseev</div>
      <Menu />
      <ProfileSection />
    </div>
  );
};
