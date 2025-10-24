import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for combining CSS classes with proper Tailwind CSS merging.
 *
 * This function combines clsx for conditional class handling with twMerge
 * for proper Tailwind CSS class merging and deduplication.
 *
 * @param inputs - Variable number of class values to combine
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
