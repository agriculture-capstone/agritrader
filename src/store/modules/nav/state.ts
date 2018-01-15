import Navigator from '@/view/navigation/navigator';
import { NavigationState } from 'react-navigation';

const navState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Main'), null) as NavigationState;

export default navState;
