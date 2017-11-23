import {
  StyleSheet,
  ToolbarAndroid,
  ToolbarAndroidAction,
} from 'react-native';
import * as React from 'react';
import { icons } from '../../assets/';

/**
  * Types of permitted left toolbar buttons
  */
export enum LeftButtonTypes {
  menu = 'menu',
  back = 'back',
}
/**
  * action menu properties
  */
export interface RightButtonType {
  title: string;
  icon?: any;
  action: () => void;
}

interface ToolbarProps {
  title: string;
  leftButtonType: LeftButtonTypes;
  rightButtons: RightButtonType[];
}
/**
 * Class representing a Toolbar
 * @extends React.Component<ToolbarProps, {}>
 */
export default class Toolbar extends React.Component<ToolbarProps, {}> {
  constructor(props: ToolbarProps) {
    super(props);
    this.onActionSelected = this.onActionSelected.bind(this);
  }
  /**
   * When a button is selected by a user, find its position in the actions
   * array and call specified function
   */
  public onActionSelected(position: number) {
    this.props.rightButtons[position].action();
  }
  /**
   * Render method for Toolbar
   */
  public render() {
    const actionArray = ToolbarAndroidAction[]();
    this.props.rightButtons.map(rightButton => {
      const action: ToolbarAndroidAction = {
        title: RightButton.title,
        show: 'ifRoom',
      };
      if (RightButton.icon) {
        action.icon = RightButton.icon;
      }
      actionArray.push(action);
    })
  private return(<
    ToolbarAndroid title= {
      this.props.title
    }
    titleColor="white"
    style={
      styles.toolbar
    }
    navIcon={(this.props.leftButtonType == LeftButtonTypes.menu) ? icons.menu : icons.back
    }
    onIconClicked={(this.props.leftButtonType == LeftButtonTypes.menu) ? () => { } : () => { }
    }
    onActionSelected={
      this.onActionSelected
    }
    actions={
      actionArray
    }
  />
  );
}
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#4883da',
  },
});
