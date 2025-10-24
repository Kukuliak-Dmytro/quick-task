import { QueryClient, isServer } from "@tanstack/react-query";

/**
 * Creates a new QueryClient instance with optimized configuration.
 *
 * This function creates a QueryClient with specific settings for caching,
 * refetching, and retry behavior optimized for the application's needs.
 *
 * @returns A configured QueryClient instance
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache and refetch configuration
        staleTime: 30 * 1000, // 30 seconds - align with Next.js revalidation
        gcTime: 2 * 60 * 1000, // 2 minutes - keep in cache for 2 minutes
        refetchInterval: 30 * 1000, // Refetch every 30 seconds
        refetchOnWindowFocus: false, // Don't refetch on window focus for better UX
        refetchOnMount: false, // Don't refetch on mount if data exists
        refetchOnReconnect: true, // Refetch on reconnect for data freshness

        // Retry configuration
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          if (
            error instanceof Error &&
            "status" in error &&
            typeof error.status === "number"
          ) {
            if (error.status >= 400 && error.status < 500) {
              return false;
            }
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Gets the appropriate QueryClient instance for the current environment.
 *
 * This function returns a server-side QueryClient for server components
 * and a singleton browser QueryClient for client components to ensure
 * proper data sharing and prevent unnecessary re-initialization.
 *
 * @returns The appropriate QueryClient instance
 */
export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
