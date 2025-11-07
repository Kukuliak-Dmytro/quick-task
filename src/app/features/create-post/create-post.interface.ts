import { z } from "zod";

//constant
/**
 * Zod schema for post creation form validation.
 */
export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

//interface
export interface ICreatePostSchema {
  title: string;
  content: string;
}
