import * as React from 'react';
import { Text, Card, Body, CardItem, Icon, Right, Left } from 'native-base';
import { Route } from '../../navigation/navigator';
import styles from './style';

interface CardButtonPropsType {
  title: string;
  iconName: string;
  iconColor: string;
  route: Route;
  onPress(route: Route): void;
}

/**
* Card Button Component
*/
export default class CardButton extends React.Component<CardButtonPropsType, {}> {
  public constructor(props: CardButtonPropsType) {
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
    const iconColor = {
      color: this.props.iconColor,
    };

    return (
      <Card>
        <CardItem button onPress={this.onPress}>
          <Left>
            <Icon
              style={[styles.icon, iconColor]}
              name={this.props.iconName}
            />
            <Body>
              <Text>
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
