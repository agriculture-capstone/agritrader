import * as React from 'react';
import { Grid, Col, Card, CardItem } from 'native-base';
import StatisticsBlock from '../StatisticsBlock';

interface OwnPropsType {
  data: DataType[];
}

interface DataType {
  label: string;
  units: string;
  value: string;
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
  
  private generateMetrics()  {
    return this.props.data.map((item) => {
      return (
        <Col key={item.label}>
          <StatisticsBlock 
            units={item.units}
            value={item.value}
            label={item.label}
          />
        </Col>
      );
    });
  }
  /**
   * Render method for CardSummary
   */
  public render() {
    return (
      <Card>
        <CardItem>
          <Grid>
            {this.generateMetrics()}
          </Grid>

        </CardItem>
      </Card>
    );
  }
}
