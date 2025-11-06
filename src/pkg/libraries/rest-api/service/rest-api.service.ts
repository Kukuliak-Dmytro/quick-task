import {
  defaultShouldDehydrateQuery,
  isServer,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

//function
/**
 * Creates a new QueryClient instance.
 */
const makeQueryClient = () => {
  //return
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => {
          //return
          return (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending"
          );
        },
      },
    },
  });
};

//function
/**
 * Gets or creates a QueryClient instance.
 */
export const getQueryClient = () => {
  if (isServer) {
    const serverClient = makeQueryClient();
    //return
    return serverClient;
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    //return
    return browserQueryClient;
  }
};
