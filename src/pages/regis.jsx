/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InvalideMessage from "../components/ui/InvalideMsg";
import { apiUrl } from "../api/api";

export default function Regis() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const handleRegis = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      // console.log(response.data.responseCode);
      navigate("/login");
    } catch (error) {
      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className={"flex flex-wrap items-center justify-center min-h-screen"}>
      <div>
        <h1 className={"text-center my-3 text-3xl font-semibold"}>Minsos</h1>
        <div
          className={
            "bg-white rounded-lg shadow-md px-3 py-3 md:max-w-[400px] md:min-w-[400px]"
          }
        >
          <h1 className="text-2xl">Registasi</h1>
          <form onSubmit={handleRegis} action="">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {errors?.name &&
              errors.name.map((error, index) => (
                <InvalideMessage key={index}>{error}</InvalideMessage>
              ))}
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
              errors.email.map((error, index) => (
                <InvalideMessage key={index}>{error}</InvalideMessage>
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
              errors.password.map((error, index) => (
                <InvalideMessage key={index}>{error}</InvalideMessage>
              ))}
            <button
              type="submit"
              className={
                "bg-blue-600 py-2 my-4 rounded-lg w-full text-white font-semibold text-lg"
              }
            >
              Regis
            </button>
            <p className={"text-center text-sm text-gray-500"}>
              Sudah Punya Akun? &nbsp;
              <RouterLink to={"/login"} className={"text-blue-300"}>
                Login Sekarang!
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
