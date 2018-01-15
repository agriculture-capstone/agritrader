const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceDimensions = {
  const deviceHeight = Dimensions.get('window').height,
  deviceWidth = Dimensions.get('window').width,
};
export const deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: deviceHeight / 3.5,
    position: 'relative',
    marginBottom: 10,
  },
  textFields: {
    width: deviceWidth/1.2,
  },
  
  forgotPassword: {
    paddingLeft: deviceWidth/1.8,
  },

  loginButton: {
    width: deviceWidth/1.1,
  },
});
