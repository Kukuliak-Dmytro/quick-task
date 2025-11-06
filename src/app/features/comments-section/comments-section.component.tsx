import { CommentList, CreateComment } from "./elements/";

//interface
interface ICommentsSectionProps {
  postId: string;
}

//component
/**
 * CommentsSection feature component.
 */
export const CommentsSection = async ({ postId }: ICommentsSectionProps) => {
  //return
  return (
    <div className="space-y-6">
      <CreateComment postId={postId} />
      <CommentList postId={postId} />
    </div>
  );
};
