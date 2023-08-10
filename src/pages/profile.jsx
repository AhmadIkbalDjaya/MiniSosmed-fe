/* eslint-disable react/prop-types */
import CreatePost from "../components/create_post";
import HeaderProfile from "../components/header_profile";
import Navbar from "../components/navbar";
import Post from "../components/post";
import { useEffect, useState } from "react";
import { getUserPost } from "../api/Post";
import { getUserProfile } from "../api/User";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState();
  const { username } = useParams();

  useEffect(() => {
    getPost();
    getProfile();
  }, []);

  const getPost = async () => {
    try {
      const response = await getUserPost(username);
      setPosts(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getProfile = async () => {
    try {
      const response = await getUserProfile(username);
      setProfile(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar />
      {/* {profile ? <HeaderProfile profile={profile} /> : ""} */}
      <HeaderProfile profile={profile} />

      <main
        className={
          "min-h-[93vh] border-box md:mx-12 md:px-12 md:grid md:grid-cols-12 md:gap-6 my-10"
        }
      >
        <div className={"col-span-5"}>
          <div className="bg-white rounded shadow px-3 py-2">
            <h1 className="font-semibold text-xl">Biodata</h1>
            <table className={"text-lg w-full"}>
              <tbody>
                <tr>
                  <td className={"py-1 px-3"}>Nama</td>
                  <td>:</td>
                  <td>{profile?.name}</td>
                </tr>
                <tr>
                  <td className={"py-1 px-3"}>Bithday</td>
                  <td>:</td>
                  <td>{profile?.birthday ? profile.birthday : "-"}</td>
                </tr>
                <tr>
                  <td className={"py-1 px-3"}>Gender</td>
                  <td>:</td>
                  <td>{profile?.gender ? profile.gender : "-"}</td>
                </tr>
                <tr>
                  <td className={"py-1 px-3"}>Address</td>
                  <td>:</td>
                  <td>{profile?.address ? profile.address : "-"}</td>
                </tr>
              </tbody>
            </table>
            <button
              className={
                "bg-blue-600 w-full py-1 rounded text-white font-semibold my-3"
              }
            >
              Edit Biodata
            </button>
          </div>
        </div>
        <div className={"col-span-7"}>
          <CreatePost />
          {posts.map((post, i) => {
            return <Post key={i} post={post} />;
          })}
        </div>
      </main>
    </>
  );
}
