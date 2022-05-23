import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { Login } from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      <img src={logo} className="App-logo" alt="logo" />
      {/*</header>*/}

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={Login} />
          <Route path="/register" element={Register} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
