import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, Button } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { MilkEntry } from '../../../store/modules/milk/types';
import { Route } from '../../navigation/routes';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';

import Styles from './style';
import { getActiveFarmer } from '../../../store/modules/farmer/selectors';
import { getActiveMilkEntry } from '../../../store/modules/milk/selectors';
import * as moment from 'moment';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
}

interface StorePropsType {
  farmer: Farmer;
  milkEntry: MilkEntry;
}

/** EntryDetails PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

interface OwnStateType {
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EntryDetails
 * @requires farmer
 * @requires milkEntry
 *
 * @example
 *          <EntryDetails
 *          />
 */
class MilkEntryDetails extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  /** Create edit button */
  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  /** Handle pressing edit button */
  private onEditPress = () => this.props.navigate(Route.EDIT_MILK_ENTRY);

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
            {moment(this.props.milkEntry.datetime).utc().format('MMMM Do YYYY, h:mm:ss a')}
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
          {this.formatRow('Amount (L)', this.props.milkEntry.amountOfProduct)}
        </ListItem>
        <ListItem>
          {this.formatRow('Lactometer', this.props.milkEntry.milkQuality)}
        </ListItem>
        <ListItem>
          {this.formatRow('Rate (UGX/L)', this.props.milkEntry.costPerUnit)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for EntryDetails
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

const MilkEntryDetailsPage = new Composer<PropsType>(MilkEntryDetails).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmer: getActiveFarmer(state),
    milkEntry: getActiveMilkEntry(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MilkEntryDetailsPage);
