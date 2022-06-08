import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SessionsPage } from "./pages/SessionsPage";
import { ProfilePage } from "./pages/ProfilePage";
import React from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Layout/Header";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
