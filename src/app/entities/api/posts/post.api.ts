import { webFetcher } from "@/pkg/libraries/rest-api/web-fetcher";
import { IPostsResponse } from "@/app/entities/models";

//interface
export interface IGetPostsParams {
  page?: number;
  limit?: number;
}

//function
/**
 * Fetches posts from the API with pagination support.
 */
export const getPosts = async (
  params?: IGetPostsParams,
): Promise<IPostsResponse> => {
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set("page", params.page.toString());
  }

  if (params?.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  const queryString = searchParams.toString();
  const url = queryString ? `posts?${queryString}` : "posts";

  //return
  return await webFetcher.get(url).json<IPostsResponse>();
};
