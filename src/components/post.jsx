import {
  IconDots,
  IconMessage2,
  IconPencil,
  IconThumbUpFilled,
  IconTrash,
  IconThumbUp,
} from "@tabler/icons-react";
import ProfileAvatar from "./ProfileAvatar";
import { useState } from "react";
import Modal from "./ui/Modal";
import { updatePost, deletePost, likePost } from "../services/post.service";
import InvalideMessage from "./ui/InvalideMsg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";

export default function Post({ post, getPost }) {
  const auth = useSelector((state) => state.auth);

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
      await getPost();
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
  };
  return (
    <>
      <div className={"bg-white pt-5 rounded shadow relative mb-5"}>
        <header className={"px-4 flex items-center justify-between"}>
          <ProfileAvatar to={`/profile/${post.username}`} />
          <div className={"px-5 grow"}>
            <Link to={`/profile/${post.username}`} className={"font-bold"}>
              {post.name}
            </Link>
            <h6 className={"text-gray-500 text-sm"}>{post.updated_at}</h6>
          </div>
          {auth.user_id == post.user_id ? (
            <div
              className={"me-3 relative"}
              onClick={() => setShowPostOption(!showPostOption)}
            >
              <IconDots size={18} className={"cursor-pointer"} />
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
          ) : (
            ""
          )}
        </header>

        <main className={""}>
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
        {showComment ? <CommentList post_id={post.id} /> : ""}
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
            defaultValue={body}
          ></textarea>
          {errors?.body &&
            errors.body.map((e) => (
              <InvalideMessage key={e}>{e}</InvalideMessage>
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

const Loading = () => {
  return (
    <>
      <div
        className={"animate-pulse bg-white pt-5 rounded shadow relative mb-5"}
      >
        <header className={"px-4 flex items-center justify-between"}>
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className={"px-5 grow"}>
            <p className={"font-bold h-3 bg-slate-200 rounded w-28"}></p>
            <h6 className={"text-sm bg-slate-200 h-2 mt-2 rounded w-16"}></h6>
          </div>
        </header>

        <main className={""}>
          <div className={"mx-4 my-3 h-2 bg-slate-200 rounded w-5/6"}></div>
          <div className={"mx-4 my-3 h-2 bg-slate-200 rounded"}></div>
          <div className="mx-4 my-3 h-52 bg-slate-200 rounded"></div>
        </main>

        <hr />

        <footer className={"flex justify-around my-1"}>
          <p className={"my-1 h-6 bg-slate-200 rounded w-16"}></p>
          <p className={"my-1 h-6 bg-slate-200 rounded w-16"}></p>
        </footer>
      </div>
    </>
  );
};

Post.Loading = Loading;
