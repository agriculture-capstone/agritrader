// Toolbar.test.tsx
import 'react-native';
import * as React from 'react';
import Toolbar, {
    LeftButtonTypes,    
} from '../components/Toolbar';
import * as renderer from 'react-test-renderer';
import assets from '../assets';

it('renders correctly', () => {
  const component = renderer.create(
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
        />,
    );
});
