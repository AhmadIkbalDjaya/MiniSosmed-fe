/* eslint-disable react/prop-types */
import { followUser } from "../services/user.service";
import ProfileAvatar from "./ProfileAvatar";

export default function UserTile({ user, fetchData }) {
  const follow = async () => {
    const response = await followUser(user.username);
    if (response.status == 200) {
      fetchData();
    }
  };
  return (
    <div className={"bg-white px-8 py-3 my-5 rounded-md radius shadow"}>
      <div className={"flex gap-5 items-center"}>
        <ProfileAvatar width={"70px"} />
        <div>
          <p className={"font-semibold text-xl"}>{user.name}</p>
          <p className={"text-sm font-semibold text-gray-600"}>
            {user.followers} Pengikut
          </p>
        </div>
      </div>
      <button
        onClick={follow}
        className={
          "w-full py-1 mt-3 rounded bg-blue-600 text-white font-semibold"
        }
      >
        {user.has_follow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
