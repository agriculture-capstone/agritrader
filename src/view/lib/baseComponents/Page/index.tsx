import * as React from 'react';

import store from '../../../../store';
import headerActions from '../../../../store/modules/header/actions';
import drawerActions from '../../../../store/modules/drawer/actions';

/** Different types of pages */
export type PageType = 'menu' | 'back' | 'empty';

/**
 * Base class for search pages
 *
 * If overriding {SearchPage#componentWillMount} or {SearchPage#componentWillUnmount}
 * must remember to call super
 *
 * @example
 *
  export class DerivedPage extends Page<Props, OwnState> {

    constructor(props: Props) {
      super(props, Page.back);
    }

    public render(): JSX.Element {
      return (
        <View />
      );
    }
  }
 *
 */
export default abstract class Page<P, S> extends React.Component<P, S> {

  private type: PageType;

  public constructor(props: P, type: PageType = 'menu') {
    super(props);

    this.type = type;
  }

  /************************* React Lifecycle *************************/

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
