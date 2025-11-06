import { configureCache, setPolyfills } from "@growthbook/growthbook";

// config
export function configureServerSideGrowthBook() {
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
}
