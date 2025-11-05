import { restApiFetcher } from "@/pkg/libraries/rest-api/fetcher";
import { IPost } from "@/app/entities/models";

export const getPostById = async (id: string): Promise<IPost> => {
  return await restApiFetcher.get(`posts/${id}`).json<IPost>();
};
