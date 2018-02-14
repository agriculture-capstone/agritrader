import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../components/CardSummary';
import ProductCard from './components/ProductCard';
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
    const testData = [{
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
              data={testData}
            />
          </Row>
          <Row>
            <ProductCard
              values={this.props.exportValues}
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
    // TODO uncomment the following line and remove the EXPORT nav after details are in place
    // navigateToExportEntry: () => dispatch(navActions.navigateTo(Route.EXPORT_ENTRY_DETAILS)),
    navigateToExportEntry: () => dispatch(navActions.navigateTo(Route.EXPORTS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportPage);
