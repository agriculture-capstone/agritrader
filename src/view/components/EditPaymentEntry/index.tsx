import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { PaymentEntry } from '../../../store/modules/payment/types';
import { Route } from '../../navigation/routes';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import Composer from '../../hoc/PageComposer/index';
import { State, ThunkUpdateRow, StoreRow } from '../../../store/types';

import paymentThunks from '../../../store/modules/payment/thunks';

import Styles from './style';
import { getActiveFarmer } from '../../../store/modules/farmer/selectors';
import { getActivePaymentEntry } from '../../../store/modules/payment/selectors';
import * as moment from 'moment';

/** EditPaymentEntry OwnPropsType */
interface OwnPropsType {
}

/** EditPaymentEntry DispatchPropsType */
interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updatePaymentEntry(newEntry: ThunkUpdateRow<PaymentEntry>): void;
}

/** EditPaymentEntry StorePropsType */
interface StorePropsType {
  farmer: Farmer;
  paymentEntry: StoreRow<PaymentEntry>;
}

/** EditPaymentEntry NestedPropsType */
type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditPaymentEntry PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

/** EditPaymentEntry OwnStateType */
interface OwnStateType {
  paymentAmount: number;
  validAmount: boolean;
}

/** Button color */
type ButtonColor = 'PRIMARY' | 'INFO';

let radix: number = 10;

/** Page for EditPaymentEntry */
class EditPaymentEntry extends React.Component<PropsType, OwnStateType> {

  // Variable used to verify input
  private numbers = /^[0-9]+$/;
  constructor(props: PropsType) {
    super(props);
    this.state = {
      paymentAmount: this.props.paymentEntry.amount,
      // Set state to true initially as it will have a valid amount
      validAmount: true,
    };
  }

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();

  /** Handle pressing save button */
  private onSavePress = () => {
    let newEntry: ThunkUpdateRow<PaymentEntry> = {
      uuid: this.props.paymentEntry.uuid,
      toPersonUuid: this.props.paymentEntry.toPersonUuid,
      fromPersonUuid: this.props.paymentEntry.fromPersonUuid,
      amount: this.state.paymentAmount,
      currency: 'UGX',
    };
    this.props.updatePaymentEntry(newEntry);
    this.props.navigate(Route.FARMER);
  }

  /** Return validity of required fields */
  private allValid = () => (
    this.state.validAmount
  )

  /** 
   * Checks when the amount field has something in it 
   * and verifies that it is a are real and positive number
   */
  private onChangeAmount = (newAmount: string) => {
    const newAmountInt = parseInt(newAmount, radix);

    if (!newAmount.match(this.numbers) || newAmountInt < 0) {
      this.setState(state => ({ validAmount: false }));
    } else {
      this.setState(state => ({ paymentAmount: newAmountInt, validAmount: true }));
    }
  }

  /** Returns a button with text, color, and onPress callback specified */
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
            {moment(this.props.paymentEntry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').local().format('MMMM Do YYYY, h:mm:ss a')}
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
          <Item success={this.state.validAmount} error={!this.state.validAmount}>
            <Input onChangeText={this.onChangeAmount} keyboardType={'numeric'}>
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
        {this.formatEditRow('Amount (UGX)', this.props.paymentEntry.amount, this.onChangeAmount)}
      </View>
    );
  }

  /** Render method for EditPaymentEntry */
  public render() {
    return(
      <Content padder style={Styles.content}>
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

const EditPaymentEntryPage = new Composer<NestedPropsType>(EditPaymentEntry).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmer: getActiveFarmer(state),
    paymentEntry: getActivePaymentEntry(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateToWithoutHistory(route)),
    goBack: () => dispatch(navActions.goBack()),
    updatePaymentEntry: async (newEntry: ThunkUpdateRow<PaymentEntry>) => dispatch(paymentThunks.updatePaymentEntry(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPaymentEntryPage);
