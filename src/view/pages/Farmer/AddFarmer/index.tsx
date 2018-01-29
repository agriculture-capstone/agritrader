import * as React from 'react';

import { Content, Grid, Row, Col, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';

import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import { State } from '../../../../store/types';
import { Farmer } from '../../../../store/modules/farmer/types';
import farmerThunks from '../../../../store/modules/farmer/thunks';
import Composer from '../../../hoc/PageComposer/index';
import { Route } from '../../../navigation/navigator';

import styles from '../styles';

interface OwnPropsType {
}

interface DispatchPropsType {
  createFarmer(farmer: Farmer): void;
  goBack(): void;
  navigate(route: Route): void;
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notes: string;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Component for viewing farmer information
 */
class AddFarmer extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    /** Init state */
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      notes: '',
    };
  }

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderAddButton = () => this.renderButton('Add', 'PRIMARY', this.onAddPress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();

  /** Handle pressing add button */
  private onAddPress = () => { 
    let newFarmer: Farmer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      notes: this.state.notes,
    };
    this.props.createFarmer(newFarmer);
    this.props.navigate(Route.FARMER);
  }

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor, onPress: any) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    return (
      <Col style={styles.button}>
        <Button block info={isInfo} primary={isPrimary} onPress={onPress}>
          <Text>{text}</Text>
        </Button>
      </Col>
    );
  }

  private renderFields() {
    return (
      <Form>
      <Item floatingLabel>
        <Label>First Name</Label>
        <Input />
      </Item>
      <Item floatingLabel>
        <Label>Last Name</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Phone Number</Label>
        <Input keyboardType={'numeric'}/>
      </Item>
      <Item floatingLabel last>
        <Label>Notes</Label>
        <Input />
      </Item>
    </Form>
    );
  }
  
  /**
   * Render method for AddFarmer
   */
  public render() {
    return(
      <Content padder style={styles.content}>
        {this.renderFields()}
        <Grid>
          <Row style={styles.buttonRow}>
            {this.renderCancelButton()}
            {this.renderAddButton()}
          </Row>
        </Grid>
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
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    goBack: () => dispatch(navActions.goBack()),
    createFarmer: async (farmer: Farmer) => dispatch(farmerThunks.createFarmer(farmer)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFarmerPage);
