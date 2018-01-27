import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { Dairy as MilkEntry } from '../../../store/modules/dairy/types';
import { Route } from '../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';


import Styles from './style';

// @TODO delete this
const fakeValues = {
  firstName: 'Patrick',
  lastName: 'Kenaan',

  date: 'Friday, Jan 25, 2018',
  time: '9:35 pm',
  volume: '14',
  quality: '60',
  costPerUnit: '3.6',
};

interface values {
  farmer: Farmer;
  milkEntry: MilkEntry;
}

// @TODO uncomment props
interface OwnPropsType {
  // farmer: Farmer;
  // milkEntry: MilkEntry;
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
}

interface StorePropsType {
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditEntry PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

interface OwnStateType {
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
 *             <EditEntry
 *             />
 */
class EditEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  private onCancelPress = () => this.props.goBack();
  private onSavePress = () => this.props.navigate(Route.MILK_ENTRY_DETAILS);

  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

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
            {/* {this.props.farmer.firstName} {this.props.farmer.lastName} */}
            {fakeValues.firstName} {fakeValues.lastName}
          </H1>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take date only */}
            {/* {this.props.milkEntry.datetime} */}
            {fakeValues.date}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take time only */}
            {/* {this.props.milkEntry.datetime}  */}
            {fakeValues.time} 
          </Text>
        </Row>
      </Grid>
    );
  }

  private formatEditRow(label: string, value: string) {
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
          <Item>
            <Input>
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
        {/* {this.formatEditRow('Amount (L)', this.props.milkEntry.volume)} */}
        {/* {this.formatEditRow('Quality', this.props.milkEntry.quality)} */}
        {/* {this.formatEditRow('Rate (UGX)', this.props.milkEntry.costPerUnit)} */}
        {this.formatEditRow('Amount (L)', fakeValues.volume)}
        {this.formatEditRow('Quality', fakeValues.quality)}
        {this.formatEditRow('Rate (UGX)', fakeValues.costPerUnit)}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEntryPage);
