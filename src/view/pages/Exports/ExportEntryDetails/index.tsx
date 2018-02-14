import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, Button } from 'native-base';

import { ExportEntry } from '../../../../store/modules/export/types';
import { Route } from '../../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../store/modules/nav/actions';
import Composer from '../../../hoc/PageComposer/index';
import { State } from '../../../../store/types';

import Styles from './style';
import { getActiveExportEntry } from '../../../../store/modules/export/selectors';
import * as moment from 'moment';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
}

interface StorePropsType {
  exportEntry: ExportEntry;
}

/** ExportEntryDetails PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

interface OwnStateType {
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for ExportEntryDetails
 * @requires farmer
 * @requires ExportEntry
 *
 * @example
 *          <ExportEntryDetails
 *          />
 */
class ExportEntryDetails extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  /** Create edit button */
  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  /** Handle pressing edit button */
  private onEditPress = () => this.props.navigate(Route.EDIT_EXPORT_ENTRY);

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
          <Text style={Styles.header}>
            {moment(this.props.exportEntry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').local().format('MMMM Do YYYY, h:mm:ss a')}
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
          {this.formatRow('Amount (L)', this.props.exportEntry.amountOfProduct)}
        </ListItem>
        <ListItem>
          {this.formatRow('Licence Plate', this.props.exportEntry.transportId)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for ExportEntryDetails
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

const ExportEntryDetailsPage = new Composer<PropsType>(ExportEntryDetails).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    exportEntry: getActiveExportEntry(state),
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
)(ExportEntryDetailsPage);
