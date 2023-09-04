/* eslint-disable no-unused-vars */
import React, { useRef, useContext, useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { AuthContext } from "../context/AuthProvider";
import InvalideMessage from "../components/ui/InvalideMsg";
import { apiUrl } from "../api/api";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const cookies = new Cookies();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  if (auth) {
    return <Navigate to="/" />;
  }
  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        `${apiUrl}login`,
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        cookies.set("Authorization", response.data.data.token);
        axios
          .get(`${apiUrl}authUser`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${response.data.data.token}`,
            },
          })
          .then((response) => {
            setAuth(response.data.data.user);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        if (error.response.data.responseCode == 422) {
          setErrors(error.response.data.errors);
        }
        if (error.response.data.responseCode == 401) {
          setErrors({});
          setMessage(error.response.data.responseMessage);
        }
      });
  };
  // useEffect(() => {
  //   auth && navigate("/");
  // });
  return (
    <div className={"flex flex-wrap items-center justify-center min-h-screen"}>
      <div>
        <h1 className={"text-center my-3 text-3xl font-semibold"}>Minsos</h1>
        <div
          className={
            "bg-white rounded-lg shadow-md px-3 py-3 md:max-w-[400px] md:min-w-[400px]"
          }
        >
          <h1 className="text-2xl">Login</h1>
          <form action="" onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors?.email &&
              errors.email.map((e, i) => (
                <InvalideMessage key={i}>{e}</InvalideMessage>
              ))}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors?.password &&
              errors.password.map((e, i) => (
                <InvalideMessage key={i}>{e}</InvalideMessage>
              ))}
            <button
              type="submit"
              // onClick={handleLogin}
              className={
                "bg-blue-600 py-2 my-4 rounded-lg w-full text-white font-semibold text-lg"
              }
            >
              Login
            </button>
            <p className={"text-center text-sm text-gray-500"}>
              Belum Registrasi? &nbsp;
              <RouterLink to={"/regis"} className={"text-blue-300"}>
                Registrasi Sekarang!
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
