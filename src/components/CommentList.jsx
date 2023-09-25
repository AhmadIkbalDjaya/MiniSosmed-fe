import { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateCommentBox from "./CreateComment";
import { getPostComment } from "../services/comment.service";

export default function CommentList(props) {
  const { post_id } = props;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const response = await getPostComment(post_id);
    if (response.status == 200) {
      setComments(response.data.data);
    }
    setLoading(false);
  };

  return (
    <div className={"relative bg-white w-full px-4 rounded-b"}>
      <div className={"max-h-[200px] overflow-auto"}>
        {loading ? (
          <>
            <Comment.Loading />
            <Comment.Loading />
            <Comment.Loading />
          </>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} getData={getComment} />
          ))
        ) : (
          <p className="text-center font-semibold my-3">Belum Ada Komentar</p>
        )}
      </div>
      <CreateCommentBox postId={post_id} getData={() => getComment()} />
    </div>
  );
}
