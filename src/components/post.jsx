/* eslint-disable react/prop-types */
import {
  IconDots,
  IconMessage2,
  IconPencil,
  IconThumbUpFilled,
  IconTrash,
  IconThumbUp,
} from "@tabler/icons-react";
import ProfileAvatar from "./ProfileAvatar";
import { useContext, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Modal from "./ui/Modal";
import { updatePost, deletePost, likePost } from "../api/postApi";
import { AuthContext } from "../context/AuthProvider";
import InvalideMessage from "./ui/InvalideMsg";

export default function Post({ post, getPost }) {
  const { auth } = useContext(AuthContext);

  const [showPostOption, setShowPostOption] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
  const [showPostEditModal, setShowPostEditModal] = useState(false);

  const [body, setBody] = useState(post.body);
  const [errors, setErrors] = useState();

  const handleDeletePost = async () => {
    const response = await deletePost(post.id);
    console.log(response);
    if (response.data.responseCode == 200) {
      getPost();
      setShowPostDeleteModal(false);
    }
  };

  const handleEditPost = async () => {
    const response = await updatePost(post.id, { body });
    if (response.status == 200) {
      getPost();
      setShowPostEditModal(false);
      setErrors();
    } else if (response.status == 422) {
      setErrors(response.data.errors);
    }
  };

  const handleLike = async () => {
    const response = await likePost(post.id);
    if (response.status == 200) {
      getPost();
    }
    // else {
    // }
  };
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
          {/* <div className={"px-4 py-3"}>{post.body}</div> */}
          <div
            className={"px-4 py-3"}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          {post.image && (
            <div>
              <img src={post.image} alt="" />
            </div>
          )}
        </main>

        <hr />

        <footer className={"flex justify-around my-1"}>
          <button className={"flex gap-1 mb-1"} onClick={handleLike}>
            {post.hasLike ? <IconThumbUpFilled /> : <IconThumbUp />}
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
          <button
            className={"px-2 rounded bg-red-600 font-semibold text-white"}
            onClick={handleDeletePost}
          >
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
            <h1 className={"font-semibold"}>{auth?.name}</h1>
          </div>
          <textarea
            name="body"
            id=""
            className="w-full border my-3"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          >
            {body}
          </textarea>
          {errors?.body &&
            errors.body.map((e, i) => (
              <InvalideMessage key={i}>{e}</InvalideMessage>
            ))}
          <div>
            <p className={"font-semibold pb-2"}>Upload Gambar</p>
            <input type="file" src="" alt="" />
          </div>
        </div>
        <hr />
        <footer className={"pt-3 px-3 text-end"}>
          <button
            className="px-2 rounded bg-gray-400 font-semibold text-white me-2"
            onClick={() => {
              setShowPostEditModal(false);
              setBody(post.body);
            }}
          >
            Cancel
          </button>
          <button
            className={"px-2 rounded bg-amber-400 font-semibold text-white"}
            onClick={handleEditPost}
          >
            Edit Posting
          </button>
        </footer>
      </Modal>
      {/* end modal edit post */}
    </>
  );
}
