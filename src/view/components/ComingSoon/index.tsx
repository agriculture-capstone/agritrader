/** HOC for wrapping components in a translucent overlay */

import * as React from 'react';
import { style } from './style';
import { Text, Content, View } from 'native-base';
import { Alert } from 'react-native';

export default function createComingSoonOverlay<InjectedProps>(
  WrappedComponent: React.ComponentType<InjectedProps>,
) {
  return class ComingSoonOverlay extends React.Component<InjectedProps> {


    public render() {
      return (
        <View
          style={style.overlay}
          pointerEvents={'none'}
          {...Alert.alert(
            'Coming Soon',
            'This feature is not ready for you yet, but we\'re working hard to finish it',
            [
            ],
            { cancelable: true },
          )}
        >
          <WrappedComponent {...this.props} {...this.props.children}/>
        </View>
      );
    }
  };
}
