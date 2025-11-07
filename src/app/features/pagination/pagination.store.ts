import { create } from "zustand";
import { PaginationState, PaginationActions } from "./pagination.interface";
import { PAGINATION_LIMIT } from "./pagination.constants";

export type PaginationStore = PaginationState & PaginationActions;

//function
/**
 * Pagination store for managing pagination state and actions.
 */
export const usePaginationStore = create<PaginationStore>((set) => ({
  page: 1,
  limit: PAGINATION_LIMIT,
  skip: 0,
  total: 0,
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
      page: 1,
      skip: 0,
      total: 0,
    }),
}));
