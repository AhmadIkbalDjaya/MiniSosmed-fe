/* eslint-disable react/prop-types */
import defaultProfileImage from "../assets/images/default-profile.jpg";

// export default function ProfileAvatar({ width = "35px", heigth = "35px" }) {
export default function ProfileAvatar({width, heigth}) {
  const withh = width ? width : "35px";
  const heigthh = heigth ? heigth : "35px";
  return (
    <div>
      <img
        src={defaultProfileImage}
        alt=""
        className={`max-h-[${withh}] max-w-[${heigthh}] rounded-full`}
        // width={width}
        // height={heigth}
      />
    </div>
  );
}
