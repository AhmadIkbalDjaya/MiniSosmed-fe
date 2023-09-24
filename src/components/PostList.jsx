import PostLoading from "./loadings/PostLoading";
import Post from "./post";

export default function PostList(props) {
  const { posts, getData } = props;
  
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <Post key={post.id} post={post} getPost={getData} />;
        })
      ) : (
        <>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </>
      )}
    </>
  );
}
