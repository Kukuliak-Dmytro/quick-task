import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//function
/**
 * Combines CSS classes with proper Tailwind CSS merging.
 */
export const cn = (...inputs: ClassValue[]) => {
  //return
  return twMerge(clsx(inputs));
};
