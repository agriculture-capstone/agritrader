const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
  },
  addEntryButton: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
    paddingBottom: 21,
  },
});
