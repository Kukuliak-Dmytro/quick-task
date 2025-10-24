import { http } from "@/shared/lib/utils/fetcher";
import { IPostsResponse } from "@/shared/interfaces";

/**
 * Parameters for fetching posts with pagination
 */
export interface IGetPostsParams {
  page?: number;
  limit?: number;
}

/**
 * Fetches posts from the API with pagination support.
 *
 * This function retrieves posts from the database via the API endpoint
 * with automatic authentication handling through cookies and pagination support.
 *
 * @param params - Optional pagination parameters
 * @returns Promise that resolves to posts response data
 * @throws Throws an error if the API request fails
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

  return await http.get(url).json<IPostsResponse>();
};
