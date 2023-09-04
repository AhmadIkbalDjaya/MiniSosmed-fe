import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeaderProfile from "../components/HeaderProfile";
import { useParams } from "react-router-dom";
import { getUserProfile, userFollowers } from "../api/userApi";
import UserTile from "../components/UserTile";

export default function Followers() {
  const [profile, setProfile] = useState();
  const { username } = useParams();

  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    getProfile();
    getFollowers();
  }, []);
  const getProfile = async () => {
    const response = await getUserProfile(username);
    setProfile(response);
  };
  const getFollowers = async () => {
    const response = await userFollowers(username);
    if (response.status == 200) {
      setFollowers(response.data.data);
    }
  };
  return (
    <>
      <Navbar />
      <HeaderProfile profile={profile} />

      <main className={"min-h-[93vh] border-box md:mx-12 md:px-12 my-10"}>
        <p className={"text-2xl font-semibold"}>{followers.length} Pengikut</p>
        {followers.map((user) => (
          <UserTile key={user.id} user={user} fetchData={getFollowers}/>
        ))}
      </main>
    </>
  );
}
