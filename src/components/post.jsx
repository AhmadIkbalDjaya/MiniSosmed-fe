import {
  IconDots,
  IconMessage2,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import ProfileAvatar from "./profile_avatar";
import { useState } from "react";
import image from "../assets/images/image.jpg";
import { IconThumbUp } from "@tabler/icons-react";
import Comment from "./comment";
import CreateComment from "./create_comment";

export default function Post() {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showComment, setShowComment] = useState(false);

  return (
    <div className={"bg-white pt-5 rounded shadow relative mb-5"}>
      <header className={"px-4 flex items-center justify-between"}>
        <ProfileAvatar />
        <div className={"px-5 grow"}>
          <h1 className={"font-bold"}>Ahmad Ikbal Djaya</h1>
          <h6 className={"text-gray-500 text-sm"}>1 Minggu yang lalu</h6>
        </div>
        <button
          className={"me-3 relative"}
          onClick={() => setShowPostModal(!showPostModal)}
        >
          <IconDots size={18} />
          {showPostModal ? (
            <div
              className={
                "bg-white shadow-md absolute px-3 py-2 top-6 left-[-10px] w-max rounded"
              }
            >
              <button className={"flex gap-1 my-1"}>
                <IconPencil />
                Edit Postingan
              </button>
              <button className={"flex gap-1 my-1 text-red-600"}>
                <IconTrash />
                Hapus Postingan
              </button>
            </div>
          ) : (
            ""
          )}
        </button>
      </header>

      <main className={""}>
        <div className={"px-4 py-3"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          cupiditate quasi, reiciendis corrupti unde tenetur quia facere
          voluptatem doloribus dicta.
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </main>

      <hr />

      <footer className={"flex justify-around my-1"}>
        <button className={"flex gap-1 mb-1"}>
          <IconThumbUp /> 1 Like
        </button>
        <button
          className={"flex gap-1 mb-1 relative"}
          onClick={() => setShowComment(!showComment)}
        >
          <IconMessage2 /> 1 Comment
        </button>
      </footer>
      {showComment ? (
        <div className={"relative bg-white w-full px-4 rounded-b"}>
          <div>
            <Comment />
            <Comment />
          </div>
          <CreateComment />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
