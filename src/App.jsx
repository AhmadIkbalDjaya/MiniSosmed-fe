/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NotFound from "./pages/handle/not_found";
import Login from "./pages/login";
import Regis from "./pages/regis";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { RequireAuth } from "./RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/regis" element={<Regis />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
