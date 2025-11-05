import { notFound } from "next/navigation";

/**
 * Catch-all route for unmatched paths.
 *
 * This page catches any route that doesn't match existing routes
 * and calls notFound() to display the not-found.tsx UI.
 *
 * @returns Never returns, always calls notFound()
 */
export default function NotFoundCatchAll() {
  notFound();
}
