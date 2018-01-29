import { Dimensions, StyleSheet } from 'react-native';

let { width, height } = Dimensions.get('window');

const width_mult = 0.9;

export const style = StyleSheet.create({
  overlay: {
    width,
    height,
    left: 0,
    top: 0,
    opacity: 0.4,
    backgroundColor: 'black',
    position: 'absolute',
  },
  alertCard: {
    position: 'absolute',
    backgroundColor: 'white',
    marginTop: '30%',
    marginLeft: 5,
    marginRight: 5,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '22%',
    marginBottom: '-5%',
    marginTop: '-2%',
  },
  alertBody: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingBottom: '2%',
    textAlign: 'center',
  },
  lineDivider: {
    backgroundColor: 'black',
    height: 1,
    width: width_mult * width,
    marginLeft: '2%',
    opacity: 0.1,
  },
});
