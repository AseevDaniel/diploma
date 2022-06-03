import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import {SessionsPage} from "./pages/SessionsPage";
import {ProfilePage} from "./pages/ProfilePage";
import React from "react";
import {PrivateRoute} from "./components/PrivateRoute";


function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
      <PrivateRoute exact path="/sessions" component={SessionsPage}></PrivateRoute>
        <PrivateRoute exact path="/profile" component={ProfilePage}></PrivateRoute>

      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  );
}

export default App;
