import * as React from 'react';

import store from '../../../../store';
import searchBarActions from '../../../../store/modules/searchBar/actions';

export interface SearchPageProps {}

export interface SearchPageState {
  /** Value from the search bar */
  searchBarValue: string;
}

/**
 * Base class for search pages
 *
 * If overriding {SearchPage#componentWillMount} or {SearchPage#componentWillUnmount}
 * must remember to call super
 *
 * @example
 *
  export class DerivedPage extends SearchPage<Props, OwnState> {

    constructor(props: Props) {
      super(props, 'Search Placeholder');
    }

    public render(): JSX.Element {
      return (
        <View />
      );
    }
  }
 *
 */
export default abstract class SearchPage<P extends SearchPageProps, S extends SearchPageState> extends React.Component<P, S> {
  private placeholder: string | undefined;

  public constructor(props: P, placeholder?: string) {
    super(props);

    // Initialize
    this.placeholder = placeholder;

    // Initialize state
    const reduxState = store.getState();
    this.state = Object.assign({}, this.state, {
      searchBarValue: reduxState.searchBar.value,
    });
  }

  /************************* React Lifecycle *************************/

  public componentWillMount() {
    // Listen to updates to search bar value and propogate to local state
    store.subscribe(() => {
      const newSearchValue = store.getState().searchBar.value;
      if (newSearchValue !== this.state.searchBarValue) {
        this.setState(() => ({
          searchBarValue: newSearchValue,
        }));
      }
    });

    // Enable search bar
    store.dispatch(searchBarActions.showSearchBar(this.placeholder));
  }

  public componentWillUnmount() {
    // Disable the search bar
    store.dispatch(searchBarActions.clearSearchBar());
  }
}
