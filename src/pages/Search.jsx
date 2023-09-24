import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { searhUser } from "../services/user.service";
import UserTile from "../components/UserTile";

export default function Search() {
  const { search } = useParams();
  const [users, setUsers] = useState([]);
  const getSearhUser = async () => {
    const response = await searhUser(search);
    if (response.status == 200) {
      setUsers(response.data.data);
    }
  };
  useEffect(() => {
    getSearhUser();
  }, [search]);
  return (
    <>
      <Navbar />
      <main
        className={
          "min-h-[93vh] border-box md:mx-12 md:px-12 px-3 mt-12 py-12 "
        }
      >
        <h1 className={"text-2xl font-semibold"}>
          {users.length} Hasil Pencarian
        </h1>
        {users.map((user) => (
          <UserTile key={user.id} user={user} fetchData={getSearhUser} />
        ))}
      </main>
    </>
  );
}
