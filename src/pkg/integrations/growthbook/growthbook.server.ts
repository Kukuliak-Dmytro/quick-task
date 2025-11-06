import { configureCache, setPolyfills } from "@growthbook/growthbook";

//function
/**
 * Configures GrowthBook for server-side feature flag evaluation.
 */
export const configureServerSideGrowthBook = () => {
  setPolyfills({
    fetch: (url: string, init: RequestInit) =>
      fetch(url, {
        ...init,
        next: {
          revalidate: 10,
          tags: ["growthbook"],
        },
      }),
  });

  configureCache({
    disableCache: true,
  });
};
