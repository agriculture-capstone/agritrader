const React = require('react-native');
const { Platform, Dimensions, StyleSheet } = React;

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  /*Logo styling*/
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 200,
    height: 120,
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  /* wallpaper styling */
  wallpaper: {
    flex: 1,
    backgroundColor: '#0fc6ce',
  },
  /* ButtonSubmit styling */
  submitContainer: {
    flex: 1,
    top: -0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    width: 150,
    borderRadius: 40,
  },
  submittext: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  submitImage: {
    width: 100,
    height: 100,
  },

  /*ForgotPassword styling*/
  forgotPasswordContainer: {
    flex: 2,
    top: -10,
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  forgotPasswordText: {
    color: 'white',
    backgroundColor: 'transparent',
  },

  /*Form styling*/
  formContainer: {
    flex: 2,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  /*UserInput styling*/
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: deviceWidth - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});
