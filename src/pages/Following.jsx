import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeaderProfile from "../components/HeaderProfile";
import { getUserProfile, userFollowing } from "../api/userApi";
import { useParams } from "react-router-dom";
import UserTile from "../components/UserTile";

export default function Following() {
  const [profile, setProfile] = useState();
  const [following, setFollowing] = useState([]);
  const { username } = useParams();

  const getProfile = async () => {
    const response = await getUserProfile(username);
    setProfile(response);
  };

  const getFollowing = async () => {
    const response = await userFollowing(username);
    console.log(response);
    if (response.status == 200) {
      setFollowing(response.data.data);
    }
  };

  useEffect(() => {
    getProfile();
    getFollowing();
  }, []);
  return (
    <>
      <Navbar />
      <HeaderProfile profile={profile} />
      <main className={"min-h-[93vh] border-box md:mx-12 md:px-12 my-10"}>
        <p className={"text-2xl font-semibold"}>{following.length} Diikuti</p>
        {following.map((user) => (
          <UserTile key={user.id} user={user} fetchData={getFollowing}/>
        ))}
      </main>
    </>
  );
}
