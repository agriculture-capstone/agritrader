import * as React from 'react';

import store from '../../../store';
import searchBarActions from '../../../store/modules/searchBar/actions';

export interface OwnProps {}

export interface OwnState {
  /** Value from the search bar */
  searchBarValue: string;
}

/**
 * Base class for search pages
 *
 * If overriding {SearchPage#componentWillMount} or {SearchPage#componentWillUnmount}
 * must remember to call super
 */
abstract class SearchPage extends React.Component<OwnProps, OwnState> {

  public constructor(props: OwnProps) {
    super(props);

    const reduxState = store.getState();
    this.state = {
      searchBarValue: reduxState.searchBar.value,
    };
  }

  /************************* React Lifecycle *************************/

  public componentWillMount() {
    store.dispatch(searchBarActions.showSearchBar());
    store.subscribe(() => {
      const newSearchValue = store.getState().searchBar.value;
      if (newSearchValue !== this.state.searchBarValue) {
        this.setState(() => ({
          searchBarValue: newSearchValue,
        }));
      }
    });
  }

  public componentWillUnmount() {
    store.dispatch(searchBarActions.clearSearchBar());
  }
}
