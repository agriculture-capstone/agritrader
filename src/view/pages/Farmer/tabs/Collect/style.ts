import { StyleSheet } from 'react-native';

import { COLORS } from '../../../../../native-base-theme/variables/styles';

export default StyleSheet.create({
  addEntryButton: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
    paddingBottom: 21,
  }, 
  container: {
    backgroundColor: COLORS.backgroundColor,
  }, 
  content: {
    margin: 10, 
  },
  values: {
    color: COLORS.icons,
    textAlign: 'center',
  },
});
