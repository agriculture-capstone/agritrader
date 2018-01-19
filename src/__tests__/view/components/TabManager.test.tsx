import 'react-native';
import * as React from 'react';

import { toTab } from '../../../view/lib/generators/TabManager';

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

describe('TabNavigator', () => {

  describe('#toTabs', () => {

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
      const after = toTab(before as any) as any;
      // tslint:disable-next-line:no-console
      console.log(after.name);

      // Assert
      expect(after.element).toBeUndefined();
      expect(after.name).toEqual(name);
      expect(after.color).toEqual(color);
    });
  });
});
