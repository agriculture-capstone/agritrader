import { StyleSheet } from 'react-native';

import { MATERIAL_COLORS } from '../../../native-base-theme/variables/styles';
export default StyleSheet.create({
  menuButtons : {
    marginRight: 10,
    marginLeft: 10,
  },
  stats: {
    textAlign: 'center',
    color: MATERIAL_COLORS.secondary.light,
  },
  label: {
    color: 'black', 
    opacity: 0.54,
    fontSize: 12,
  },
  unit : {
    fontSize:14,
    fontWeight: 'bold',
  }, 
  value : {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 5,
  },
});    
