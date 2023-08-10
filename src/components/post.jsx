/* eslint-disable react/prop-types */
import {
  IconDots,
  IconMessage2,
  IconPencil,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import ProfileAvatar from "./profile_avatar";
import { useState } from "react";
// import image from "../assets/images/image.jpg";
import { IconThumbUp } from "@tabler/icons-react";
import Comment from "./comment";
import CreateComment from "./create_comment";
import Modal from "./modal";

export default function Post({ post }) {
  const [showPostOption, setShowPostOption] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
  const [showPostEditModal, setShowPostEditModal] = useState(false);

  return (
    <>
      <div className={"bg-white pt-5 rounded shadow relative mb-5"}>
        <header className={"px-4 flex items-center justify-between"}>
          <ProfileAvatar />
          <div className={"px-5 grow"}>
            <h1 className={"font-bold"}>{post.name}</h1>
            <h6 className={"text-gray-500 text-sm"}>{post.updated_at}</h6>
          </div>
          <div
            className={"me-3 relative"}
            onClick={() => setShowPostOption(!showPostOption)}
          >
            <IconDots size={18} />
            {showPostOption ? (
              <div
                className={
                  "bg-white shadow-md absolute px-3 py-2 top-6 md:left-[-75px] right-[10px] w-max rounded"
                }
              >
                <button
                  className={"flex gap-1 my-1"}
                  onClick={() => setShowPostEditModal(true)}
                >
                  <IconPencil />
                  Edit Postingan
                </button>
                <button
                  className={"flex gap-1 my-1 text-red-600"}
                  onClick={() => setShowPostDeleteModal(!showPostDeleteModal)}
                >
                  <IconTrash />
                  Hapus Postingan
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </header>

        <main className={""}>
          <div className={"px-4 py-3"}>{post.body}</div>
          {post.image && (
            <div>
              <img src={post.image} alt="" />
            </div>
          )}
        </main>

        <hr />

        <footer className={"flex justify-around my-1"}>
          <button className={"flex gap-1 mb-1"}>
            {post.hasLike ? <IconThumbUpFilled /> : <IconThumbUp /> }
            {post.like_count} Like
          </button>
          <button
            className={"flex gap-1 mb-1 relative"}
            onClick={() => setShowComment(!showComment)}
          >
            <IconMessage2 /> {post.comment_count} Comment
          </button>
        </footer>
        {showComment ? (
          <div className={"relative bg-white w-full px-4 rounded-b"}>
            <div className={"max-h-[200px] overflow-auto"}>
              {post.comments.map((comment, i) => {
                return <Comment key={i} comment={comment} />;
              })}
            </div>
            <CreateComment />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* modal delete post */}
      <Modal
        visible={showPostDeleteModal}
        close={() => {
          setShowPostDeleteModal(false);
        }}
        title="Konfirmasi Hapus"
      >
        <div className={"p-3"}>
          <h1 className={"text-center"}>Yakin Ingin Menghapus?</h1>
        </div>
        <hr />
        <footer className={"pt-3 px-3 text-end"}>
          <button
            className="px-2 rounded bg-gray-400 font-semibold text-white me-2"
            onClick={() => setShowPostDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="px-2 rounded bg-red-600 font-semibold text-white">
            Hapus
          </button>
        </footer>
      </Modal>
      {/* end modal delete post */}

      {/* modal edit post */}
      <Modal
        visible={showPostEditModal}
        close={() => {
          setShowPostEditModal(false);
        }}
        title={"Edit Postingan"}
      >
        <div className={"p-3"}>
          <div className={"flex gap-2 items-center"}>
            <ProfileAvatar />
            <h1 className={"font-semibold"}>Ahmad Ikbal Djaya</h1>
          </div>
          <textarea name="" id="" className="w-full border my-3"></textarea>
          <div>
            <p className={"font-semibold pb-2"}>Upload Gambar</p>
            <input type="file" src="" alt="" />
          </div>
        </div>
        <hr />
        <footer className={"pt-3 px-3 text-end"}>
          <button
            className="px-2 rounded bg-gray-400 font-semibold text-white me-2"
            onClick={() => setShowPostEditModal(false)}
          >
            Cancel
          </button>
          <button className="px-2 rounded bg-blue-600 font-semibold text-white">
            Posting
          </button>
        </footer>
      </Modal>
      {/* end modal edit post */}
    </>
  );
}
