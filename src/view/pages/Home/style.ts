import { StyleSheet } from 'react-native';

import { MATERIAL_COLORS, TEXT_STYLES, COLORS } from '../../../native-base-theme/variables/styles';

export default StyleSheet.create({
  menuButtons: {
    marginRight: 10,
    marginLeft: 10,
  },
  label: {
    textAlign: 'center',
    color: '#383838',
  }, 
  betaNotice: {
    backgroundColor: MATERIAL_COLORS.secondary.normal,
  }, 
  betaContents: {
    color: "#ffffffcc"
  },
  betaTitle: {
    // alignSelf: "center",
    fontWeight: "bold",
    color: COLORS.white
  }
});
