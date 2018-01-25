import * as React from 'react';

import { Content, Grid, Row, Col, Form, Item, Input, Label, Button, Picker } from 'native-base';
import { Text } from 'react-native';

import styles from '../../styles';

interface OwnStateType {
}

interface OwnPropsType {
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

/**
 * Component for viewing farmer information
 */
class AddFarmer extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
    };
  }

  /**
   * Render method for adding a farmer
   */
  public render() {
    return (
      <Content>
        <Form>
          <Grid>
            <Row>
              <Col>
                <Item floatingLabel>
                  <Label>First Name</Label>
                  <Input />
                </Item>
              </Col>
              <Col>
                <Item floatingLabel>
                  <Label>Last Name</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
  
            <Row>
              <Col>
                <Item floatingLabel>
                  <Label>Phone Number</Label>
                  <Input keyboardType={'numeric'}/>
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item floatingLabel>
                  <Label>Notes</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row style={styles.farmerInfoButtonRow}>
              <Col style={styles.farmerInfoButtonCol}>
                <Button block success>
                  <Text style={styles.buttonText}>ADD</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Form>
      </Content>
    );
  }
}

export default AddFarmer;
