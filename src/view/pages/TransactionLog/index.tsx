import * as React from 'react';
import Composer from '../../hoc/PageComposer';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import ProductCard from './components/ProductCard';
import styles from './style';

const fakeData = [{ date: 'Jan 18 17:31', plate:'BRI8932', vol: 10 }];

/**
 * Container for TransactionLog
 */
export class TransactionLog extends React.Component<{}, {}> {

  /**
   * Render method for TransactionLog
   */
  public render() {
    return (
      <Content style={styles.container}>
        <Grid style={styles.contents}>
          <Row>
            <ProductCard
              values={fakeData}
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

export default new Composer<{}>(TransactionLog)
  .comingSoon()
  .page;
