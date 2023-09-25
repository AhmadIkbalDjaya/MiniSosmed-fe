import { useEffect } from "react";
import Navbar from "../components/Navbar";
import OtherUser from "../components/OtherUser";
import PostList from "../components/PostList";
import FriendSuggest from "../components/FriendSuggest";

export default function Home() {

  useEffect(() => {
    document.title = "Minsos";
  }, []);

  return (
    <>
      <Navbar />
      <main
        className={
          "min-h-[93vh] border-box md:mx-12 md:px-12 px-3 mt-12 py-12 md:grid md:grid-cols-12 md:gap-6"
        }
      >
        <div className={"col-span-8"}>
          <PostList />
        </div>
        <div className={"col-span-4 hidden md:block"}>
          <FriendSuggest />
          {/* <h1 className={"font-semibold text-gray-500"}>
            Mungkin Anda Mengenal
          </h1>
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser /> */}
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
