import ProfileAvatar from "./profile_avatar";

export default function CreatePost() {
  return (
    <div className={"bg-white mb-4 px-4 py-3 rounded shadow flex gap-3"}>
      <ProfileAvatar />
      <button className={"bg-gray-100 grow text-start px-3 py-1 rounded-full text-gray-400"}>
        Apa yang sedang anda pikirkan, Ahmad Ikbal Djaya?
      </button>
    </div>
  );
}
