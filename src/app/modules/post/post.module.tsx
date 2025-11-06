import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import {
  commentsInfiniteQueryOptions,
  postByIdQueryOptions,
} from "@/app/entities/api";
import { FullPost } from "./elements/full-post.component";
import { CommentsSection } from "@/app/features/comments-section";

//interface
interface IPostModuleProps {
  postId: string;
}

//component
/**
 * PostModule component for displaying a single post with comments.
 */
export const PostModule = async ({ postId }: IPostModuleProps) => {
  const t = await getTranslations();
  const queryClient = getQueryClient();

  //this enables fetching in parallel
  await Promise.allSettled([
    queryClient.prefetchQuery(postByIdQueryOptions(postId)),
    queryClient.prefetchInfiniteQuery(commentsInfiniteQueryOptions(postId)),
  ]);

  //return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <FullPost postId={postId} />
        <h3 className="mt-8 mb-2 text-xl font-semibold">
          {t("comments_title")}
        </h3>
        <CommentsSection postId={postId} />
      </div>
    </HydrationBoundary>
  );
};
