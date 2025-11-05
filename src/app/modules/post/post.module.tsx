import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import {
  commentsInfiniteQueryOptions,
  postByIdQueryOptions,
} from "@/app/entities/api";
import { FullPost } from "./elements/full-post.component";
import { CommentsSection } from "@/app/features/comments-section";

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
  await Promise.allSettled([
    queryClient.prefetchQuery(postByIdQueryOptions(postId)),
    queryClient.prefetchInfiniteQuery(commentsInfiniteQueryOptions(postId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <FullPost postId={postId} />
        <h3 className="mt-8 mb-2 text-xl font-semibold">Comments</h3>
        <CommentsSection postId={postId} />
      </div>
    </HydrationBoundary>
  );
};
