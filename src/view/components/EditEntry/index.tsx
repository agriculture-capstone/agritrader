import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { Dairy as MilkEntry, PartialDairy } from '../../../store/modules/dairy/types';
import { Route } from '../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';

import dairyActions from '../../../store/modules/dairy/actions';

import Styles from './style';


interface OwnPropsType {
  farmer: Farmer;
  milkEntry: MilkEntry;
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updateDairy(newEntry: PartialDairy): void;
}

interface StorePropsType {
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditEntry PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

interface OwnStateType {
  volume: string;
  quality: string;
  costPerUnit: string;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EditEntry
 * @requires farmer
 * @requires milkEntry
 * 
 * @example 
 *          <EditEntry
 *          />
 */
class EditEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      volume: this.props.milkEntry.volume,
      quality: this.props.milkEntry.quality,
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
    let newEntry: PartialDairy = {
      uuid: this.props.milkEntry.uuid,
      volume: this.state.volume,
      quality: this.state.quality,
      costPerUnit: this.state.costPerUnit,
    };
    this.props.updateDairy(newEntry);
    this.props.navigate(Route.MILK_ENTRY_DETAILS);
  }

  /**
   * Handle entry changes, update local state
   */
  private onAmountChange = (newVolume: string) => this.setState(state => ({ volume: newVolume }));
  private onQualityChange = (newQuality: string) => this.setState(state => ({ quality: newQuality }));
  private onRateChange = (newCostPerUnit: string) => this.setState(state => ({ costPerUnit: newCostPerUnit }));

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

  private formatEditRow(label: string, value: string, onChangeText: any) {
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
        {this.formatEditRow('Amount (L)', this.props.milkEntry.volume, this.onAmountChange)}
        {this.formatEditRow('Quality', this.props.milkEntry.quality, this.onQualityChange)}
        {this.formatEditRow('Rate (UGX)', this.props.milkEntry.costPerUnit, this.onRateChange)}
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

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = () => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    goBack: () => dispatch(navActions.goBack()),
    updateDairy: (newEntry: PartialDairy) => dispatch(dairyActions.updateDairy(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEntryPage);
