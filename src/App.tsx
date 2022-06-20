import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SessionsPage } from "./pages/SessionPage/SessionsPage";
import { ProfilePage } from "./pages/ProfilePage";
import React, { createContext, useEffect, useState } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Layout/Header";
import { UserWithData } from "./interfaces/User";
import { getUserData } from "./services/userService";
import { useAuth } from "./hooks/useAuth";
import { Nullable } from "./interfaces/HelperInterfaces";
import { getArrayOfSessions } from "./helpers/sessionHelper";

export const AuthContext = createContext<Nullable<UserWithData>>(null);

function App() {
  const { id } = useAuth();
  const [userData, setUserData] = useState<Nullable<UserWithData>>(null);

  useEffect(() => {
    id ? getUserData(id, setUserData) : setUserData(null);
  }, [id]);

  return (
    <AuthContext.Provider value={userData}>
      <Header />

      <div className="content">
        <Switch>
          <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
          <PrivateRoute
            exact
            path="/profile"
            component={ProfilePage}
          ></PrivateRoute>

          <Route exact path="/sessions" component={SessionsPage}></Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
