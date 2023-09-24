import { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateCommentBox from "./CreateComment";
import { getPostComment } from "../services/comment.service";

export default function CommentList(props) {
  const { post_id } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const response = await getPostComment(post_id);
    if (response.status == 200) {
      setComments(response.data.data);
    }
  };

  return (
    <div className={"relative bg-white w-full px-4 rounded-b"}>
      <div className={"max-h-[200px] overflow-auto"}>
        {comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} getData={getComment} />
          );
        })}
      </div>
      <CreateCommentBox postId={post_id} getData={() => getComment()} />
    </div>
  );
}
