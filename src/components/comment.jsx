/* eslint-disable react/prop-types */
import { IconDots, IconTrash } from "@tabler/icons-react";
import ProfileAvatar from "./ProfileAvatar";
import { useState } from "react";
import Modal from "./ui/Modal";
import { deleteComment } from "../api/commentApi";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Comment({ comment, getPost }) {
  const { auth } = useAuth();

  const [commentOption, setCommentOption] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    const response = await deleteComment(comment.id);
    if (response.status == 200) {
      await getPost();
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
          <span className={"text-xs text-gray-500"}>18 detik yang lalu</span>
        </div>
        {auth?.id == comment.user_id ? (
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
    </>
  );
}
