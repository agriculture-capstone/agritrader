import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#3f51b5',
  },
  logo: {
    width: 80, 
    height: 80, 
    backgroundColor: '#0fc6ce', 
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
    color: 'white',
    fontWeight: 'bold',
  },
  username: {
    color: 'white',
    fontStyle: 'italic',
  },
});
