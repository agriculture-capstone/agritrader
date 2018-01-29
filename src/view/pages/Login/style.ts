import { StyleSheet } from 'react-native';

import { MATERIAL_COLORS } from '../../../native-base-theme/variables/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: MATERIAL_COLORS.primary.normal,
    flex: 1, 
    padding: 30,
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
    marginTop: 40,
    padding: 10,
  },
  labelText: {
    color: 'white',
    paddingLeft: 8,
  },
});
