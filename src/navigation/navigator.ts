import { StackNavigator } from 'react-navigation';

import { FakePage } from '../view/pages/FakePage';

export default StackNavigator({
  Main: { screen: FakePage },
}, {
  headerMode: 'none',
});
