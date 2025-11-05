import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import { commentsInfiniteQueryOptions } from "@/app/entities/api";
import { CommentList } from "@/app/widgets/comments";

// interface
interface ICommentsSectionProps {
  postId: string;
}

/**
 * CommentsSection feature component.
 *
 * Server component: prefetch comments for a post and hydrate on client.
 * This is a reusable feature that can be used across different modules.
 *
 * @param props - Component props containing the post ID
 * @returns Promise that resolves to JSX element representing the comments section
 */
export const CommentsSection = async ({ postId }: ICommentsSectionProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(commentsInfiniteQueryOptions(postId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommentList postId={postId} />
    </HydrationBoundary>
  );
};

