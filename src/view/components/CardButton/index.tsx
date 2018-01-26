import * as React from 'react';
import { Text, Card, Body, CardItem, Icon, Right, Left } from 'native-base';
import { Route } from '../../navigation/navigator';
import styles from './style';

interface OwnPropsType {
  title: string;
  iconName: string;
  iconColor: string;
  route: Route;
  onPress(route: Route): void;
}

interface DispatchPropsType {

}

interface StorePropsType {

}
 
type PropsType = OwnPropsType & DispatchPropsType & StorePropsType; 

interface OwnStateType {

}

/**
* Card Button Component
*/
export default class CardButton extends React.Component<PropsType, OwnStateType> {
  public constructor(props: PropsType) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  private onPress() {
    this.props.onPress(this.props.route);
  }

  /**
   * Render method 
   */
  public render() {
    return (
      <Card>
        <CardItem button onPress={this.onPress}>
          <Left>
            <Icon
              style={[
                styles.icon, 
                this.props.iconColor ? 
                  {color: this.props.iconColor} : styles.iconColor
                ]}
              name={this.props.iconName}
            />
            <Body>
              <Text style={styles.title}>
                {this.props.title}
              </Text>
            </Body>
          </Left>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </CardItem>
      </Card>
    );
  }
}
