import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PaginationState, PaginationActions } from "./pagination.interface";
import {
  PAGINATION_LIMIT,
  PAGE_QUERY_PARAM,
  LIMIT_QUERY_PARAM,
} from "./pagination.constants";
import { createUrlPersistentStorage } from "@/app/shared/lib/url-persistent-storage";

export type PaginationStore = PaginationState & PaginationActions;

/** Default initial state for pagination. */
export const defaultInitState: PaginationState = {
  page: 1,
  limit: PAGINATION_LIMIT,
  skip: 0,
  total: 0,
};

/** URL parameter configuration for pagination persistence. */
const urlStorage = createUrlPersistentStorage<PaginationState>([
  {
    paramName: PAGE_QUERY_PARAM,
    stateKey: "page",
    defaultValue: defaultInitState.page,
    deserialize: (value) => parseInt(value, 10) || defaultInitState.page,
  },
  {
    paramName: LIMIT_QUERY_PARAM,
    stateKey: "limit",
    defaultValue: defaultInitState.limit,
    deserialize: (value) => parseInt(value, 10) || defaultInitState.limit,
  },
]);

const storageOptions = {
  name: "paginationStore",
  storage: createJSONStorage<PaginationStore>(() => urlStorage),
};

/** Pagination store that syncs with URL parameters and localStorage. */
export const usePaginationStore = create<PaginationStore>()(
  persist<PaginationStore>(
    (set) => ({
      ...defaultInitState,
      setPage: (page) =>
        set((state) => ({
          page,
          skip: (page - 1) * state.limit,
        })),
      setLimit: (limit) =>
        set((state) => ({
          limit,
          skip: (state.page - 1) * limit,
        })),
      setSkip: (skip) => set({ skip }),
      setTotal: (total) => set({ total }),
      resetPagination: () =>
        set({
          page: defaultInitState.page,
          skip: defaultInitState.skip,
          total: defaultInitState.total,
        }),
    }),
    storageOptions,
  ),
);
