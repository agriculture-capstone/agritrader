const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
  },
});
