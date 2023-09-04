/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function UserBox({user}) {
  return (
    <div className={"w-[100px]"}>
      <Link to={`/profile/${user.username}`}>
        <img
          src={user.profile_image}
          alt=""
          srcSet=""
          className={"w-[100px] h-[100px] rounded-md"}
          title={user.name}
        />
      </Link>
      <p
        className={"font-semibold text-sm text-center line-clamp-2 cursor-default"}
        title={user.name}
      >
        {user.name}
      </p>
    </div>
  );
}
