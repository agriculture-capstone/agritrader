import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Text, Grid, Row, Col } from 'native-base';


/**
* Container for application
*/
export default class DataTable extends React.Component<{}, {}> {
  /**
  * Render method for DataTable
  */
  public render() {
    return (
      <List>
        <ListItem itemHeader first>
          <Grid>
            <Col>
              <Text>Date</Text>
            </Col>
            <Col>
              <Text>AM</Text>
            </Col>
            <Col>
              <Text>PM</Text>
            </Col>
          </Grid>

        </ListItem>
        <ListItem >
        <Grid>
            <Col>
              <Text>Oct 10</Text>
            </Col>
            <Col>
              <Text>8.2</Text>
            </Col>
            <Col>
              <Text>6.5</Text>
            </Col>
          </Grid>
        </ListItem>
        <ListItem >
        <Grid>
            <Col>
              <Text>Oct 10</Text>
            </Col>
            <Col>
              <Text>8.2</Text>
            </Col>
            <Col>
              <Text>6.5</Text>
            </Col>
          </Grid>
        </ListItem>
        
        <ListItem >
        <Grid>
            <Col>
              <Text>Oct 10</Text>
            </Col>
            <Col>
              <Text>8.2</Text>
            </Col>
            <Col>
              <Text>6.5</Text>
            </Col>
          </Grid>
        </ListItem>
        
        <ListItem >
        <Grid>
            <Col>
              <Text>Oct 10</Text>
            </Col>
            <Col>
              <Text>8.2</Text>
            </Col>
            <Col>
              <Text>6.5</Text>
            </Col>
          </Grid>
        </ListItem>
        
      </List>
    );
  }
}
