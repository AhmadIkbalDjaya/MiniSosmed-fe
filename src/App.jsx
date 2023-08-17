import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/handle/NotFound";
import Login from "./pages/Login";
import Regis from "./pages/regis";
import { RequireAuth } from "./RequireAuth";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { apiUrl, headers } from "./api/api";

export default function App() {
  const { setAuth } = useAuth();
  useEffect(() => {
    const token = new Cookies().get("Authorization");
    if (token) {
      cekToken();
    }
  });

  const cekToken = async () => {
    const response = await axios.get(`${apiUrl}authUser`, {
      headers,
    });
    setAuth(response.data.data.user);
  };
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="profile/:username" element={<Profile />}></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="regis" element={<Regis />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
    // </AuthProvider>
  );
}
