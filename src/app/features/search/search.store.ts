import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SearchState, SearchActions } from "./search.interface";
import { SEARCH_DEFAULT_QUERY, SEARCH_QUERY_PARAM } from "./search.constants";
import { createUrlPersistentStorage } from "@/app/shared/lib/url-persistent-storage";
import { usePaginationStore } from "@/app/features/pagination/pagination.store";

export type SearchStore = SearchState & SearchActions;

/** Default initial state for search. */
export const defaultInitState: SearchState = {
  query: SEARCH_DEFAULT_QUERY,
};

/** URL parameter configuration for search persistence. */
const urlStorage = createUrlPersistentStorage<SearchState>([
  {
    paramName: SEARCH_QUERY_PARAM,
    stateKey: "query",
    defaultValue: SEARCH_DEFAULT_QUERY,
  },
]);

const storageOptions = {
  name: "searchStore",
  storage: createJSONStorage<SearchStore>(() => urlStorage),
};

/** Search store that syncs with URL parameters and resets pagination on query change. */
export const useSearchStore = create<SearchStore>()(
  persist<SearchStore>(
    (set) => ({
      ...defaultInitState,
      setQuery: (query: string) => {
        const trimmedQuery = query.trim();
        set({ query: trimmedQuery });
        usePaginationStore.getState().resetPagination();
      },
      clearQuery: () => {
        set({ query: SEARCH_DEFAULT_QUERY });
        usePaginationStore.getState().resetPagination();
      },
    }),
    storageOptions,
  ),
);
