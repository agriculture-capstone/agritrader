import * as React from 'react';
import { Spinner } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';
import searchBarActions from '../../../store/modules/searchBar/actions';

interface OwnProps {}

interface StoreProps {}

interface DispatchProps {
  showSearchBar(): void;
}

/** FakePage state */
export interface State {}

/** FakePage props */
export type Props = OwnProps & StoreProps & DispatchProps;

/**
 * TODO: Documentation
 */
export class Intermediate extends React.Component<Props, State> {

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  constructor(props: Props) {
    super(props);
  }

  /************************* React Lifecycle *************************/

  public componentWillMount() {
    this.props.showSearchBar();
  }

  /** React render method */
  public render(): JSX.Element {
    return (
      <Spinner color="red" />
    );
  }

  /************************* Static Functions ************************/
}

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    showSearchBar: () => dispatch(searchBarActions.showSearchBar()),
  };
};

export const FakePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intermediate);
