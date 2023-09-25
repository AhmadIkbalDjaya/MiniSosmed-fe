import { useEffect, useState } from "react";
import { friend_suggest } from "../services/user.service";
import OtherUser from "./OtherUser";

export default function FriendSuggest() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await friend_suggest();
      if (response.status == 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className={"font-semibold text-gray-500"}>Mungkin Anda Mengenal</h1>
      {loading ? (
        <>
          <OtherUser.Loading />
          <OtherUser.Loading />
          <OtherUser.Loading />
        </>
      ) : users.length > 0 ? (
        users.map((user) => (
          <OtherUser key={user.id} user={user} getData={getUser} />
        ))
      ) : (
        <p className="font-semibold text-center text-md py-10">
          Tidak Ada Saran Teman
        </p>
      )}
    </>
  );
}
