import { useEffect, useState } from "react";
import Post from "./post";
import { getPostDashboard, getUserPost } from "../services/post.service";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";

export default function PostList(props) {
  const auth = useSelector((state) => state.auth);
  const { page = "home", username = "" } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    setLoading(true);
    getPost();
  }, [username]);

  const getPost = async () => {
    try {
      let response;
      if (page == "home") {
        response = await getPostDashboard();
      } else if (page == "profil") {
        response = await getUserPost(username);
      }
      setPosts(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {auth.username == username || page == "home" ? (
        <CreatePost getPost={getPost} />
      ) : null}

      {loading ? (
        <>
          <Post.Loading />
          <Post.Loading />
          <Post.Loading />
        </>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} getPost={getPost} />
        ))
      ) : (
        <p className="text-center font-semibold text-xl my-10">
          Belum Ada Postingan
        </p>
      )}
    </>
  );
}
