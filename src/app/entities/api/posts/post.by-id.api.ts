import { webFetcher } from "@/pkg/libraries/rest-api/web-fetcher";
import { IPost } from "@/app/entities/models";

export const getPostById = async (id: string): Promise<IPost> => {
  return await webFetcher.get(`posts/${id}`).json<IPost>();
};
