import { webFetcher } from "@/pkg/libraries/rest-api/web-fetcher";
import { IPost } from "@/app/entities/models";

//function
/**
 * Fetches a single post by ID from the API.
 */
export const getPostById = async (id: string): Promise<IPost> => {
  //return
  return await webFetcher.get(`posts/${id}`).json<IPost>();
};
