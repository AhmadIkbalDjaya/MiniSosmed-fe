/* eslint-disable react/prop-types */
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { storeComment } from "../api/commentApi";
import { useAuth } from "../hooks/useAuth";

export default function CreateCommentBox({ postId, getPost }) {
  const { auth } = useAuth();
  const [body, setBody] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    if (body != "") {
      const response = await storeComment(postId, { body });
      if (response.status == 200) {
        await getPost();
        setBody("");
      }
    }
  };
  return (
    <div className={"flex justify-between py-2"}>
      <ProfileAvatar to={`/profile/${auth.username}`} />
      <form onSubmit={handleComment} action="" className={"grow flex"}>
        <input
          type="text"
          name="body"
          id=""
          placeholder="Tulis Komentar ..."
          className={"border grow mx-3 rounded-full px-2 grow w-full"}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button type="submit" className={"bg-blue-600 px-2 rounded text-white"}>
          Comment
        </button>
      </form>
    </div>
  );
}
