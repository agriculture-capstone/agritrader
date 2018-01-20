import * as React from 'react';

import store from '../../../../store';
import headerActions from '../../../../store/modules/header/actions';
import drawerActions from '../../../../store/modules/drawer/actions';

/**
 * Higher order component for pages
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

  export default createPage(MyPage, 'back');
*
*/
export default function createPage<InjectedProps>(WrappedComponent: React.ComponentType<InjectedProps>) {

  return class Page extends React.Component<InjectedProps, {}> {

    public constructor(props: InjectedProps) {
      super(props);
    }

    /************************* React Lifecycle *************************/

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
