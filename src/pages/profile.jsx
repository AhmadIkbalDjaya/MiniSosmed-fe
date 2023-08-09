import CreatePost from "../components/create_post";
import HeaderProfile from "../components/header_profile";
import Navbar from "../components/navbar";
import Post from "../components/post";

export default function Profile() {
  return (
    <>
      <Navbar />
      <HeaderProfile />
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
                  <td>Ahmad Ikbal Djaya</td>
                </tr>
                <tr>
                  <td className={"py-1 px-3"}>Bithday</td>
                  <td>:</td>
                  <td>2002-08-19</td>
                </tr>
                <tr>
                  <td className={"py-1 px-3"}>Genre</td>
                  <td>:</td>
                  <td>Laki-Laki</td>
                </tr>
                <tr>
                  <td className={"py-1 px-3"}>Address</td>
                  <td>:</td>
                  <td>Pangkep</td>
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
          <Post />
          <Post />
          <Post />
        </div>
      </main>
    </>
  );
}
