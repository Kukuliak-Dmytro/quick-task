import { http } from "@/shared/lib/utils/fetcher";
import { IPost } from "@/shared/interfaces";

export const getPostById = async (id: string): Promise<IPost> => {
  return await http.get(`posts/${id}`).json<IPost>();
};
