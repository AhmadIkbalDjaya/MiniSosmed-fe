/* eslint-disable react/prop-types */
import image from "../assets/images/image.jpg";
import ProfileAvatar from "./ProfileAvatar";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function HeaderProfile({ profile }) {
  const { auth } = useAuth();

  return (
    <>
      <header className="border-box md:mx-12 md:px-12 px-0 mt-12 pt-1">
        <div className="w-full">
          <img
            srcSet={image}
            alt=""
            className={"w-full lg:h-[365px] md:h-[265px] h-[200px]"}
          />
        </div>
        <div
          className={
            "flex gap-3 bg-white py-2 px-5 flex-col md:flex-row justify-center items-center"
          }
        >
          <ProfileAvatar width={"100px"} heigth={"100px"} />
          <div className={"grow text-center"}>
            <h1 className={"text-2xl font-bold"}>{profile?.name}</h1>
            <div className={"pt-3 flex justify-center"}>
              <Link
                to={`/followers/${profile?.username}`}
                className={"border mx-3 px-2 rounded"}
              >
                {profile?.followers} Pengikut
              </Link>
              <Link
                to={`/following/${profile?.username}`}
                className={"border mx-3 px-2 rounded"}
              >
                {profile?.follows} Diikuti
              </Link>
            </div>
          </div>
          {profile?.username == auth.username ? (
            <button
              className={
                "bg-blue-600 h-fit px-3 py-2 rounded text-white font-semibold w-full md:w-fit"
              }
            >
              Edit Image
            </button>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
}
