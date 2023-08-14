import ProfileAvatar from "./ProfileAvatar";

export default function OtherUser() {
  return (
    <div className={"flex justify-between align-baseline my-5"}>
      <ProfileAvatar />
      <h1 className={"grow px-3 font-semibold"}>Nama</h1>
      <button className={"font-semibold text-white bg-blue-600 px-3 rounded"}>
        Follow
      </button>
    </div>
  );
}
