import { Link as RouterLink } from "react-router-dom";

export default function Login() {
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
              name="username"
              id=""
              placeholder="Email"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              className={
                "w-full border border-gray-400 rounded-full px-3 py-2 mt-5 focus:outline-blue-300"
              }
            />
            <button
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
