import * as React from 'react';
import { Keyboard } from 'react-native';
import { Content, Grid, Row, Col, Form, Item, Input, Label, Button, Text } from 'native-base';
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
  navigateToFarmer(): void;
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
  validFirstName: boolean;
  validLastName: boolean;
  validPhoneNumber: boolean;
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
      validFirstName: false,
      validLastName: false,
      validPhoneNumber: false,
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
      middleName: '',
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      phoneArea: '',
      phoneCountry: '',
      notes: this.state.notes,
    };
    const uuid = await this.props.createFarmer(newFarmer);
    this.props.setActiveFarmer(uuid);
    this.props.navigateToFarmer();
    // Dismiss the keyboard manually here
    Keyboard.dismiss();
  }

  private allValid = () => (
    this.state.validFirstName 
    && this.state.validLastName 
    // && this.state.validPhoneNumber
  )
 
  /**
   * Handle farmer details changes, update local state
   */
  private onChangeFirstName = (newFirstName: string) => {
    if (!newFirstName) {
      this.setState(state => ({ validFirstName: false }));
    } else {
      this.setState(state => ({ firstName: newFirstName, validFirstName: true }));
    }
  } 

  private onChangeLastName = (newLastName: string) => { 
    if (!newLastName) {
      this.setState(state => ({ validLastName: false }));
    } else {
      this.setState(state => ({ lastName: newLastName, validLastName: true }));
    }
  }

  /**
   * @requires phone number to be all numeric and be 10 digits (optional)
   * 
   * @source: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
   * Valid phone formats:
   *    (123) 456-7890
   *    (123)456-7890
   *    123-456-7890
   *    123.456.7890
   *    1234567890
   *    +31636363634
   *    075-63546725
   */
  private onChangePhoneNumber = (newPhone: string) => { 
    // let numbers = /^[0-9]+$/;
    let numbers = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!newPhone || !newPhone.match(numbers)) {
      this.setState(state => ({ validPhoneNumber: false }));
    } else {
      this.setState(state => ({ phoneNumber: newPhone, validPhoneNumber: true }));
    }
  }

  private onChangeNotes = (newNotes: string) => this.setState(state => ({ notes: newNotes }));

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor, onPress: any) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    if (isPrimary) {
      return (
        <Col style={styles.button}>
          <Button disabled={!this.allValid()} block info={isInfo} primary={isPrimary} onPress={onPress}>
            <Text>{text}</Text>
          </Button>
        </Col>
      );
    } else {
      return (
        <Col style={styles.button}>
          <Button block info={isInfo} primary={isPrimary} onPress={onPress}>
            <Text>{text}</Text>
          </Button>
        </Col>
      );
    }
  }

  private renderFields() {
    return (
      <Form>
      <Item success={this.state.validFirstName} error={!this.state.validFirstName} floatingLabel>
        <Label>First Name</Label>
        <Input autoCapitalize="sentences" onChangeText={this.onChangeFirstName} />
      </Item>
      <Item success={this.state.validLastName} error={!this.state.validLastName} floatingLabel>
        <Label>Last Name</Label>
        <Input autoCapitalize="sentences" onChangeText={this.onChangeLastName} />
      </Item>
      <Item success={this.state.validPhoneNumber} error={!this.state.validPhoneNumber} floatingLabel>
        <Label>Phone Number</Label>
        <Input onChangeText={this.onChangePhoneNumber} keyboardType={'numeric'}/>
      </Item>
      <Item floatingLabel last>
        <Label>Notes</Label>
        <Input autoCapitalize="sentences" onChangeText={this.onChangeNotes} />
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
    navigateToFarmer: () => dispatch(navActions.navigateToWithoutHistory(Route.FARMER)),
    goBack: () => dispatch(navActions.goBack()),
    createFarmer: async (farmer: Farmer) => dispatch(farmerThunks.createFarmer(farmer)),
    setActiveFarmer: (uuid: string) => dispatch(activeRowsActions.setActiveFarmer(uuid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFarmerPage);
