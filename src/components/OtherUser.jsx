import { Link } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import { followUser } from "../services/user.service";

export default function OtherUser(props) {
  const { name, username, has_follow, profile_image } = props.user;

  const follow = async () => {
    const response = await followUser(username);
    if (response.status == 200) {
      props.getData();
    }
  };

  return (
    <div className={"flex justify-between align-baseline my-5"}>
      <ProfileAvatar to={`profile/${username}`} />
      <Link to={`profile/${username}`} className={"grow px-3 font-semibold"}>
        {name}
      </Link>
      <button
        onClick={() => follow()}
        className={"font-semibold text-white bg-blue-600 px-3 rounded"}
      >
        {has_follow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

const Loading = () => {
  return (
    <div className={"flex justify-between my-5 animate-pulse"}>
      <div className="rounded-full h-9 w-9 bg-slate-200 shadow-inner" />
      <div className={"grow px-3 mx-2 h-4 rounded mt-1 bg-slate-200 shadow-inner"}></div>
      <div className={"bg-slate-200 shadow-inner h-8 rounded w-20"}></div>
    </div>
  );
};

OtherUser.Loading = Loading;
