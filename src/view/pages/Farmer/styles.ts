const React = require('react-native');
const { Dimensions, StyleSheet } = React;

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
  farmerName: {
    alignSelf: 'center',
    paddingTop: 28,
    paddingBottom: 14,
  },
  input: {
    paddingLeft: 21,
  },
  infoLabel: {
    paddingLeft: 21,
    paddingTop: 14,
  },
  label: {
    color: 'black',
  },
  picker: {
    paddingLeft: 14,
  },
  farmerInfoButtonRow: {
    paddingTop: 77,
  },
  farmerInfoButtonCol: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  editButton: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
  },
  paymentLabel: {
    paddingTop: 28,
    paddingLeft: 14,
  },
  addEntryButton: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
    paddingBottom: 21,
  },
});
