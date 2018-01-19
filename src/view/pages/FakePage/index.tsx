import * as React from 'react';
import { Text, Content } from 'native-base';

import searchBarActions from '../../../store/modules/searchBar/actions';
import SearchPage, { SearchPageState, SearchPageProps } from '../../lib/baseComponents/SearchPage';

interface OwnProps extends SearchPageProps {}

/** FakePage state */
export interface OwnState extends SearchPageState {}

/** FakePage props */
export type Props = OwnProps;

/** Fake page */
export class FakePage extends SearchPage<Props, OwnState> {

  constructor(props: Props) {
    super(props, 'My Fake Page Yass');
  }

  public render(): JSX.Element {
    return (
      <Content>
        <Text>
          {this.state.searchBarValue}
        </Text>
      </Content>
    );
  }
}
