/* eslint-disable react/prop-types */
import HeaderProfile from "../components/HeaderProfile";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  getUserProfile,
  updateBio,
  userFollowers,
  userFollowing,
} from "../services/user.service";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/ui/Modal";
import ProfileAvatar from "../components/ProfileAvatar";
import UserBox from "../components/UserBox";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";

export default function Profile() {
  const auth = useSelector((state) => state.auth);

  const [profile, setProfile] = useState();
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [bioModal, setBioModal] = useState(false);

  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();

  const getProfile = async () => {
    const response = await getUserProfile(username);
    setProfile(response);
  };

  const handleUpdateBio = async () => {
    const response = await updateBio({ birthday, genre: gender, address });
    if (response.status == 200) {
      setBioModal(false);
      getProfile();
    }
  };

  const getFollowers = async () => {
    const response = await userFollowers(username);
    if (response.status == 200) {
      setFollowers(response.data.data);
    }
  };

  const getFollowing = async () => {
    const response = await userFollowing(username);
    if (response.status == 200) {
      setFollowing(response.data.data);
    }
  };
  useEffect(() => {
    getProfile();
    getFollowers();
    getFollowing();
  }, [username]);
  return (
    <>
      <Navbar />
      <HeaderProfile profile={profile} />

      <main
        className={
          "min-h-[93vh] border-box md:mx-12 md:px-12 md:grid md:grid-cols-12 md:gap-6 my-10"
        }
      >
        <div className={"col-span-5"}>
          <div className="bg-white rounded shadow px-3 py-2 mb-5">
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
            {profile?.username == auth.username ? (
              <button
                className={
                  "bg-blue-600 w-full py-1 rounded text-white font-semibold my-3"
                }
                onClick={() => {
                  setBioModal(true);
                }}
              >
                Edit Biodata
              </button>
            ) : (
              ""
            )}
          </div>

          <div className={"bg-white rounded shadow px-3 py-2 mb-5"}>
            <h1 className={"font-semibold text-xl"}>Pengikut</h1>
            <h2 className={"text-sm font-semibold text-gray-500"}>
              {followers.length} Pengikut
            </h2>
            <div className={"flex flex-wrap gap-5 justify-evenly my-3"}>
              {followers.slice(0, 6).map((follower) => {
                return <UserBox key={follower.id} user={follower} />;
              })}
              <Link
                className={"w-full text-end me-5 text-blue-500 font-semibold"}
              >
                Lihat Lainnya &gt;
              </Link>
            </div>
          </div>
          <div className={"bg-white rounded shadow px-3 py-2 mb-5"}>
            <h1 className={"font-semibold text-xl"}>Mengikuti</h1>
            <h2 className={"text-sm font-semibold text-gray-500"}>
              {following.length} Diikuti
            </h2>
            <div className={"flex flex-wrap gap-5 justify-evenly my-3"}>
              {following.slice(0, 6).map((follow) => {
                return <UserBox key={follow.id} user={follow} />;
              })}
              <Link
                className={"w-full text-end me-5 text-blue-500 font-semibold"}
              >
                Lihat Lainnya &gt;
              </Link>
            </div>
          </div>
        </div>
        <div className={"col-span-7"}>
          <PostList page="profil" username={username} />
        </div>
      </main>
      {/* Edit Bio Modal */}
      <Modal
        visible={bioModal}
        close={() => {
          setBioModal(false);
        }}
        title={"Edit Biodata"}
      >
        <header className={"p-3 flex gap-3"}>
          <ProfileAvatar to={`/profile/${auth.username}`} />
          <Link to={`/profile/${auth.username}`} className={"font-semibold"}>
            Ahmad Ikbal Djaya
          </Link>
        </header>
        <main className={"px-3"}>
          <form action="">
            <div className={"my-2"}>
              <label htmlFor="birthday" className={"block font-semibold"}>
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                className={
                  "w-full mt-1 border border-gray-300 rounded px-1 outline-blue-200"
                }
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
                defaultValue={profile?.birthday}
              />
            </div>
            <div className={"my-2"}>
              <label htmlFor="gender" className={"block font-semibold"}>
                Jenis Kelamin
              </label>
              <select
                name="gender"
                id="gender"
                className={
                  "w-full mt-1 border border-gray-300 rounded px-1 outline-blue-200"
                }
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                // value={gender}
                defaultValue={profile?.gender}
              >
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className={"my-2"}>
              <label htmlFor="address" className={"block font-semibold"}>
                Alamat
              </label>
              <textarea
                name="address"
                id="address"
                className={
                  "w-full mt-1 border border-gray-300 rounded px-1 outline-blue-200"
                }
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                defaultValue={profile?.address}
              ></textarea>
            </div>
          </form>
        </main>
        <hr />
        <footer className={"pt-3 px-3 text-end"}>
          <button
            className="px-2 rounded bg-gray-400 font-semibold text-white me-2"
            onClick={() => setBioModal(false)}
          >
            Cancel
          </button>
          <button
            className={"px-2 rounded bg-yellow-400 font-semibold text-white"}
            onClick={() => {
              handleUpdateBio();
            }}
          >
            Edit
          </button>
        </footer>
      </Modal>
      {/* End Edit Bio Modal */}
    </>
  );
}
