import { Action } from './types';

const searchBarActions = {

  /** Show the search bar */
  showSearchBar(placeholder = 'Search'): Action {
    return {
      placeholder,
      type: 'SHOW_SEARCH_BAR',
    };
  },

  /** Set the value of the search bar */
  setSearchBarValue(value: string): Action {
    return {
      value,
      type: 'SET_SEARCH_BAR_VALUE',
    };
  },

  /** Clear the search value */
  clearSearchValue(): Action {
    return {
      type: 'CLEAR_SEARCH_VALUE',
    };
  },

  /** Remove the search bar */
  removeSearchBar(): Action {
    return {
      type: 'REMOVE_SEARCH_BAR',
    };
  },
};

export default searchBarActions;
