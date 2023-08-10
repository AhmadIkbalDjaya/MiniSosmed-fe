/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NotFound from "./pages/handle/not_found";
import Login from "./pages/login";
import Regis from "./pages/regis";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { RequireAuth } from "./RequireAuth";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export default function App() {
  const { setAuth } = useAuth();
  useEffect(() => {
    const token = new Cookies().get("Authorization");
    if (token) {
      cekToken(token);
    }
  }, []);

  const cekToken = async (token) => {
    const response = await axios.get(
      "https://sgso-invitation.com/api/authUser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data.user);
    setAuth(response.data.data.user);
  };
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile/:username" element={<Profile />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/regis" element={<Regis />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
    // </AuthProvider>
  );
}
