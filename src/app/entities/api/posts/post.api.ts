import { webFetcher } from "@/pkg/libraries/rest-api/web-fetcher";
import { IPostsResponse } from "@/app/entities/models";

/**
 * Parameters for fetching posts with pagination support.
 *
 * @interface IGetPostsParams
 */
export interface IGetPostsParams {
  /** The page number to fetch (1-based indexing) */
  page?: number;
  /** The number of posts per page */
  limit?: number;
}

/**
 * Fetches posts from the API with pagination support.
 *
 * This function retrieves posts from the database via the API endpoint
 * with automatic authentication handling through cookies and pagination support.
 *
 * @param params - Optional pagination parameters
 * @returns Promise that resolves to posts response data with pagination metadata
 * @throws {Error} Throws an error if the API request fails
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

  return await webFetcher.get(url).json<IPostsResponse>();
};
