import { useState } from "react";
import {
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import InvalideMessage from "../components/ui/InvalideMsg";
import { apiUrl } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  if (auth.status) {
    return <Navigate to="/" replace />;
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
        const { token, user_id, username, name, email, profil_image } =
          response.data.data;

        dispatch(
          setAuth({
            token,
            user_id,
            username,
            name,
            email,
            profil_image,
          })
        );
        navigate("/", { replace: true });
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
              errors.email.map((e) => (
                <InvalideMessage key={e}>{e}</InvalideMessage>
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
              errors.password.map((e) => (
                <InvalideMessage key={e}>{e}</InvalideMessage>
              ))}
            <button
              type="submit"
              className={
                "bg-blue-600 py-2 my-4 rounded-lg w-full text-white font-semibold text-lg"
              }
            >
              Login
            </button>
            <p className={"text-center text-sm text-gray-500"}>
              Belum Registrasi? &nbsp;
              <Link to={"/regis"} className={"text-blue-300"}>
                Registrasi Sekarang!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
