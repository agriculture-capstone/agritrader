import Navigator from '../../../navigation';
import { NavigationState } from 'react-navigation';

const navState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Login'), null) as NavigationState;

export default navState;
