/* eslint-disable no-unused-vars */
import { Link as RouterLink } from "react-router-dom";
import {
  IconHome2,
  IconLogout,
  IconMenu2,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Cookies from "universal-cookie";
import axios from "axios";
import { apiUrl, headers } from "../api/api";

export default function Navbar() {
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const cookies = new Cookies();

  const handleLogout = () => {
    const response = axios.get(`${apiUrl}logout`, {
      headers,
    });
    if (response.response == 200) {
      setAuth(null);
      cookies.remove("Authorization");
    }
  };
  return (
    <>
      <div className={"shadow w-full fixed top-0 left-0 z-[1]"}>
        <header
          className={
            "px-0 md:px-3 py-0 md:py-3 md:flex md:items-baseline md:gap-x-3 bg-blue-600"
          }
        >
          <div
            className={
              "flex justify-between items-center py-3 md:py-0 px-3 md:px-0"
            }
          >
            <RouterLink to={"/"} className={"text-white text-xl"}>
              Minsos
            </RouterLink>
            {open ? (
              <IconX
                onClick={() => setOpen(!open)}
                className="md:hidden text-white cursor-pointer"
              />
            ) : (
              <IconMenu2
                onClick={() => setOpen(!open)}
                className="md:hidden text-white cursor-pointer"
              />
            )}
          </div>
          <div
            className={`grow py-1 px-3 md:px-0 md:py-0 md:flex md:justify-between md:items-baseline absolute md:static bg-blue-600 w-full md:z-auto z-[-1] transition-all duration-500 ease-in ${
              open
                ? "top-15 opacity-100"
                : "top-[-400px] opacity-0 md:opacity-100"
            }`}
          >
            <div className={"flex justify-between"}>
              <input
                type="text"
                name="search"
                id=""
                placeholder="Search User"
                className={
                  "px-2 py-1 border-0 outline-0 rounded me-2 grow w-100"
                }
              />
              <button
                type="submit"
                className={"border rounded px-3 py-1 text-white"}
              >
                Search
              </button>
            </div>
            <ul className={"md:flex gap-3 "}>
              <li className={"my-3 md:my-0"}>
                <RouterLink
                  to={"/"}
                  className={"flex gap-x-1 font-semibold text-base text-white"}
                >
                  Home
                  <IconHome2 />
                </RouterLink>
              </li>
              <li className={"my-3 md:my-0"}>
                <RouterLink
                  to={`/profile/${auth?.username}`}
                  className={
                    "flex gap-x-1 font-semibold text-base text-gray-400 hover:text-white duration-500"
                  }
                >
                  Profile
                  <IconUser />
                </RouterLink>
              </li>
              <li className={"my-3 md:my-0"}>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className={
                    "flex gap-x-1 font-semibold text-base text-gray-400 hover:text-white duration-500"
                  }
                >
                  Logout
                  <IconLogout />
                </button>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
}
