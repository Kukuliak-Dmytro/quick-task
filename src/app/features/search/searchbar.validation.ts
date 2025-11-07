import { z } from "zod";

/**
 * Creates a Zod validation schema for search form data.
 *
 * This function creates a validation schema with internationalized error messages
 * for search form validation, including character limits and allowed characters.
 *
 * @param t - Translation function for internationalized messages
 * @returns Zod schema object for search form validation
 */
export const createSearchFormSchema = (t: (key: string) => string) =>
  z.object({
    query: z
      .string()
      .max(100, t("search.validation.maxLength"))
      .regex(
        /^[a-zA-Z0-9\s\-_.,!?]+$/,
        t("search.validation.invalidCharacters"),
      ),
  });

export type SearchFormData = z.infer<ReturnType<typeof createSearchFormSchema>>;
