
const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0fc6ce',
  },
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
    width: deviceWidth/1.25,
    left: -8,
  },
  
  forgotPassword: {
    paddingLeft: deviceWidth/1.8,
  },
  loginButton: {
    width: deviceWidth/1.3,
    backgroundColor: 'white',
    top: 10 ,
  },

  buttonText: {
    color: 'black',
  },
  labelText: {
    color: 'white',
    paddingLeft: 8,
  },
});
