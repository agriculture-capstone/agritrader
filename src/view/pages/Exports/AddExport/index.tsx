import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, Button, Input, Form, Item, Label } from 'native-base';
import * as moment from 'moment';


import { Route } from '../../../navigation/navigator';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import Composer from '../../../hoc/PageComposer/index';
import { State } from '../../../../store/types';

import Styles from './style';
import { ExportEntry } from '../../../../store/modules/export/types';
import exportThunks from '../../../../store/modules/export/thunks';

interface OwnPropsType {
}

interface DispatchPropsType {
  createExportEntry(newEntry: ExportEntry): Promise<string>;
  navigate(route: Route): void;
  goBack(): void;
}

interface StorePropsType {
  activeTrader: any;
}

/** AddExportEntry PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

interface OwnStateType {
  amountOfProduct: number;
  plate: string;
  validAmount: boolean;
  validPlate: boolean;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

let radix: number = 10;

/**
 * AddExportEntry page
 * @example
 *             <AddExportEntry
 *             />
 */

class AddExportEntry extends React.Component<PropsType, OwnStateType> {
  
  private numbers = /^[0-9]+$/;
  constructor(props: PropsType) {
    super(props);
    /** Init state */
    this.state = {
      amountOfProduct: 0,
      plate: '',
      validAmount: false,
      validPlate: false,
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

    let newEntry: ExportEntry = {
      type: 'export',
      datetime: timeNow,
      fromPersonUuid: this.props.activeTrader,
      transportId: this.state.plate,
      amountOfProduct: this.state.amountOfProduct,
    };
    this.props.createExportEntry(newEntry);
    this.props.navigate(Route.EXPORTS);
  }

  /** Return validity of required fields */
  private allValid = () => (
    this.state.validAmount 
    && this.state.validPlate
  )

  private onChangeAmount = (newAmount: string) => {
    const newAmountInt = parseInt(newAmount, radix);

    if (!newAmount.match(this.numbers) || newAmountInt < 0) {
      this.setState(state => ({ validAmount: false }));
    } else {
      this.setState(state => ({ amountOfProduct: newAmountInt, validAmount: true }));
    }
  }

  private onChangePlate = (newPlate: string) => {
    if (newPlate.length < 1) {
      this.setState(state => ({ validPlate: false }));
    } else {
      this.setState(state => ({ plate : newPlate, validPlate: true }));
    }
  }

  /**
   * Returns a button with text, color, and onPress callback specified
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

  private renderHeader() {
    return (
      <Grid>
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
          <Label>Amount (L)</Label>
          <Input onChangeText={this.onChangeAmount} keyboardType={'numeric'} />
        </Item>
        <Item success={this.state.validPlate} error={!this.state.validPlate} floatingLabel>
          <Label>Licence Plate</Label>
          <Input onChangeText={this.onChangePlate}/>
        </Item>
      </Form>
    );
  }

  /**
   * Render method for AddExportEntry
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

const AddExportEntryPage = new Composer<PropsType>(AddExportEntry).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    activeTrader: state.activeRows.activeTraderUUID,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    createExportEntry: async (newEntry: ExportEntry) => dispatch(exportThunks.createExportEntry(newEntry)),
    navigate: (route: Route) => dispatch(navActions.navigateToWithoutHistory(route)),
    goBack: () => dispatch(navActions.goBack()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExportEntryPage);
