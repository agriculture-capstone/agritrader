import {
    StyleSheet,
    ToolbarAndroid,
    ToolbarAndroidAction,
} from 'react-native';
import * as React from 'react';
import *from '../../assets/';

/**
 * Types of permitted left toolbar buttons
 */
export enum LeftButtonTypes {
    menu = 'menu',
    back = 'back',
}

interface RightButtonType {
  title: string;
  icon ? : any;
  action: () => void;
}

interface ToolbarProps {
  title: string;
  leftButtonType: LeftButtonTypes;
  rightButtons: Array < RightButtonType > ;
}

export default class Toolbar extends React.Component < ToolbarProps, {} > {
  constructor(props: ToolbarProps) {
    super(props);
  }
    /* When a button is selected by a user, find its position in the actions
     array and call specified function*/
  public onActionSelected = (position: number) => {
    this.props.rightButtons[position].action();
  }
  public render() {
        //array to hold all action (right buttons) for the page
    const actionArray = new Array < ToolbarAndroidAction > ();
        /*Iterate through right buttons added to the page build action objects 
        based on the props and push them to the actionArray*/
    this.props.rightButtons.map(RightButton => {
      const action: ToolbarAndroidAction = {
        title: RightButton.title,
        show: 'always',
      };
      if (RightButton.icon) {
        action.icon = RightButton.icon;
      }
      actionArray.push(action);
    });
    return (<
            ToolbarAndroid title={
                this.props.title
            }
            titleColor="white"
            style={
                styles.toolbar
            }
            navIcon={
                (this.props.leftButtonType == LeftButtonTypes.menu) ? assets.menu : assets.back
            }
            onIconClicked={
                (this.props.leftButtonType == LeftButtonTypes.menu) ? () => console.log('menu icon selected') :
                    () => console.log('back icon selected')
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
