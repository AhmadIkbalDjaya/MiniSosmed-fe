/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import ProfileAvatar from "./profile_avatar";
import Modal from "./modal";
import { AuthContext } from "../context/AuthProvider";
import InvalideMessage from "../utils/invalide-msg";
import { storePost } from "../api/postApi";

export default function CreatePost(props) {
  const [showPostCreateModal, setShowPostCreateModal] = useState(false);
  const { auth } = useContext(AuthContext);
  const [body, setBody] = useState();
  const [errors, setErrors] = useState();

  const handlePost = async () => {
    const response = await storePost({ body });
    if (response.status == 200) {
      props.getPost();
      setShowPostCreateModal(false);
      setErrors();
    } else if (response.status == 422) {
      setErrors(response.data.errors);
    }
    // try {
    //   const response = await axios.post(
    //     "https://sgso-invitation.com/api/post",
    //     {
    //       body,
    //     },
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         Authorization: `Bearer ${new Cookies().get("Authorization")}`,
    //       },
    //     }
    //   );
    //   if (response.status == 200) {
    //     props.getPost();
    //     setShowPostCreateModal(false);
    //     setErrors();
    //   }
    // } catch (error) {
    //   if (error.response.status == 422) {
    //     setErrors(error.response.data.errors);
    //   }
    // }
  };
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
          <textarea
            name="body"
            id=""
            className="w-full border mt-3"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
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
            onClick={() => setShowPostCreateModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
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
