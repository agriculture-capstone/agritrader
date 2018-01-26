import { StyleSheet } from 'react-native';

import { MATERIAL_COLORS, COLORS } from '../../../../native-base-theme/variables/styles'; 

export default StyleSheet.create({
  container: {
    backgroundColor: MATERIAL_COLORS.primary.dark,
  },
  logo: {
    width: 80, 
    height: 80, 
    backgroundColor: COLORS.logo, 
    margin: 20, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 50,
  },
  logoicon: { 
    width: 50,
    height: 50,
    padding: 15
  },
  user: {
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0,
  },
  userFullName: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  username: {
    color: COLORS.white,
    fontStyle: 'italic',
  },
});
