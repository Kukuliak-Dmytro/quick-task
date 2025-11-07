/** Search state interface. */
export interface SearchState {
  query: string;
}

/** Search actions interface. */
export interface SearchActions {
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

/** Search store type combining state and actions. */
export type SearchStore = SearchState & SearchActions;
