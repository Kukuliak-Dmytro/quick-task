import { restApiFetcher } from "@/pkg/libraries/rest-api/fetcher";
import { IPost } from "@/app/entities/models";

/**
 * Interface for creating a new post.
 *
 * @interface ICreatePostData
 */
export interface ICreatePostData {
  /** The title of the post */
  title: string;
  /** The content/body of the post */
  content: string;
  /** Whether the post is published (defaults to false) */
  published?: boolean;
}

/**
 * Creates a new post via the API.
 *
 * This function sends a POST request to create a new post
 * with automatic authentication handling through cookies.
 *
 * @param data - Post data to create
 * @returns Promise that resolves to the created post with author information
 * @throws {Error} Throws an error if the API request fails
 */
export const createPost = async (data: ICreatePostData): Promise<IPost> => {
  return await restApiFetcher.post("posts", { json: data }).json<IPost>();
};
