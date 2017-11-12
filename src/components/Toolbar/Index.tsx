import {
    StyleSheet,
    ToolbarAndroid,
    ToolbarAndroidAction
} from 'react-native';
import * as React from 'react';
import icons, { images } from '../../src/assets/Assets';


export enum LeftButtonTypes {
    menu="menu",
    back="back",
}

export enum ButtonIcons{
    back=icons.back,
    menu=icons.menu,
    settings=icons.settings,
    account=icons.account,
}

interface RightButtonType {
    title: string;
    icon?: ButtonIcons;
    action: () => void;
}
interface ToolbarProps {
    title: string;
    leftButtonType: LeftButtonTypes;
    rightButtons: Array<RightButtonType>;
}

export default class Toolbar extends React.Component<ToolbarProps, {}>  {
    constructor(props: ToolbarProps) {
        super(props);
    }
    onActionSelected = (position: number) => {
        this.props.rightButtons[position].action();
    }
    render() {
        let actionArray = new Array<ToolbarAndroidAction>();
        this.props.rightButtons.map(RightButton => {
            let action: ToolbarAndroidAction = { title: RightButton.title, show: 'always'}
            if(RightButton.icon){
                action.icon = icons.back
            }          
            actionArray.push(action)
        })
        return (
            <ToolbarAndroid
                title={this.props.title}
                titleColor='white'
                style={styles.toolbar}
                navIcon={(this.props.leftButtonType == "menu") ? require('../../src/Assets/menu_white_24dp.png') 
                : require('../../src/Assets/back_white_24dp.png')}
                onIconClicked={(this.props.leftButtonType == "menu") ? () => console.log("menu icon selected") 
                : () => console.log("back icon selected")}
                onActionSelected={this.onActionSelected}
                actions={actionArray} />
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
});
