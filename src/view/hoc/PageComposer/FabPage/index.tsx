import * as React from 'react';
import EventEmitter = require('wolfy87-eventemitter');
import { View, Fab, Icon } from 'native-base';

export type FabType = 'add' | 'share';

export interface InjectedFabProps {
  listen(listener: () => void): void;
}

export default function createFabPage<InjectedProps>(WrappedComponent: React.ComponentType<InjectedProps & InjectedFabProps>, type?: FabType) {

  /** Container for FabPage */
  return class FabPageContainer extends React.Component<InjectedProps, {}> {
    private readonly EVENT_TYPE = 'fab_event';

    private ee: EventEmitter;
    private fabWrapper: JSX.Element;

    public constructor(props: InjectedProps) {
      super(props);

      this.ee = new EventEmitter();
      this.fabWrapper = this.createFabWrapper();

      // Bindings
      this.emit = this.emit.bind(this);
      this.listen = this.listen.bind(this);
    }

    private listen(listener: () => void) {
      this.ee.addListener(this.EVENT_TYPE, listener);
    }

    private emit() {
      this.ee.emit(this.EVENT_TYPE);
    }

    private createFabWrapper() {
      return (
        <View key="fab-wrapper">
          <Fab
            onPress={this.emit}
            position="bottomRight"
          >
            <Icon name={type || 'add'} />
          </Fab>
        </View>
      );
    }

    /** React render */
    public render() {
      return [
        <WrappedComponent {...this.props} listen={this.listen} key="wrapped-page" />,
        this.fabWrapper,
      ];
    }
  };
}
