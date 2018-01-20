const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
  addEntryBtn: {
    paddingTop: 7,
  },
  cardRow: {
    paddingLeft: 14,
    paddingRight: 21,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  newEntryButton: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    backgroundColor: 'white',
    paddingTop: 21,
    paddingBottom: 21,
    paddingLeft: 21,
    paddingRight: 21,
  },
  addEntryLabel: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
});
