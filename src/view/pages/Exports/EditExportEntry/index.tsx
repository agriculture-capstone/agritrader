import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { ExportEntry } from '../../../../store/modules/export/types';
import { Route } from '../../../navigation/navigator';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../../hoc/PageComposer/FabPage/index';
import Composer from '../../../hoc/PageComposer/index';
import { State, ThunkUpdateRow, StoreRow } from '../../../../store/types';
import milkThunks from '../../../../store/modules/milk/thunks';
import { getActiveExportEntry } from '../../../../store/modules/export/selectors';
import * as moment from 'moment';

import Styles from './style';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
  updateExportEntry(newEntry: ThunkUpdateRow<ExportEntry>): void;
}

interface StorePropsType {
  exportEntry: StoreRow<ExportEntry>;
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EditEntry PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

interface OwnStateType {
  amountOfProduct: number;
  licencePlate: string;
  validAmount: boolean;
  validPlate: boolean;
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EditEntry
 */
class EditEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      amountOfProduct: this.props.exportEntry.amountOfProduct,
      licencePlate: this.props.exportEntry.transportId,
      validAmount: false,
      validPlate: false,
    };
  }

  /** Create page buttons */
  private renderCancelButton = () => this.renderButton('Cancel', 'INFO', this.onCancelPress);
  private renderSaveButton = () => this.renderButton('Save', 'PRIMARY', this.onSavePress);

  /** Handle pressing cancel button */
  private onCancelPress = () => this.props.goBack();

  /** Handle pressing save button */
  private onSavePress = () => {
    let newEntry: ThunkUpdateRow<ExportEntry> = {
      uuid: this.props.exportEntry.uuid,
      transportId: this.state.licencePlate,
      amountOfProduct: this.state.amountOfProduct,
    };
    this.props.updateExportEntry(newEntry);
    this.props.navigate(Route.EXPORTS);
  }

  /**
   * Handle entry changes, update local state
   */
  private onAmountChange = (newAmount: string) => this.setState(state => ({ amountOfProduct: parseFloat(newAmount) }));
  private onQualityChange = (newQuality: string) => this.setState(state => ({ quality: newQuality }));
  private onRateChange = (newCostPerUnit: string) => this.setState(state => ({ costPerUnit: parseFloat(newCostPerUnit) }));

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
            {moment(this.props.exportEntry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').local().format('MMMM Do YYYY, h:mm:ss a')}
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
        {this.formatEditRow('Amount (L)', this.props.exportEntry.amountOfProduct, this.onAmountChange)}
        {this.formatEditRow('Quality', this.props.exportEntry.milkQuality, this.onQualityChange)}
        {this.formatEditRow('Rate (UGX/L)', this.props.exportEntry.costPerUnit, this.onRateChange)}
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
    ExportEntry: getActiveExportEntry(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateToWithoutHistory(route)),
    goBack: () => dispatch(navActions.goBack()),
    updateExportEntry: async (newEntry: ThunkUpdateRow<ExportEntry>) => dispatch(milkThunks.updateExportEntry(newEntry)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEntryPage);
