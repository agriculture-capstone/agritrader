import * as React from 'react';

import store from '../../../../store';

interface SearchPageState {
  /** Value from the search bar */
  searchBarValue: string;
}

/** The props injected by a search page HOC */
export type InjectedSearchProps = SearchPageState;

/**
 * Higher order component for SearchPages
 *
 * Injects search value as prop to wrapped component
 *
 * @example
 *
  class MyPage extends React.Component<Props, OwnState> {

    constructor(props: Props) {
      super(props);
    }

    public render(): JSX.Element {
      return (
        <View />
      );
    }
  }

  export default createPage(MyPage, 'back', 'Search Farmers');
*
*/
export default function createSearchPage<InjectedProps>(
  WrappedComponent: React.ComponentType<InjectedProps & InjectedSearchProps>,
  placeholder?: string,
) {

  /** Higher order class for wrapping search pages */
  return class SearchPageContainer extends React.Component<InjectedProps, SearchPageState> {

    public constructor(props: InjectedProps) {
      super(props);

      // Initialize state from redux
      const reduxState = store.getState();
      this.state = Object.assign({}, this.state, {
        searchBarValue: reduxState.searchBar.value,
      });
    }

    /************************* React Lifecycle *************************/

    /** React componentDidMount */
    public componentDidMount() {
      // Listen to updates to search bar value and propogate to local state
      store.subscribe(() => {
        const newSearchValue = store.getState().searchBar.value;
        if (newSearchValue !== this.state.searchBarValue) {
          this.setState(() => ({
            searchBarValue: newSearchValue,
          }));
        }
      });
    }

    /** React render */
    public render() {
      // Inject searchBarValue into props of WrappedComponent
      return <WrappedComponent {...this.props} searchBarValue={this.state.searchBarValue} />;
    }
  }
}
