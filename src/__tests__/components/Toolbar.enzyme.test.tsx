// __tests__/Toolbar.enzyme.test.tsx

import assets from '../assets';
import Toolbar, {
  LeftButtonTypes,    
} from '../components/Toolbar';
import react from 'react';
import { shallow } from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('test that ', () => {
  const toolbar = shallow(
    <Toolbar 
        title="Agritrader"
        rightButtons={
        [{
          title: 'button1',
          icon: assets.account,
          action: () => {
              console.log('Right Button1 Action');
        },
        },
        {
          title: 'button2',
          icon: assets.settings,
          action: () => {
          console.log('Right Button2 Action');
          },
        },
        ]
        }
        leftButtonType={
            LeftButtonTypes.menu
        }
    />);

  expect(toolbar.title).toEqual('Agritrader');
  expect(toolbar.rightButtons[0].title).toEqual('button1');
  expect(toolbar.rightButtons[0].icon).toEqual(assets.account);
  expect(toolbar.rightButtons[1].title).toEqual('button2');
  expect(toolbar.rightButtons[1].icon).toEqual(assets.settings);
  expect(toolbar.leftButtonTypes).toEqual(LeftButtonTypes.menu);
});
