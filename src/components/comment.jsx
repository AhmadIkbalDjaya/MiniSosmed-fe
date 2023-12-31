import { IconDots, IconTrash } from "@tabler/icons-react";
import ProfileAvatar from "./ProfileAvatar";
import { useState } from "react";
import Modal from "./ui/Modal";
import { deleteComment } from "../services/comment.service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Comment({ comment, getData }) {
  const auth = useSelector((state) => state.auth);

  const [commentOption, setCommentOption] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    const response = await deleteComment(comment.id);
    if (response.status == 200) {
      await getData();
      setDeleteModal(false);
    }
  };

  return (
    <>
      <div className={"flex items-start gap-3 py-2"}>
        <ProfileAvatar
          to={`/profile/${comment.username}`}
          className={"hidden md:block"}
        />
        <div>
          <div className={"bg-gray-100 px-2 py-1 rounded-md"}>
            <Link
              to={`/profile/${comment.username}`}
              className={"font-bold text-sm"}
            >
              {comment.name}
            </Link>
            <p className={"text-sm"}>{comment.body}</p>
          </div>
          <span className={"text-xs text-gray-500"}>{comment.created_at}</span>
        </div>
        {auth.user_id == comment.user_id ? (
          <div
            className={"pt-2 relative"}
            onClick={() => {
              setCommentOption(!commentOption);
            }}
          >
            <IconDots size={18} className={"cursor-pointer"} />
            {commentOption ? (
              <div
                className={
                  "bg-white px-3 py-2 shadow-md rounded absolute right-[1px]"
                }
              >
                <button
                  className={
                    "flex text-red-600 items-center text-sm font-semibold"
                  }
                  onClick={() => {
                    setDeleteModal(!deleteModal);
                  }}
                >
                  <IconTrash size={"18"} />
                  Hapus
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Modal Delete */}
      <Modal
        visible={deleteModal}
        close={() => {
          setDeleteModal(false);
        }}
        title="Konfirmasi Hapus"
      >
        <div>
          <div className={"p-3"}>
            <h1 className={"text-center"}>Yakin Ingin Menghapus Komentar?</h1>
          </div>
          <hr />
          <footer className={"pt-3 px-3 text-end"}>
            <button
              className="px-2 rounded bg-gray-400 font-semibold text-white me-2"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className={"px-2 rounded bg-red-600 font-semibold text-white"}
              onClick={handleDelete}
            >
              Hapus
            </button>
          </footer>
        </div>
      </Modal>
      {/* End Modal Delete */}
    </>
  );
}

const Loading = () => {
  return (
    <>
      <div className={"flex items-start gap-3 py-2 animate-pulse"}>
        <div className={"hidden md:block rounded-full bg-slate-200 h-9 w-9"} />
        <div>
          <div className={"bg-gray-100 mx-2 md:mx-0 px-2 py-1 rounded-md"}>
            <div className={"text-sm h-3 bg-slate-200 rounded w-32"}></div>
            <p className={"mt-1 h-2 bg-slate-200 w-72 rounded"}></p>
            <p className={"mt-1 h-2 bg-slate-200 w-80 rounded"}></p>
          </div>
          <div
            className={"mt-1 mx-4 md:mx-2 h-1 w-24 bg-slate-200 rounded"}
          ></div>
        </div>
      </div>
    </>
  );
};

Comment.Loading = Loading;
