import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
  },
  button: {
    alignItems: 'center',
  },
  body: {
    padding: 10,
    paddingTop: 0,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  hiddenButton: {
    display: 'none',
  },
});
