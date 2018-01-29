import { Dimensions, StyleSheet } from 'react-native';

let { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  overlay: {
    width,
    height,
    left: 0,
    top: 0,
    opacity: 0.5,
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