// __tests__/Toolbar.enzyme.test.tsx

import assets from '../assets';
import Toolbar, {
  LeftButtonTypes,    
} from '../components/Toolbar';
import react from 'react';
import { shallow } from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('test that ', () => {
  b1 = 0;
  b2 = 0;
  const toolbar = shallow(
    <Toolbar 
        title="Agritrader"
        rightButtons={
        [{
          title: 'button1',
          icon: assets.account,
          action: () => {
            b1 = 1;
          },
        },
          {
            title: 'button2',
            icon: assets.settings,
            action: () => {
              b2 = 1;
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


  toolbar.rightButtons[0].find('input').simulate('change');
  expect(b1).toEqual(1);

  toolbar.rightButtons[1].find('input').simulate('change');
  expect(b2).toEqual(1);
});
