import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { LoanEntry } from '../../../store/modules/loan/types';
import { Route } from '../../navigation/routes';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import tabActions from '../../../store/modules/tabs/actions';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import Composer from '../../hoc/PageComposer/index';
import { State, ThunkUpdateRow, StoreRow } from '../../../store/types';

import loanThunks from '../../../store/modules/loan/thunks';

import Styles from './style';
import { getActiveFarmer } from '../../../store/modules/farmer/selectors';
import { getActiveLoanEntry } from '../../../store/modules/loan/selectors';
import * as moment from 'moment';


interface OwnPropsType {
}

/** EditLoanEntry DispatchPropsType */
interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updateLoanEntry(newEntry: ThunkUpdateRow<LoanEntry>): void;
}

/** EditLoanEntry StorePropsType */
interface StorePropsType {
  farmer: Farmer;
  loanEntry: StoreRow<LoanEntry>;
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditLoanEntry PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

/** EditLoanEntry OwnStateType */
interface OwnStateType {
  loanAmount: number;
  validAmount: boolean;
}

/** Button color */
type ButtonColor = 'PRIMARY' | 'INFO';

/** Page for Edit Loan Entry */
class EditLoanEntry extends React.Component<PropsType, OwnStateType> {

  // Variable used to verify input
  private numbers = /^[0-9]+$/;
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loanAmount: this.props.loanEntry.amount,
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
    let newEntry: ThunkUpdateRow<LoanEntry> = {
      uuid: this.props.loanEntry.uuid,
      toPersonUuid: this.props.loanEntry.toPersonUuid,
      fromPersonUuid: this.props.loanEntry.fromPersonUuid,
      amount: this.state.loanAmount,
      currency: 'UGX',
    };
    this.props.updateLoanEntry(newEntry);
    this.props.navigate(Route.FARMER);
    tabActions.setActiveTab({ name: 'Loans' });
    
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
    const newAmountFloat = Number(newAmount);

    if (!newAmount.match(this.numbers) || newAmountFloat < 0) {
      this.setState(state => ({ validAmount: false }));
    } else {
      this.setState(state => ({ loanAmount: newAmountFloat, validAmount: true }));
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
            {moment(this.props.loanEntry.datetime).utc().format('MMMM Do YYYY, h:mm:ss a')}
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
        {this.formatEditRow('Amount (UGX)', this.props.loanEntry.amount, this.onChangeAmount)}
      </View>
    );
  }

  /** Render method for EditLoanEntry */
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

const EditLoanEntryPage = new Composer<NestedPropsType>(EditLoanEntry).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmer: getActiveFarmer(state),
    loanEntry: getActiveLoanEntry(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateToWithoutHistory(route)),
    goBack: () => dispatch(navActions.goBack()),
    updateLoanEntry: async (newEntry: ThunkUpdateRow<LoanEntry>) => dispatch(loanThunks.updateLoanEntry(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLoanEntryPage);
