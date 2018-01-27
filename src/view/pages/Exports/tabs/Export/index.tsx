import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import styles from '../../style';
// import Page from '../../../../lib/baseComponents/Page/index';

interface OwnPropsType {
  currentDayTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  exportValues: any[];
}
interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Container for Exports
 */
export default class Export extends React.Component<PropsType, OwnStateType> {
  // TODO need to connect this to the redux state
  /**
   * Render method for Exports
   */
  public render() {
    const testData = [{
      label: 'Today',
      value: this.props.currentDayTotal,
      units: 'L',
    },                {
      label: 'This Week',
      value: this.props.currentWeekTotal,
      units: 'L',
    },                {
      label: 'This Month',
      value: this.props.currentMonthTotal,
      units: 'L',
    },
    ];

    return (
      <Content style={styles.container}>
        <Grid style={styles.contents}>
          <Row>
            <CardSummary
              data={testData}
            />
          </Row>
          <Row>
            <ProductCard
              values={this.props.exportValues}
            />
          </Row>
        </Grid>
        <Row style={styles.addEntryButton}>
          <Col>
            <Button block info >
              <Text>
                ADD ENTRY
            </Text>
            </Button>
          </Col>
        </Row>
      </Content>
    );
  }
}
