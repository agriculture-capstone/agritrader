// Toolbar.test.tsx
import 'react-native';
import * as React from 'react';
import Toolbar, {
    LeftButtonTypes,    
} from '../components/Toolbar';
import * as renderer from 'react-test-renderer';
import images from '../assets';

it('renders correctly', () => {
  const component = renderer.create(
        <Toolbar title = 'Agritrader'
        /*as a demo I have placed two buttons on the right
        one with a settings icon and another with an account icon*/
        rightButtons = {
            [{
                    title: 'button1',
                    icon: images.account,
                    action: () => {
                        console.log("Right Button1 Action")
                    }
                },
                {
                    title: 'button2',
                    icon: images.settings,
                    action: () => {
                        console.log("Right Button2 Action")
                    }
                }
            ]
        }
        leftButtonType = {
            LeftButtonTypes.menu
        }
        />
    );
});