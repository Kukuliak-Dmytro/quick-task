import { webFetcher } from "@/pkg/libraries/rest-api/web-fetcher";
import { IPost } from "@/app/entities/models";

//interface
export interface ICreatePostData {
  title: string;
  content: string;
  published?: boolean;
}

//function
/**
 * Creates a new post via the API.
 */
export const createPost = async (data: ICreatePostData): Promise<IPost> => {
  //return
  return await webFetcher.post("posts", { json: data }).json<IPost>();
};
