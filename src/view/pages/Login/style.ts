import { StyleSheet } from 'react-native';

import { MATERIAL_COLORS } from '../../../native-base-theme/variables/styles';

export default StyleSheet.create({
  form: {
    margin: 40,
  },
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: MATERIAL_COLORS.primary.normal,
    flex: 1,
    margin: 0,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  label: {
    left: -8,
  },
  loginButton: {
  },
  buttonRow: {
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
  },
  labelText: {
    color: 'white',
    paddingLeft: 8,
  },
  spinnerContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  spinner: {
  },
});
