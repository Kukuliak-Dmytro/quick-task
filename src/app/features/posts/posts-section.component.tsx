import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import {
  postsInfiniteQueryOptions,
  postsQueryOptions,
} from "@/app/entities/api";
import { PostListInfinite } from "./elements/post-list-infinite.component";
import { PostListPaginated } from "./elements/post-list-paginated.component";
import { PAGINATION_LIMIT } from "@/app/features/pagination/pagination.constants";

//interface
interface IProps {
  listViewType: string;
}

//component
/**
 * PostsSection feature component.
 */
export const PostsSection = async (props: IProps) => {
  const { listViewType } = props;
  const queryClient = getQueryClient();

  // Prefetch based on variant
  if (listViewType === "infinite") {
    await queryClient.prefetchInfiniteQuery(postsInfiniteQueryOptions());
  } else if (listViewType === "pagination") {
    await queryClient.prefetchQuery(
      postsQueryOptions({ page: 1, limit: PAGINATION_LIMIT }),
    );
  }

  //return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {listViewType === "infinite" ? (
        <PostListInfinite />
      ) : listViewType === "pagination" ? (
        <PostListPaginated />
      ) : (
        <div>Invalid list view type</div>
      )}
    </HydrationBoundary>
  );
};
