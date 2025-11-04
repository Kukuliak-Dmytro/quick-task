import { http } from "@/app/shared/lib/utils/fetcher";
import { ICommentsResponse, IComment } from "@/app/shared/interfaces";

export interface IGetCommentsParams {
  postId: string;
  page?: number;
  limit?: number;
}

export const getComments = async (
  params: IGetCommentsParams,
): Promise<ICommentsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("postId", params.postId);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const url = `comments?${searchParams.toString()}`;
  return await http.get(url).json<ICommentsResponse>();
};

export interface ICreateCommentData {
  postId: string;
  content: string;
}

export const createComment = async (
  data: ICreateCommentData,
): Promise<IComment> => {
  return await http.post("comments", { json: data }).json<IComment>();
};
