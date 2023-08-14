import ProfileAvatar from "./ProfileAvatar";

export default function CreateCommentBox() {
  return (
    <div className={"flex justify-between py-2"}>
      <ProfileAvatar />
      <input
        type="text"
        name=""
        id=""
        placeholder="Tulis Komentar ..."
        className={"border grow mx-3 rounded-full px-2"}
      />
      <button type="submit" className={"bg-blue-600 px-2 rounded text-white"}>
        Comment
      </button>
    </div>
  );
}
