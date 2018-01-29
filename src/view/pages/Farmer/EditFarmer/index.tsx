import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../../store/modules/farmer/types';
import { Route } from '../../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../../hoc/PageComposer/FabPage/index';
import Composer from '../../../hoc/PageComposer/index';
import { State, ThunkUpdateRow } from '../../../../store/types';

import farmerThunks from '../../../../store/modules/farmer/thunks';

import Styles from './style';
import { Alert } from 'react-native';

const fakeFarmer = {
  firstName: 'Moath',
  lastName: 'Faisal',
  phoneNumber: '403-401-4090',
  notes: 'my cool notes',
};

interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updateFarmer(newFarmer: ThunkUpdateRow<Farmer>): void;
}

interface StorePropsType {
  farmer: Farmer;
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditFarmer PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

interface OwnStateType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notes: string; // notes can be empty
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
    };
  }

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();
  
  /** Handle pressing save button */
  private onSavePress = () => {
    // let newFarmer: ThunkUpdateRow<Farmer> = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   phoneNumber: this.state.phoneNumber,
    //   notes: this.state.notes,
    // };
    // this.props.updateFarmer(newFarmer);
    Alert.alert('New farmer created');
    this.props.navigate(Route.FARMER);
  }

  /**
   * Handle farmer details changes, update local state
   */
  private onFirstNameChange = (newFirstName: string) => this.setState(state => ({ firstName: newFirstName }));
  private onLastNameChange = (newLastName: string) => this.setState(state => ({ lastName: newLastName }));
  private onPhoneChange = (newPhone: string) => this.setState(state => ({ phoneNumber: newPhone }));
  private onNotesChange = (newNotes: string) => this.setState(state => ({ phoneNumber: newNotes }));

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor, onPress: any) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    return (
      <Col style={Styles.button}>
        <Button block info={isInfo} primary={isPrimary} onPress={onPress}>
          <Text>{text}</Text>
        </Button>
      </Col>
    );
  }

  private formatEditRow(label: string, value: number | string, onChangeText: any) {
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
          <Item>
            <Input onChangeText={onChangeText}>
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
        {this.formatEditRow('First Name', this.props.farmer.firstName, this.onFirstNameChange)}
        {this.formatEditRow('Last Name', this.props.farmer.lastName, this.onLastNameChange)}
        {this.formatEditRow('Phone Number', this.props.farmer.phoneNumber, this.onPhoneChange)}
        {this.formatEditRow('Notes', this.props.farmer.notes, this.onNotesChange)}
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
  // @TODO replace 'fakeFarmerUUID' with the active farmer uuid
  const farmerRow = state.farmer.rows.find(r => r.uuid === 'fakeFarmerUUID');
  if (farmerRow === undefined) {
    throw new Error('Error: could not locate farmer: ' + 'fakeFarmerUUID');
  }
  return {
    farmer: farmerRow,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    goBack: () => dispatch(navActions.goBack()),
    updateFarmer: (newFarmer: ThunkUpdateRow<Farmer>) => dispatch(farmerThunks.updateFarmer(newFarmer)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditFarmerPage);
