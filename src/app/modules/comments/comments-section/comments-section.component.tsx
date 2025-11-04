import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/shared/lib/utils/get-query-client";
import { commentsInfiniteQueryOptions } from "@/app/entities/api";
import { CommentList } from "@/app/widgets/comments";

interface ICommentsSectionProps {
  postId: string;
}

/**
 * Server component: prefetch comments for a post and hydrate on client.
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

export default CommentsSection;
