import { CommentList, CreateComment } from "./elements/";

// interface
interface ICommentsSectionProps {
  postId: string;
}

/**
 * CommentsSection feature component.
 *
 * Server component: prefetch comments for a post and hydrate on client.
 * This feature brings together all comment-related elements:
 * - Create comment form
 * - Comment list with infinite scroll
 * - Individual comment display
 * - Loading skeletons
 *
 * @param props - Component props containing the post ID
 * @returns Promise that resolves to JSX element representing the comments section
 */
export const CommentsSection = async ({ postId }: ICommentsSectionProps) => {
  return (
    <div className="space-y-6">
      <CreateComment postId={postId} />
      <CommentList postId={postId} />
    </div>
  );
};
