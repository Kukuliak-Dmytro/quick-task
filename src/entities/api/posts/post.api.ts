import { http } from "@/shared/lib/utils/fetcher";
import { IPostsResponse } from "@/shared/interfaces";

/**
 * Fetches all posts from the API.
 *
 * This function retrieves all posts from the database via the API endpoint
 * with automatic authentication handling through cookies.
 *
 * @returns Promise that resolves to posts response data
 * @throws Throws an error if the API request fails
 */
export const getPosts = async (): Promise<IPostsResponse> => {
  return await http.get("posts").json<IPostsResponse>();
};
