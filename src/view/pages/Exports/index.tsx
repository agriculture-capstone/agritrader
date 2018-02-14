import * as React from 'react';
import { Grid, Row, Content } from 'native-base';
import CardSummary from '../../components/CardSummary';
import styles from './style';
import Composer from '../../hoc/PageComposer/index';
import { Route } from '../../navigation/navigator';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import { State } from '../../../store/types';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import activeRowsActions from '../../../store/modules/activeRows/actions';
import {
  getTodaysExportTotal,
  getFormattedExportTransactions,
} from '../../../store/modules/export/selectors';
import DataTable from '../../components/DataTable';
import { dateSort } from '../../../utils/DateSort';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  setActiveExportEntry(uuid: string): void;
  navigateToExportEntry(): void;
}

interface StorePropsType {
  currentDayTotal: string;
  exportValues: any[];
}

interface OwnStateType {
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

/**
 * Container for Exports
 */
class Export extends React.Component<PropsType, OwnStateType> {
  public constructor(constructorProps: PropsType) {
    super(constructorProps);
  }

  private onAddPress = () => this.props.navigate(Route.ADD_EXPORT_ENTRY);
  private onPressEntry = (uuid: string) => {
    return () => {
      this.props.setActiveExportEntry(uuid);
      this.props.navigateToExportEntry();
    };
  }

  /** React componentDidMount */
  public componentDidMount() {
    this.props.listenToFab(this.onAddPress);
  }

  /**
   * Render method for Exports
   */
  public render() {
    const dataSummary = [{
      label: 'Today',
      value: this.props.currentDayTotal,
      units: 'L',
    },
    ];

    return (
      <Content style={styles.container}>
        <Grid style={styles.contents}>
          <Row>
            <CardSummary
              data={dataSummary}
            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Plate #', 'Volume (L)']}
              values={dateSort.sortDescending(this.props.exportValues)}
              onPressEntry={this.onPressEntry}
            />
          </Row>
        </Grid>
      </Content>
    );
  }
}

const ExportPage = new Composer<NestedPropsType>(Export)
  .fab()
  .page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    currentDayTotal: getTodaysExportTotal(state),
    exportValues: getFormattedExportTransactions(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    setActiveExportEntry: (uuid: string) => dispatch(activeRowsActions.setActiveExportEntry(uuid)),
    navigateToExportEntry: () => dispatch(navActions.navigateTo(Route.EXPORT_ENTRY_DETAILS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportPage);
