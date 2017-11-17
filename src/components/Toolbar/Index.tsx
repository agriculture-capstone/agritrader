import {
    StyleSheet,
    ToolbarAndroid,
    ToolbarAndroidAction
} from 'react-native';
import * as React from 'react';
import icons, {
    images
} from '../../assets/';

/*Only one button is permitted on the left
it must either be a menu button or back button */
export enum LeftButtonTypes {
    menu = "menu",
    back = "back"
}
/*Multiple buttons can be added to the right side of the toolbar
if an icon isn't specified the title will be displayed in its place*/
interface RightButtonType {
    title: string;
    icon ? : any;
    action: () => void;
}
//This specifies the toolbar properties we intend to allow the pages to control
interface ToolbarProps {
    title: string;
    leftButtonType: LeftButtonTypes;
    rightButtons: Array < RightButtonType > ;
}

export default class Toolbar extends React.Component < ToolbarProps, {} > {
    constructor(props: ToolbarProps) {
    super(props);
    }
    /*When a button is selected by a user, find its position 
    in the actions array and call specified function*/
    onActionSelected = (position: number) => {
        this.props.rightButtons[position].action();
    }
    render() {
        //array to hold all action (right buttons) for the page
        let actionArray = new Array < ToolbarAndroidAction > ();
        /*Iterate through right buttons added to the page
        build action objects based on the props and push them to the actionArray*/
        this.props.rightButtons.map(RightButton => {
            let action: ToolbarAndroidAction = {
                title: RightButton.title,
                show: 'always'
            }
            if (RightButton.icon) {
                action.icon = RightButton.icon;
            }
            actionArray.push(action)
        })
        return ( <
            ToolbarAndroid title = {
                this.props.title
            }
            titleColor = 'white'
            style = {
                styles.toolbar
            }
            /*If the left button specified on the page is a 'menu' type
            use the menu icon otherwise use the 'back' icon*/
            navIcon = {
                (this.props.leftButtonType == LeftButtonTypes.menu) ? icons.menu : icons.back
            }
            /*If the left button specified on the page is a 'menu' type
            use the menu function otherwise use the 'back' function*/
            onIconClicked = {
                (this.props.leftButtonType == LeftButtonTypes.menu) ? () => console.log("menu icon selected") :
                    () => console.log("back icon selected")
            }
            onActionSelected = {
                this.onActionSelected
            }
            actions = {
                actionArray
            }
            />
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
});