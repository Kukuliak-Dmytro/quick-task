import { webFetcher } from "@/pkg/libraries/rest-api/web-fetcher";
import { ICommentsResponse, IComment } from "@/app/entities/models";

//interface
export interface IGetCommentsParams {
  postId: string;
  page?: number;
  limit?: number;
}

//function
/**
 * Fetches comments from the API with pagination support.
 */
export const getComments = async (
  params: IGetCommentsParams,
): Promise<ICommentsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("postId", params.postId);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const url = `comments?${searchParams.toString()}`;
  //return
  return await webFetcher.get(url).json<ICommentsResponse>();
};

//interface
export interface ICreateCommentData {
  postId: string;
  content: string;
}

//function
/**
 * Creates a new comment via the API.
 */
export const createComment = async (
  data: ICreateCommentData,
): Promise<IComment> => {
  //return
  return await webFetcher.post("comments", { json: data }).json<IComment>();
};
