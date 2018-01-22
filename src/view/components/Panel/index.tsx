import * as React from 'react';
import { Icon } from 'native-base';
import { Text, View, Animated, LayoutChangeEvent, TouchableWithoutFeedback } from 'react-native';
import styles from './style';

interface OwnStateType {
  expanded: boolean;
  animation: Animated.Value;
  maxHeight: number;
  minHeight: number;
  arrowHeight: number;
}

interface OwnPropsType {
  title: string;
  expandable: boolean;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

/**
* Panel component
* Followed this as a guide: 
* https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/
*/
class Panel extends React.Component<PropsType, OwnStateType> {
  constructor(props: OwnPropsType) {
    super(props);

    this.state = {
      expanded: true,
      animation: new Animated.Value(0),
      maxHeight: 0,
      minHeight: 0,
      arrowHeight: 0,
    };

    this.setMinHeight = this.setMinHeight.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this);
    this.setArrowHeight = this.setArrowHeight.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  private calculateHeight(state: OwnStateType, expanded: boolean) {
    if (expanded) {
      return state.maxHeight + state.minHeight + state.arrowHeight;
    } else {
      return state.minHeight + state.arrowHeight;
    }
  }

  private toggle() {
    const initialValue = this.calculateHeight(this.state, this.state.expanded);
    const finalValue = this.calculateHeight(this.state, !this.state.expanded);

    this.state.animation.setValue(initialValue);

    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue,
      },
    ).start();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  /**
  * componentDidMount
  */
  public componentDidMount() {
    // Initialize Animated.Value once the component was first mounted
    const initialValue = this.calculateHeight(this.state, this.state.expanded);
    this.setState({ animation: new Animated.Value(initialValue) });
  }

  private setMaxHeight(event: LayoutChangeEvent) {
    if (this.state.expanded) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
      });
    }
  }

  private setMinHeight(event: LayoutChangeEvent) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  private setArrowHeight(event: LayoutChangeEvent) {
    this.setState({
      arrowHeight: event.nativeEvent.layout.height,
    });
  }

  /**
  * render
  */
  public render() {
    let icon = <Icon name="ios-arrow-down" />;

    if (this.state.expanded) {
      icon = <Icon name="ios-arrow-up" />;
    }

    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <View
          style={styles.titleContainer}
          onLayout={this.setMinHeight}
        >
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        <View
          style={[styles.body, this.state.expanded ? styles.show : styles.hide]}
          onLayout={this.setMaxHeight}
        >
          {this.props.children}
        </View>
        <TouchableWithoutFeedback
          style={this.props.expandable ? styles.button : styles.hiddenButton}
          onPress={this.toggle}
          onLayout={this.setArrowHeight}
        >
          {icon}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

export default Panel;
