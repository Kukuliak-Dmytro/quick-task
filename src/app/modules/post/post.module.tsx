import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import {
  commentsInfiniteQueryOptions,
  postByIdQueryOptions,
} from "@/app/entities/api";
import { PostDetails } from "@/app/widgets/posts/post-details/post-details.component";
import { CommentList } from "@/app/widgets/comments";

// interface
interface IPostModuleProps {
  postId: string;
}

/**
 * PostModule component for displaying a single post with comments.
 *
 * This component handles server-side data prefetching for a single post and its comments.
 * It provides a hydration boundary for optimal performance with infinite query support.
 *
 * @param props - Component props containing the post ID
 * @returns Promise that resolves to JSX element representing the post module
 */
export const PostModule = async ({ postId }: IPostModuleProps) => {
  const queryClient = getQueryClient();

  //this enables fetching in parallel
  await Promise.all([
    queryClient.prefetchQuery(postByIdQueryOptions(postId)),
    queryClient.prefetchInfiniteQuery(commentsInfiniteQueryOptions(postId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <PostDetails postId={postId} />
        <h3 className="mt-8 mb-2 text-xl font-semibold">Comments</h3>
        <CommentList postId={postId} />
      </div>
    </HydrationBoundary>
  );
};

