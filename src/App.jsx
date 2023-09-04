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
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Search from "./pages/Search";

export default function App() {
  const { setAuth } = useAuth();
  const cookies = new Cookies();
  useEffect(() => {
    const token = cookies.get("Authorization");
    if (token) {
      axios
        .get(`${apiUrl}authUser`, { headers })
        .then((response) => {
          setAuth(response.data.data.user);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          cookies.remove("Authorization");
          setAuth(null);
        });
    }
  }, []);
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="profile/:username" element={<Profile />}></Route>
          <Route path="followers/:username" element={<Followers />} />
          <Route path="following/:username" element={<Following />} />
          <Route path="search/:search" element={<Search />}></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="regis" element={<Regis />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
    // </AuthProvider>
  );
}
