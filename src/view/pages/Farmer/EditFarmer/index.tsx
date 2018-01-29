import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';
import * as moment from 'moment';

import { Farmer } from '../../../../store/modules/farmer/types';
import { Route } from '../../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../../hoc/PageComposer/FabPage/index';
import Composer from '../../../hoc/PageComposer/index';
import { State } from '../../../../store/types';

import farmerThunks from '../../../../store/modules/farmer/thunks';

import Styles from './style';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updateFarmer(newFarmer: Farmer): void;
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
  notes: string;
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
    // @TODO change time format to match core
    const timeNow = moment().local().utc().toString();

    let newFarmer: MilkEntry = {
      datetime: timeNow,
      toPersonUuid: 'fakeToPersonUuid',
      fromPersonUuid: 'fakeFromPerosnUuid',
      amountOfProduct: this.state.amountOfProduct,
      costPerUnit: this.state.costPerUnit,
      currency: 'UGX',
      quality: this.state.quality,
    };
    this.props.updateFarmer(newFarmer);
    this.props.navigate(Route.MILK_ENTRY_DETAILS);
  }

  /**
   * Handle entry changes, update local state
   */
  private onAmountChange = (newAmount: number) => this.setState(state => ({ amountOfProduct: newAmount }));
  private onQualityChange = (newQuality: string) => this.setState(state => ({ quality: newQuality }));
  private onRateChange = (newCostPerUnit: number) => this.setState(state => ({ costPerUnit: newCostPerUnit }));

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

  private renderHeader() {
    return (
      <Grid>
        <Row style={Styles.headerRow}>
          <H1>
            {this.props.farmer.firstName} {this.props.farmer.lastName}
          </H1>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take date only */}
            {this.props.milkEntry.datetime}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take time only */}
            {this.props.milkEntry.datetime} 
          </Text>
        </Row>
      </Grid>
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
        {this.formatEditRow('Amount (L)', this.props.milkEntry.amountOfProduct, this.onAmountChange)}
        {this.formatEditRow('Quality', this.props.milkEntry.quality, this.onQualityChange)}
        {this.formatEditRow('Rate (UGX)', this.props.milkEntry.costPerUnit, this.onRateChange)}
      </View>
    );
  }

  /**
   * Render method for EditFarmer
   */
  public render() {
    return(
      <Content padder style={{ backgroundColor: 'white' }}>
      <List>
        <ListItem>
          {this.renderHeader()}
        </ListItem>
      </List>
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
    // @TODO replace 'fakeFarmerUUID' with the active farmer uuid
    farmer: state.farmer.rows.find(r => r.uuid === 'fakeFarmerUUID'),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    goBack: () => dispatch(navActions.goBack()),
    updateFarmer: (newFarmer: Farmer) => dispatch(farmerThunks.updateFarmer(newFarmer)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditFarmerPage);
