import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NotFound from "./pages/handle/not_found";
import Login from "./pages/login";
import Regis from "./pages/regis";
import React, { useEffect, useState } from "react";

export const Auth = React.createContext();

export default function App() {
  const [auth, setAuth] = useState({});

  useEffect(function(){
    console.log(auth);
  }, [auth]);
  return (
    <Auth.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/regis" element={<Regis />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </Auth.Provider>
  );
}
