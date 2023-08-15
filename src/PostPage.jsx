import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import BreadcrumbContext from "./BreadcrumbContext";
import useComments from "./useComments";

const PostPage = () => {
  const { id } = useParams();
  const [, setBreadcrumbState] = useContext(BreadcrumbContext);
  const [comments] = useComments(id);
  useEffect(() => {
    setBreadcrumbState(id);
  }, []);
  return (
    <div>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <article key={comment.id}>
          <header>{comment.name}</header>
          {comment.body}
          <footer>{comment.email}</footer>
        </article>
      ))}
    </div>
  );
};

export default PostPage;
