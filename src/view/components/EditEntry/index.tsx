import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { MilkEntry } from '../../../store/modules/milk/types';
import { Route } from '../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import Composer from '../../hoc/PageComposer/index';
import { State, ThunkUpdateRow, StoreRow } from '../../../store/types';

import milkThunks from '../../../store/modules/milk/thunks';

import Styles from './style';
import { getActiveFarmer } from '../../../store/modules/farmer/selectors';
import { getActiveMilkEntry } from '../../../store/modules/milk/selectors';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updateMilkEntry(newEntry: ThunkUpdateRow<MilkEntry>): void;
}

interface StorePropsType {
  farmer: Farmer;
  milkEntry: StoreRow<MilkEntry>;
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditEntry PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

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
 * Page for EditEntry
 *
 * @example
 *          <EditEntry
 *          />
 */
class EditEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      amountOfProduct: this.props.milkEntry.amountOfProduct,
      quality: this.props.milkEntry.milkQuality,
      costPerUnit: this.props.milkEntry.costPerUnit,
    };
  }

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();

  /** Handle pressing save button */
  private onSavePress = () => {
    let newEntry: ThunkUpdateRow<MilkEntry> = {
      uuid: this.props.milkEntry.uuid,
      toPersonUuid: this.props.milkEntry.toPersonUuid,
      fromPersonUuid: this.props.milkEntry.fromPersonUuid,
      amountOfProduct: this.state.amountOfProduct,
      costPerUnit: this.state.costPerUnit,
      currency: 'UGX',
      milkQuality: this.state.quality,
    };
    this.props.updateMilkEntry(newEntry);
    this.props.navigate(Route.FARMER);
  }

  /**
   * Handle entry changes, update local state
   */
  private onAmountChange = (newAmount: number) => this.setState(state => ({ amountOfProduct: newAmount }));
  private onQualityChange = (newQuality: string) => this.setState(state => ({ quality: newQuality }));
  private onRateChange = (newCostPerUnit: number) => this.setState(state => ({ costPerUnit: newCostPerUnit }));

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
        {this.formatEditRow('Quality', this.props.milkEntry.milkQuality, this.onQualityChange)}
        {this.formatEditRow('Rate (UGX/L)', this.props.milkEntry.costPerUnit, this.onRateChange)}
      </View>
    );
  }

  /**
   * Render method for EditEntry
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

const EditEntryPage = new Composer<NestedPropsType>(EditEntry).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmer: getActiveFarmer(state),
    milkEntry: getActiveMilkEntry(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    goBack: () => dispatch(navActions.goBack()),
    updateMilkEntry: async (newEntry: ThunkUpdateRow<MilkEntry>) => dispatch(milkThunks.updateMilkEntry(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEntryPage);
