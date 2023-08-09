import defaultProfileImage from "../assets/images/default-profile.jpg";

export default function ProfileAvatar({ width = "35px", heigth = "35px" }) {
  return (
    <div>
      <img
        src={defaultProfileImage}
        alt=""
        className={`max-h-[${width}] max-w-[${heigth}] rounded-full`}
      />
    </div>
  );
}
