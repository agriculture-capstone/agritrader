import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, Button } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { PaymentEntry } from '../../../store/modules/payment/types';
import { Route } from '../../navigation/routes';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';

import Styles from './style';
import { getActiveFarmer } from '../../../store/modules/farmer/selectors';
import { getActivePaymentEntry } from '../../../store/modules/payment/selectors';
import * as moment from 'moment';

/** PaymentEntryDetails OwnPropsType */
interface OwnPropsType {
}

/** PaymentEntryDetails DispatchPropsType */
interface DispatchPropsType {
  navigate(route: Route): void;
}

/** PaymentEntryDetails StorePropsType */
interface StorePropsType {
  farmer: Farmer;
  paymentEntry: PaymentEntry;
}

/** PaymentEntryDetails PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** PaymentEntryDetails OwnStateType */
interface OwnStateType {
}

/** Button color */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for PaymentEntryDetails
 * @requires farmer
 * @requires paymentEntry
 *
 */
class PaymentEntryDetails extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  /** Create edit button */
  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  /** Handle pressing edit button */
  private onEditPress = () => this.props.navigate(Route.EDIT_PAYMENT_ENTRY);

  /**
   * Returns a button with text, color, and onPress callback specified
   */
  private renderButton(text: string, color: ButtonColor) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    return (
      <Col style={Styles.button}>
        <Button block info={isInfo} primary={isPrimary} onPress={this.onEditPress}>
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
            {moment(this.props.paymentEntry.datetime).utc().format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Row>
      </Grid>
    );
  }

  private formatRow(label: string, value: string | number) {
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
            <Text>{value}</Text>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderDetailFields() {
    return (
      <List>
        <ListItem>
          {this.formatRow('Amount (UGX)', this.props.paymentEntry.amount)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for PaymentEntryDetails
   */
  public render() {
    return(
      <Content padder style={Styles.content}>
        {this.renderHeader()}
      <Grid>
        {this.renderDetailFields()}
        <Row style={Styles.buttonRow}>
          {this.renderEditButton()}
        </Row>
      </Grid>
    </Content>
    );
  }
}

const PaymentEntryDetailsPage = new Composer<PropsType>(PaymentEntryDetails).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmer: getActiveFarmer(state),
    paymentEntry: getActivePaymentEntry(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateToWithoutHistory(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentEntryDetailsPage);
