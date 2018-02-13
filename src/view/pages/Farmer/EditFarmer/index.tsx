import * as React from 'react';
import { Content, View, Text, Grid, Row, Col, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../../store/modules/farmer/types';
import { Route } from '../../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../../hoc/PageComposer/FabPage/index';
import Composer from '../../../hoc/PageComposer/index';
import { State, ThunkUpdateRow, StoreRow } from '../../../../store/types';
import farmerThunks from '../../../../store/modules/farmer/thunks';

import Styles from './style';
import { getActiveFarmer } from '../../../../store/modules/farmer/selectors';

interface OwnPropsType {
}

interface DispatchPropsType {
  navigateToFarmer(): void;
  goBack(): void;
  updateFarmer(newFarmer: ThunkUpdateRow<Farmer>): void;
}

interface StorePropsType {
  farmer: StoreRow<Farmer>;
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditFarmer PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

interface OwnStateType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notes: string; // notes can be empty
  validFirstName: boolean;
  validLastName: boolean;
  validPhoneNumber: boolean;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EditFarmer
 *
 * @example
 *          <EditFarmer
 *          />
 */
class EditFarmer extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      firstName: this.props.farmer.firstName,
      lastName: this.props.farmer.lastName,
      phoneNumber: this.props.farmer.phoneNumber,
      notes: this.props.farmer.notes,
      validFirstName: false,
      validLastName: false,
      validPhoneNumber: false,
    };
  }

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();

  /** Handle pressing save button */
  private onSavePress = () => {
    let newFarmer: ThunkUpdateRow<Farmer> = {
      uuid: this.props.farmer.uuid,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      notes: this.state.notes,
    };
    this.props.updateFarmer(newFarmer);
    this.props.navigateToFarmer();
  }

  private allValid = () => (
    this.state.validFirstName 
    && this.state.validLastName 
    && this.state.validPhoneNumber
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

  private onChangePhoneNumber = (newPhone: string) => { 
    if (!newPhone) {
      this.setState(state => ({ validPhoneNumber: false }));
    } else {
      this.setState(state => ({ phoneNumber: newPhone, validPhoneNumber: true }));
    }
  }

  private onNotesChange = (newNotes: string) => this.setState(state => ({ notes: newNotes }));

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor, onPress: any) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    if (isPrimary) {
      return (
        <Col style={Styles.button}>
          <Button disabled={!this.allValid()} block info={isInfo} primary={isPrimary} onPress={onPress}>
            <Text>{text}</Text>
          </Button>
        </Col>
      );
    } else {
      return (
        <Col style={Styles.button}>
          <Button block info={isInfo} primary={isPrimary} onPress={onPress}>
            <Text>{text}</Text>
          </Button>
        </Col>
      );
    }
  }

  private formatEditRow(label: string, 
                        value: number | string, 
                        onChangeText: any, 
                        isNumeric: boolean,
                        validField?: boolean) {
    if (isNumeric) {
      return (
        <Grid>
          <Row>
            <Col>
              <Text>{label}</Text>
            </Col>
            <Col>
            <Item success={validField} error={!validField}>
              <Input keyboardType={'numeric'} onChangeText={onChangeText}>
                <Text>{value}</Text>
              </Input>
            </Item>
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
          <Item success={validField} error={!validField}>
            <Input autoCapitalize="sentences" onChangeText={onChangeText}>
              <Text>{value}</Text>
            </Input>
          </Item>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderEditFields() {
    return (
      <View style={Styles.editView}>
        {this.formatEditRow('First Name', this.props.farmer.firstName, this.onChangeFirstName, false, this.state.validFirstName)}
        {this.formatEditRow('Last Name', this.props.farmer.lastName, this.onChangeLastName, false, this.state.validLastName)}
        {this.formatEditRow('Phone Number', this.props.farmer.phoneNumber, this.onChangePhoneNumber, true, this.state.validPhoneNumber)}
        {this.formatEditRow('Notes', this.props.farmer.notes, this.onNotesChange, false)}
      </View>
    );
  }

  /**
   * Render method for EditFarmer
   */
  public render() {
    return(
      <Content padder style={{ backgroundColor: 'white' }}>
      {this.renderEditFields()}
      <Grid>
        <Row style={Styles.buttonRow}>
          {this.renderCancelButton()}
          {this.renderSaveButton()}
        </Row>
      </Grid>
    </Content>
    );
  }
}

const EditFarmerPage = new Composer<NestedPropsType>(EditFarmer).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {

  return {
    farmer: getActiveFarmer(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigateToFarmer: () => dispatch(navActions.navigateToWithoutHistory(Route.FARMER)),
    goBack: () => dispatch(navActions.goBack()),
    updateFarmer: async (newFarmer: ThunkUpdateRow<Farmer>) => dispatch(farmerThunks.updateFarmer(newFarmer)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditFarmerPage);
