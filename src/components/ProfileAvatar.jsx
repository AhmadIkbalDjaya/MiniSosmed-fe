import defaultProfileImage from "../assets/images/default-profile.jpg";
import { Link } from "react-router-dom";

export default function ProfileAvatar(props) {
  const withh = props.width ? props.width : "35px";
  const heigthh = props.heigth ? props.heigth : "35px";
  return (
    <Link to={props.to} className={"pointer"}>
      <div {...props}>
        <img
          src={defaultProfileImage}
          alt=""
          className={`max-h-[${withh}] max-w-[${heigthh}] rounded-full`}
          width={withh}
          height={heigthh}
        />
      </div>
    </Link>
  );
}
