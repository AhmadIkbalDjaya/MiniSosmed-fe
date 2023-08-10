import { useContext, useState } from "react";
import ProfileAvatar from "./profile_avatar";
import Modal from "./modal";
import { AuthContext } from "../context/AuthProvider";
export default function CreatePost() {
  const [showPostCreateModal, setShowPostCreateModal] = useState(false);
  const { auth } = useContext(AuthContext);
  return (
    <>
      <div className={"bg-white mb-4 px-4 py-3 rounded shadow flex gap-3"}>
        <ProfileAvatar />
        <button
          className={
            "bg-gray-100 grow text-start px-3 py-1 rounded-full text-gray-400"
          }
          onClick={() => setShowPostCreateModal(true)}
        >
          Apa yang sedang anda pikirkan, {auth?.name}?
        </button>
      </div>

      {/* modal create post */}
      <Modal
        visible={showPostCreateModal}
        close={() => {
          setShowPostCreateModal(false);
        }}
        title={"Buat Postingan"}
      >
        <div className={"p-3"}>
          <div className={"flex gap-2 items-center"}>
            <ProfileAvatar />
            <h1 className={"font-semibold"}>{auth?.name}</h1>
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
            onClick={() => setShowPostCreateModal(false)}
          >
            Cancel
          </button>
          <button className="px-2 rounded bg-blue-600 font-semibold text-white">
            Posting
          </button>
        </footer>
      </Modal>
      {/* end modal create post */}
    </>
  );
}
