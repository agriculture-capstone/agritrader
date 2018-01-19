import { Action } from './types';

const searchBarActions = {

  showSearchBar(placeholder = 'Search'): Action {
    return {
      placeholder,
      type: 'SHOW_SEARCH_BAR',
    };
  },

  setSearchBarValue(value: string): Action {
    return {
      value,
      type: 'SET_SEARCH_BAR_VALUE',
    };
  },

  clearSearchValue(): Action {
    return {
      type: 'CLEAR_SEARCH_VALUE',
    }
  },

  removeSearchBar(): Action {
    return {
      type: 'REMOVE_SEARCH_BAR',
    };
  },
};

export default searchBarActions;
