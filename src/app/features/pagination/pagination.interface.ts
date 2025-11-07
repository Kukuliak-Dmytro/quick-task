/**
 * Pagination state interface defining the pagination store state.
 *
 * This interface describes the state structure for pagination functionality,
 * including page, limit, skip, and total values.
 */
export interface PaginationState {
  page: number;
  limit: number;
  skip: number;
  total: number;
}

/**
 * Pagination actions interface defining the pagination store actions.
 *
 * This interface describes the available actions for managing pagination state,
 * including setting page, limit, skip, total, and resetting pagination.
 */
export interface PaginationActions {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSkip: (skip: number) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
}
