// Toolbar.test.tsx
import 'react-native';
import * as React from 'react';
import Toolbar, {
  LeftButtonTypes, RightButtonType,
} from '../../components/Toolbar';
import * as renderer from 'react-test-renderer';
import { icons } from '../../assets';

describe('<Toolbar/>', function () {
  const TITLE = 'Agritrader';
  const BUTTON_TEMPLATE = 'button_';
  const MULTI_BUTTON_COUNT = 2;

  describe('rendering left button and 0 right buttons', function () {
    it('creates valid snapshot', function () {
      const component = renderer.create(
        <Toolbar
          title={TITLE}
          rightButtons={addRightButtons(0)}
          leftButtonType={LeftButtonTypes.menu}
        />,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('rendering 1 right button', function () {
    it('creates valid snapshot', function () {
      const component = renderer.create(
        <Toolbar
          title={TITLE}
          rightButtons={addRightButtons(1)}
          leftButtonType={LeftButtonTypes.back}
        />,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('rendering 2 right button', function () {
    it('creates valid snapshot', function () {
      const component = renderer.create(
        <Toolbar
          title={TITLE}
          rightButtons={addRightButtons(MULTI_BUTTON_COUNT)}
          leftButtonType={LeftButtonTypes.menu}
        />,
      );
      expect(component).toMatchSnapshot();
    });
  });

  function addRightButtons(num: number): RightButtonType[] {
    return Array(num).map((_, index) => {
      return {
        title: `${BUTTON_TEMPLATE}${index}`,
        action: () => {},
      };
    });
  }
});
