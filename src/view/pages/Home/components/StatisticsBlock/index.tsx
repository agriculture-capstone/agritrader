import * as React from 'react';
import { Col, Text } from 'native-base';
import styles from './style';

interface OwnPropsType {
  value: string,
  units: string,
  label: string,
  valueColor?: string,
}

interface DispatchPropsType {
}

interface StorePropsType {
}
 
type PropsType = OwnPropsType & DispatchPropsType & StorePropsType; 

interface OwnStateType {
}

/**
* StatisticsBlock Component
*/
export default class StatisticsBlock extends React.Component<PropsType, OwnStateType> {
  /**
  * Render method for Statistics Block
  */
  public render() {
    return (
      <Col style={styles.content}>
        <Text style={[styles.stats, styles.value, { color: this.props.valueColor ? this.props.valueColor : "black" }]}>
          {this.props.value}
          <Text style={[styles.stats, styles.unit, { color: this.props.valueColor ? this.props.valueColor : "black" }]}> 
            {this.props.units}
          </Text>
        </Text>
        <Text style={[styles.stats, styles.label]}>
          {this.props.label.toUpperCase()}
        </Text>
      </Col>
    );
  }
}
