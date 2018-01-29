import * as React from 'react';

import { Content, Grid, Row, Col, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';

import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import activeRowsActions from '../../../../store/modules/activeRows/actions';
import { State } from '../../../../store/types';
import { Farmer } from '../../../../store/modules/farmer/types';
import farmerThunks from '../../../../store/modules/farmer/thunks';
import Composer from '../../../hoc/PageComposer/index';
import { Route } from '../../../navigation/navigator';

import styles from './style';

interface OwnPropsType {
}

interface DispatchPropsType {
  createFarmer(farmer: Farmer): Promise<string>;
  goBack(): void;
  navigate(route: Route): void;
  setActiveFarmer(uuid: string): void;
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
  private onAddPress = async () => {
    let newFarmer: Farmer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      notes: this.state.notes,
      phoneArea: '576',
      phoneCountry: '1',
      middleName: '',
    };
    const uuid = await this.props.createFarmer(newFarmer);
    this.props.setActiveFarmer(uuid);
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

  private onChangeFirstName = (firstName: string) => this.setState(state => ({ firstName }));
  private onChangeLastName = (lastName: string) => this.setState(state => ({ lastName }));
  private onChangePhoneNumber = (phoneNumber: string) => this.setState(state => ({ phoneNumber }));
  private onChangeNotes = (notes: string) => this.setState(state => ({ notes }));

  private renderFields() {
    return (
      <Form>
      <Item floatingLabel>
        <Label>First Name</Label>
        <Input onChangeText={this.onChangeFirstName} />
      </Item>
      <Item floatingLabel>
        <Label>Last Name</Label>
        <Input onChangeText={this.onChangeLastName} />
      </Item>
      <Item floatingLabel last>
        <Label>Phone Number</Label>
        <Input onChangeText={this.onChangePhoneNumber} keyboardType={'numeric'}/>
      </Item>
      <Item floatingLabel last>
        <Label>Notes</Label>
        <Input onChangeText={this.onChangeNotes} />
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
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    goBack: () => dispatch(navActions.goBack()),
    createFarmer: async (farmer: Farmer) => dispatch(farmerThunks.createFarmer(farmer)),
    setActiveFarmer: (uuid: string) => dispatch(activeRowsActions.setActiveFarmer(uuid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFarmerPage);
