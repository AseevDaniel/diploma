import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const location = useLocation();
  const { isAuth } = useAuth();

  const routes = [
    {
      route: "/",
      title: "Home",
      isSensitive: true,
    },
    {
      route: "/sessions",
      title: "Sessions",
      isSensitive: false,
    },
    {
      route: "/profile",
      title: "Profile",
      isSensitive: true,
    },
  ];

  const filteredRoutes = routes.filter(
    ({ isSensitive }) => !isSensitive || isAuth
  );

  const getSliderBarClasses = () => {
    const path = location.pathname;
    if (path === "/" || (path === "/sessions" && !isAuth)) return "first";
    if (path === "/sessions") return "second";
    if (path === "/profile") return "third";
    return "none";
  };

  console.log(location.pathname);

  return (
    <div className="menu">
      {filteredRoutes.map(({ route, title }, index, array) => {
        return (
          <React.Fragment key={index}>
            <Link
              className={`link ${location.pathname === route ? "active" : ""}`}
              to={route}
            >
              {title}
            </Link>
            {index !== array.length - 1 && <div className="separator"></div>}
          </React.Fragment>
        );
      })}
      <div className={`slider-bar ${getSliderBarClasses()}`}></div>
    </div>
  );
};
