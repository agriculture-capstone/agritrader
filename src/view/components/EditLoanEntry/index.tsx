import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { LoanEntry } from '../../../store/modules/loan/types';
import { Route } from '../../navigation/routes';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
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
  amountOfLoan: number;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EditLoanEntry
 */
class EditLoanEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      amountOfLoan: this.props.loanEntry.amount,
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
      amount: this.state.amountOfLoan,
      currency: 'UGX',
    };
    this.props.updateLoanEntry(newEntry);
    this.props.navigate(Route.FARMER);
  }

  /**
   * Handle entry changes, update local state
   */
  private onAmountChange = (newAmount: string) => this.setState(state => ({ amountOfLoan: parseFloat(newAmount) }));

  /**
   * Returns a button with text, color, and onPress callback specified
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
            {moment(this.props.loanEntry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').local().format('MMMM Do YYYY, h:mm:ss a')}
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
            <Input onChangeText={onChangeText} keyboardType={'numeric'}>
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
        {this.formatEditRow('Amount (UGX)', this.props.loanEntry.amount, this.onAmountChange)}
      </View>
    );
  }

  /** Render method for EditLoanEntry */
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
