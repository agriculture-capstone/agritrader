/** HOC for wrapping components in a translucent overlay */

import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, Content, View } from 'native-base';

export default function createComingSoonOverlay<InjectedProps>(
  WrappedComponent: React.ComponentType<InjectedProps>,
) {
  return class ComingSoonOverlay extends React.Component<InjectedProps> {


    public render() {
      return (
        <View
          style={style.overlay}
          pointerEvents={'none'}
        >
          <WrappedComponent {...this.props} {...this.props.children}>
            <Text style={style.comingSoonText}>{'Coming Soon!'}</Text>
          </WrappedComponent>
        </View>
      );
    }
  };
}

let { width, height } = Dimensions.get('window');
const heightDivider = 2;

const style = StyleSheet.create({
  overlay: {
    width,
    height,
    left: 0,
    top: 0,
    opacity: 0.8,
    backgroundColor: 'black',
  },
  comingSoonText: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 48,
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
