import * as React from 'react';

import { Content, Grid, Row, Col, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';

import styles from '../../styles';
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import { State } from '../../../../../store/types';
import { Farmer } from '../../../../../store/modules/farmer/types';
import farmerThunks from '../../../../../store/modules/farmer/thunks';
import Composer from '../../../../hoc/PageComposer/index';

interface OwnStateType {
}

interface OwnPropsType {
}

interface DispatchPropsType {
  createFarmer(farmer: Farmer): void;
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

    // Bindings
    this.onAddPress = this.onAddPress.bind(this);
  }

  private onAddPress() {

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
                <Button onPress={this.onAddPress} block success>
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

const AddFarmerPage = new Composer<PropsType>(AddFarmer)
  .page;

/************************* Redux ************************/

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmers: state.farmer.rows,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    createFarmer: (farmer: Farmer) => dispatch(farmerThunks.createFarmer(farmer)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFarmerPage);
