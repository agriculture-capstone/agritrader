import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, Button, Input, Form, Item, Label } from 'native-base';
import * as moment from 'moment';

import { Farmer } from '../../../store/modules/farmer/types';
import { MilkEntry } from '../../../store/modules/milk/types';

import { Route } from '../../navigation/navigator';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';
import milkThunks from '../../../store/modules/milk/thunks';

import Styles from './style';

interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  createMilkEntry(newEntry: MilkEntry): void;
}

interface StorePropsType {
  farmer: Farmer;
}

/** AddEntry PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

interface OwnStateType {
  amountOfProduct: number;
  quality: string;
  costPerUnit: number;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * AddEntry page
 * @example 
 *             <AddEntry
 *             />
 */

class AddEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    /** Init state */
    this.state = {
      amountOfProduct: 0,
      quality: '0',
      costPerUnit: 0,
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
    
    let newEntry: MilkEntry = {
      datetime: timeNow,
      toPersonUuid: 'fakeToPersonUuid',
      fromPersonUuid: 'fakeFromPerosnUuid',
      amountOfProduct: this.state.amountOfProduct,
      costPerUnit: this.state.costPerUnit,
      currency: 'UGX',
      quality: this.state.quality,
    };
    this.props.createMilkEntry(newEntry);
    this.props.navigate(Route.MILK_ENTRY_DETAILS);
  }

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
      <Item floatingLabel>
        <Label>Amount (L)</Label>
        <Input />
      </Item>
      <Item floatingLabel>
        <Label>Quality</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Rate (UGX)</Label>
        <Input />
      </Item>
    </Form>
    );
  }

  /**
   * Render method for AddEntry
   */
  public render() {
    return(
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

const AddEntryPage = new Composer<PropsType>(AddEntry).page;

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
    createMilkEntry: (newEntry: MilkEntry) => dispatch(milkThunks.createMilkEntry(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEntryPage);
