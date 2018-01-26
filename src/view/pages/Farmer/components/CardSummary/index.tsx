import * as React from 'react';
import { Grid, Col, Card, CardItem } from 'native-base';
import StatisticsBlock from '../../../../components/StatisticsBlock';

interface OwnPropsType {
  title: string;
  currentWeekTotal: any;
  currentMonthTotal: any;
  currentDayTotal: any;
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
        <CardItem>
        <Grid >
          <Col>
            <StatisticsBlock
              label="Today"
              value={this.props.currentDayTotal}
              units="L" />
          </Col>
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


        </Grid>
        </CardItem>
      </Card>
    );
  }
}
