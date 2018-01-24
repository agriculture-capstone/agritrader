import * as React from 'react';
import { Grid, Row, Col, Card, Text } from 'native-base';
import Panel from '../../../../components/Panel';
import StatisticsBlock from '../../../../components/StatisticsBlock';
import styles from './style';

interface OwnPropsType {
  title: string;
  currentWeekTotal: any;
  currentMonthTotal: any;
  allTimeTotal: any;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {

}

/**
 * Component for CardSummary
 */
export default class CardSummary extends React.Component<PropsType, OwnStateType> {
  /**
   * Render method for CardSummary
   */
  public render() {
    return (
      <Card>
        <Grid >
            <Col>
            <StatisticsBlock 
              label="This Week" 
              value={this.props.currentWeekTotal} 
              units="L" 
            />
            </Col>
            <Col>
            
            <StatisticsBlock 
              label="This Month" 
              value={this.props.currentMonthTotal} 
              units="L" />
              
            </Col>
            <Col>
            
            <StatisticsBlock 
              label="All-Time Total Amount" 
              value={this.props.allTimeTotal} 
              units="L"/>
            </Col>
          
        </Grid>
      </Card>
    );
  }
}
