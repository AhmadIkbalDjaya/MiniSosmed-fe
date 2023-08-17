import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import OtherUser from "../components/OtherUser";
import Post from "../components/Post";
import { getPostDashboard } from "../api/postApi";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
    document.title = "Minsos";
  }, []);

  const getPost = async () => {
    try {
      const response = await getPostDashboard();
      setPosts(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar />
      <main
        className={
          "min-h-[93vh] border-box md:mx-12 md:px-12 px-3 mt-12 py-12 md:grid md:grid-cols-12 md:gap-6"
        }
      >
        <div className={"col-span-8"}>
          <CreatePost getPost={getPost} />
          {posts.map((post) => {
            return <Post key={post.id} post={post} getPost={getPost} />;
          })}
        </div>
        <div className={"col-span-4 hidden md:block"}>
          <h1 className={"font-semibold text-gray-500"}>
            Mungkin Anda Mengenal
          </h1>
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <div className="flex justify-between text-gray-500 text-xs">
            <p>About Me</p>
            <p>
              &copy; 2023,
              <span className="font-bold"> djaya_ikbal</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
