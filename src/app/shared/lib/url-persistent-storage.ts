import { StateStorage } from "zustand/middleware";

/** Configuration for URL parameter mapping. */
export interface IUrlParamConfig<T> {
  /** URL query parameter name (e.g., "page", "search", "limit"). */
  paramName: string;
  /** State property key to map to this URL parameter. */
  stateKey: keyof T;
  /** Default value when the parameter is not present in the URL. */
  defaultValue: T[keyof T];
  /** Function to serialize state value to URL string. */
  serialize?: (value: T[keyof T]) => string;
  /** Function to deserialize URL string to state value. */
  deserialize?: (value: string) => T[keyof T];
  /** Whether to include this param in URL if it equals the default value. */
  includeDefault?: boolean;
}

/** Gets the URL search string without the leading '?'. */
const getUrlSearch = (): string => {
  if (typeof window === "undefined") return "";
  return window.location.search.slice(1);
};

/** Creates a Zustand StateStorage implementation that syncs state with URL parameters. */
export function createUrlPersistentStorage<T>(
  configs: IUrlParamConfig<T>[],
): StateStorage {
  return {
    getItem: (key: string): string | null => {
      if (typeof window === "undefined") return null;

      // Read values from URL params
      const urlSearch = getUrlSearch();
      if (urlSearch) {
        const searchParams = new URLSearchParams(urlSearch);
        const state = {} as T;

        configs.forEach((config) => {
          const urlValue = searchParams.get(config.paramName);
          if (urlValue !== null) {
            const deserialized = config.deserialize
              ? config.deserialize(urlValue)
              : (urlValue as T[keyof T]);
            state[config.stateKey] = deserialized;
          } else {
            state[config.stateKey] = config.defaultValue;
          }
        });

        // Construct full state object with version
        return JSON.stringify({ state, version: 0 });
      }

      // Fall back to localStorage
      return localStorage.getItem(key);
    },

    setItem: (key: string, newValue: string): void => {
      if (typeof window === "undefined") return;

      try {
        // Parse the persisted state
        const parsed = JSON.parse(newValue) as {
          state: T;
          version: number;
        };

        // Update URL with individual params
        const urlSearch = getUrlSearch();
        const searchParams = new URLSearchParams(urlSearch);

        configs.forEach((config) => {
          const stateValue = parsed.state[config.stateKey];
          const serialized = config.serialize
            ? config.serialize(stateValue)
            : String(stateValue);

          const isDefault =
            stateValue === config.defaultValue ||
            serialized === String(config.defaultValue);

          // Only include in URL if not default (or if includeDefault is true)
          if (!isDefault || config.includeDefault) {
            searchParams.set(config.paramName, serialized);
          } else {
            searchParams.delete(config.paramName);
          }
        });

        // Update URL
        const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
        window.history.replaceState(null, "", newUrl);
      } catch {
        // If parsing fails, ignore
      }

      // Also store in localStorage
      localStorage.setItem(key, newValue);
    },

    removeItem: (key: string): void => {
      if (typeof window === "undefined") return;

      // Remove from URL
      const urlSearch = getUrlSearch();
      if (urlSearch) {
        const searchParams = new URLSearchParams(urlSearch);
        configs.forEach((config) => {
          searchParams.delete(config.paramName);
        });
        const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
        window.history.replaceState(null, "", newUrl);
      }

      // Remove from localStorage
      localStorage.removeItem(key);
    },
  };
}
