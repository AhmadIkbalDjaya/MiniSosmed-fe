/* eslint-disable react/prop-types */
import image from "../assets/images/image.jpg";
import ProfileAvatar from "./profile_avatar";

export default function HeaderProfile({ profile }) {
  return (
    <>
      <header className="border-box md:mx-12 md:px-12 px-0 mt-12 pt-1">
        <div className="w-full">
          <img
            src={image}
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
              <button className={"border mx-3 px-2 rounded"}>
                {profile?.followers} Pengikut
              </button>
              <button className={"border mx-3 px-2 rounded"}>{profile?.follows} Diikuti</button>
            </div>
          </div>
          <button
            className={
              "bg-blue-600 h-fit px-3 py-2 rounded text-white font-semibold w-full md:w-fit"
            }
          >
            Edit Image
          </button>
        </div>
      </header>
    </>
  );
}
