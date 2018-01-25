import * as React from 'react';
import EventEmitter = require('wolfy87-eventemitter');
import { View, Fab, Icon } from 'native-base';

export type FabType = 'add' | 'share';

export interface InjectedFabProps {
  listenToFab(listener: () => void): void;
}

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
