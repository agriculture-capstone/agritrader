// __tests__/Toolbar.enzyme.test.tsx

import react from 'react';
import { shallow } from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(
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

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
