import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import Modal from "./ui/Modal";
import InvalideMessage from "./ui/InvalideMsg";
import { storePost } from "../services/post.service";
import { useSelector } from "react-redux";

export default function CreatePost(props) {
  const [showPostCreateModal, setShowPostCreateModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [body, setBody] = useState();
  const [errors, setErrors] = useState();

  const handleStorePost = async () => {
    const response = await storePost({ body });
    if (response.status == 200) {
      props.getPost();
      setShowPostCreateModal(false);
      setErrors();
    } else if (response.status == 422) {
      setErrors(response.data.errors);
    }
  };
  return (
    <>
      <div className={"bg-white mb-4 px-4 py-3 rounded shadow flex gap-3"}>
        <ProfileAvatar to={`/profile/${auth.username}`} />
        <button
          className={
            "bg-gray-100 grow text-start px-3 py-1 rounded-full text-gray-400"
          }
          onClick={() => setShowPostCreateModal(true)}
        >
          Apa yang sedang anda pikirkan, {auth.name}?
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
            <h1 className={"font-semibold"}>{auth.name}</h1>
          </div>
          <textarea
            name="body"
            id=""
            className="w-full border mt-3"
            onChange={(e) => {
              setBody(e.target.value);
            }}
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
            onClick={() => setShowPostCreateModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleStorePost}
            className="px-2 rounded bg-blue-600 font-semibold text-white"
          >
            Posting
          </button>
        </footer>
      </Modal>
      {/* end modal create post */}
    </>
  );
}
