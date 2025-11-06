import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import { postsInfiniteQueryOptions } from "@/app/entities/api";
import { PostList } from "./elements/post-list.component";

//component
/**
 * PostsSection feature component.
 */
export const PostsSection = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());

  //return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
};
