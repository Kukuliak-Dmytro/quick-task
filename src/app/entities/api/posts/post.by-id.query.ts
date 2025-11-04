import { queryOptions } from "@tanstack/react-query";
import { getPostById } from "./post.by-id.api";

export const POST_BY_ID_QUERY_KEYS = {
  byId: (id: string) => ["post", { id }] as const,
} as const;

export const postByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: POST_BY_ID_QUERY_KEYS.byId(id),
    queryFn: () => getPostById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes - posts don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
  });
