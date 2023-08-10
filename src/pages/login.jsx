/* eslint-disable no-unused-vars */
import React, { useRef, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Auth } from "../App";

export default function Login() {
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const cookies = new Cookies();
  const {auth, setAuth} = useContext(Auth);

  const handleLogin = () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    // console.log(email);
    // axios
    //   .get("http://127.0.0.1:8000/sanctum/scrf-cookie")
    //   .then((response) => {
    //     console.log(response);
    //   });

    axios
      .post("https://sgso-invitation.com/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        cookies.set("Authorization", response.data.data.token);
        axios
          .get("https://sgso-invitation.com/api/authUser", {
            headers: {
              Authorization: `Bearer ${response.data.data.token}`,
            },
          })
          .then((response) => {
            setAuth(response.data.data.user)
          });
      });
  };
  return (
    <div className={"flex flex-wrap items-center justify-center min-h-screen"}>
      <div>
        <h1 className={"text-center my-3 text-3xl font-semibold"}>Minsos</h1>
        <div
          className={"bg-white rounded-lg shadow-md px-3 py-3 md:max-w-[400px]"}
        >
          <h1 className="text-2xl">Login</h1>
          <form action="">
            <input
              type="text"
              name="email"
              ref={inputEmail}
              id="email"
              placeholder="Email"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
            />
            <input
              type="password"
              name="password"
              ref={inputPassword}
              id="password"
              placeholder="Password"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
            />
            <button
              type="button"
              onClick={handleLogin}
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
