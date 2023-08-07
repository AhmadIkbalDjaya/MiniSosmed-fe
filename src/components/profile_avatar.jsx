import defaultProfileImage from "../assets/images/default-profile.jpg";

export default function ProfileAvatar() {
  return (
    <div>
      <img
        src={defaultProfileImage}
        alt=""
        className={"max-h-[35px] max-w-[35px] rounded-full"}
      />
    </div>
  );
}
