import * as React from 'react';

import store from '../../../../store';
import headerActions from '../../../../store/modules/header/actions';
import drawerActions from '../../../../store/modules/drawer/actions';

/** Different types of pages */
export type PageType = 'menu' | 'back' | 'empty';

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
export default function createPage<InjectedProps>(WrappedComponent: React.ComponentType<InjectedProps>, type: PageType = 'menu') {

  return class Page extends React.Component<InjectedProps, {}> {

    private type: PageType;

    public constructor(props: InjectedProps) {
      super(props);

      this.type = type;
    }

    /************************* React Lifecycle *************************/

    public render() {
      return <WrappedComponent {...this.props} />;
    }

    public componentWillMount() {
      switch (this.type) {
        case 'back':
          store.dispatch(headerActions.setHeaderShown(true));
          store.dispatch(drawerActions.setDrawerLocked(true));
          break;

        case 'menu':
          store.dispatch(headerActions.setHeaderShown(true));
          store.dispatch(drawerActions.setDrawerLocked(false));
          break;

        case 'empty':
          store.dispatch(headerActions.setHeaderShown(false));
          store.dispatch(drawerActions.setDrawerLocked(true));
          break;

        default:
          throw new Error('should not be default case');
      }
    }
  }
}
