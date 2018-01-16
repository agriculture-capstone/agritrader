import 'react-native';
import * as React from 'react';

import TabNavigator from '../../../view/components/TabNavigator';

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

describe('TabNavigator', () => {

  describe('#toTabs', () => {
    let toTabs: (o: any) => any;

    beforeEach(() => {
      toTabs = (TabNavigator as any).toTabs;
    });

    it('should properly deconstruct object w/o element property', () => {
      // Arrange
      const element = 'elementVal';
      const name = 'nameVal';
      const color = 'colorVal';
      const before = {
        element,
        name,
        color,
      };

      // Act
      const after = toTabs(before);
      // tslint:disable-next-line:no-console
      console.log(after.name);

      // Assert
      expect(after.element).toBeUndefined();
      expect(after.name).toEqual(name);
      expect(after.color).toEqual(color);
    });
  });
});
