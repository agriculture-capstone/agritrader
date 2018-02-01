/** HOC for wrapping components in a translucent overlay */

import * as React from 'react';
import { style } from './style';
import { View, Text, Card, CardItem } from 'native-base';

/** Function that wraps a component with a translucent overlay that displays 'Coming Soon' to the user. */
export default function createComingSoonOverlay<InjectedProps>(WrappedComponent: React.ComponentType<InjectedProps>) {

  return class ComingSoonOverlay extends React.Component<InjectedProps> {

    /** Render method to return the wrapped component */
    public render() {
      return (
        <View>
          <View
            style={style.overlay}
            pointerEvents={'none'}
          >
            <WrappedComponent {...this.props}/>
          </View>
          <Card style={style.alertCard}>
            <CardItem header={true}>
              <Text style={style.alertTitle}>{'Coming Soon'}</Text>
            </CardItem>
            <View style={style.lineDivider}/>
            <CardItem cardBody={true}>
              <Text style={style.alertBody}>{'This feature is not ready for you yet, but we are working hard to finish it!'}</Text>
            </CardItem>
          </Card>
        </View>
      );
    }
  };
}
