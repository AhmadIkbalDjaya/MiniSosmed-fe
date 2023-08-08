import CreatePost from "./components/create_post";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import OtherUser from "./components/other_user";
import Post from "./components/post";

export default function App() {
  return (
    <>
      <Navbar />
      <main
        className={
          "min-h-[93vh] border-box md:mx-12 md:px-12 px-3 mt-12 py-12 md:grid md:grid-cols-6 md:gap-6"
        }
      >
        <div className={"col-span-4"}>
          <CreatePost />
          <Post />
          <Post />
        </div>
        <div className={"col-span-2 hidden md:block"}>
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
      {/* <Modal visible={false}> 
      mmmm
      </Modal> */}
    </>
  );
}
