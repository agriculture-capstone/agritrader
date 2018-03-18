import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, Button, Input, Form, Item, Label } from 'native-base';
import * as moment from 'moment';

import { Farmer } from '../../../store/modules/farmer/types';
import { LoanEntry } from '../../../store/modules/loan/types';

import { Route } from '../../navigation/routes';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';
import loanThunks from '../../../store/modules/loan/thunks';

import Styles from './style';
import { getActiveFarmer } from '../../../store/modules/farmer/selectors';

interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  createLoanEntry(newEntry: LoanEntry): Promise<string>;
}

interface StorePropsType {
  farmer: Farmer;
  activeTrader: any;
  activeFarmer: any;
}

/** AddLoanEntry PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

interface OwnStateType {
  loanAmount: number;
  validAmount: boolean;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

let radix: number = 10;

/** AddLoanEntry page */

class AddLoanEntry extends React.Component<PropsType, OwnStateType> {

  private numbers = /^[0-9]+$/;
  constructor(props: PropsType) {
    super(props);
    /** Init state */
    this.state = {
      loanAmount: 0.0,
      validAmount: false,
    };
  }
  /** Get current datetime in specified format */
  private getDatetime = (format: string) => moment().format(format);

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();

  /** Handle pressing save button */
  private onSavePress = () => {
    // @TODO change time format to match core
    const timeNow = moment().local().utc().toString();

    /** Create a new Loan Entry */
    let newEntry: LoanEntry = {
      type: 'loan',
      datetime: timeNow,
      toPersonUuid: this.props.activeTrader,
      fromPersonUuid: this.props.activeFarmer,
      amount: this.state.loanAmount,
      currency: 'UGX',
    };
    this.props.createLoanEntry(newEntry);
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
      this.setState(state => ({ loanAmount: newAmountInt, validAmount: true }));
    }
  }

  /**
   * Returns a button with text, color, and onPress callback specified
   */
  private renderButton(text: string, color: ButtonColor, onPress: any) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    // Render the primary button and set onPress to save any loans
    // entered and navigate to the main farmer screen
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
        // Render the cancel button
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
            {this.getDatetime('dddd, MMMM DD, YYYY')}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {this.getDatetime('kk:mm')}
          </Text>
        </Row>
      </Grid>
    );
  }

  private renderFields() {
    return (
      <Form>
        <Item success={this.state.validAmount} error={!this.state.validAmount} floatingLabel>
          <Label>Amount (UGX)</Label>
          <Input onChangeText={this.onChangeAmount} keyboardType={'numeric'} />
        </Item>
      </Form>
    );
  }

  /**
   * Render method for AddLoanEntry
   */
  public render() {
    return (
      <Content padder style={Styles.content}>
        <List>
          <ListItem>
            {this.renderHeader()}
          </ListItem>
        </List>
        {this.renderFields()}
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

const AddLoanEntryPage = new Composer<PropsType>(AddLoanEntry).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmer: getActiveFarmer(state),
    activeTrader: state.activeRows.activeTraderUUID,
    activeFarmer: state.activeRows.activeFarmerUUID,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateToWithoutHistory(route)),
    goBack: () => dispatch(navActions.goBack()),
    createLoanEntry: async (newEntry: LoanEntry) => dispatch(loanThunks.createLoanEntry(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddLoanEntryPage);
