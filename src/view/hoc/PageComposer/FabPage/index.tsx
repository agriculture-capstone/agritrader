import * as React from 'react';
import EventEmitter = require('wolfy87-eventemitter');
import { View, Fab, Icon } from 'native-base';

/** Type of Floating Action Button */
export type FabType = 'add' | 'share' | 'edit';

/** Props injected into wrapped component */
export interface InjectedFabProps {
  listenToFab(listener: () => void): void;
}

/**
 * Higher order component for Floating Action Page
 *
 * Adds a FAB to the bottom right of the page
 *
 * @param {React.ComponentType} [WrappedComponent] React component to wrap in HOC
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
export default function createFabPage<InjectedProps>(WrappedComponent: React.ComponentType<InjectedProps & InjectedFabProps>, type?: FabType) {

  /** Container for FabPage */
  return class FabPageContainer extends React.Component<InjectedProps, {}> {
    private readonly EVENT_TYPE = 'fab_event';

    private ee: EventEmitter;
    private fabWrapper: JSX.Element;

    public constructor(props: InjectedProps) {
      super(props);

      // Bindings
      this.emit = this.emit.bind(this);
      this.listen = this.listen.bind(this);

      this.ee = new EventEmitter();
      this.fabWrapper = this.createFab();
    }

    private listen(listener: () => void) {
      this.ee.addListener(this.EVENT_TYPE, listener);
    }

    private emit() {
      this.ee.emit(this.EVENT_TYPE);
    }

    private createFab() {
      return (
        <Fab
          onPress={this.emit}
          position="bottomRight"
        >
          <Icon name={type || 'add'} />
        </Fab>
      );
    }

    /** React render */
    public render() {
      return (
        <View style={{ flex: 1 }}>
          <WrappedComponent {...this.props} listenToFab={this.listen} key="wrapped-page" />
          {this.fabWrapper}
        </View>
      );
    }
  };
}
