import { NavigationState } from 'react-navigation';

import Navigator, { INITIAL_ROUTE } from '../../../view/navigation/navigator';

const navState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams(INITIAL_ROUTE), null) as NavigationState;

export default navState;
