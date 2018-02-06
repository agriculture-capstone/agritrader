import 'es6-symbol/implement';

import { AppRegistry } from 'react-native';

import './store';
import './view/navigation/navigator';
import './view/navigation';
import App from './view/App';

AppRegistry.registerComponent('agritrader', () => App);
