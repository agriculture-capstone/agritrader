import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import styles from '../../style';
import Composer from '../../../../hoc/PageComposer/index';
import { Route } from '../../../../navigation/navigator';
import { InjectedFabProps } from '../../../../hoc/PageComposer/FabPage/index';
import { State } from '../../../../../store/types';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../../store/modules/nav/actions';


interface OwnPropsType {
  currentDayTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  exportValues: any[];
}

interface DispatchPropsType {
  // navigate(route: Route): void;
  // setActiveExportEntry(uuid: string): void;
  // navigateToExportEntry(): void;
}

interface StorePropsType {
  // currentDayTotal: string;
  // currentWeekTotal: string;
  // currentMonthTotal: string;
  // exportValues: any[];
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

  // private onAddPress = () => this.props.navigate(Route.ADD_EXPORT_ENTRY);
  private onPressEntry = (uuid: string) => {
    return () => {
      // this.props.setActiveExportEntry(uuid);
      // this.props.navigateToExportEntry();
    };
  }


  /** React componentDidMount */
  public componentDidMount() {
    // this.props.listenToFab(this.onAddPress);
  }

  /**
   * Render method for Exports
   */
  public render() {
    const testData = [{
      label: 'Today',
      value: this.props.currentDayTotal,
      units: 'L',
    },                {
      label: 'This Week',
      value: this.props.currentWeekTotal,
      units: 'L',
    },                {
      label: 'This Month',
      value: this.props.currentMonthTotal,
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
        <Row style={styles.addEntryButton}>
          <Col>
            <Button block info >
              <Text>
                ADD ENTRY
            </Text>
            </Button>
          </Col>
        </Row>
      </Content>
    );
  }
}

const ExportPage = new Composer<NestedPropsType>(Export)
  .fab()
  .page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    // TODO uncomment this after selectors are in place    
    // currentDayTotal: getCurrentDayTotal(state),
    // currentWeekTotal: getCurrentWeekTotal(state),
    // currentMonthTotal: getCurrentMonthTotal(state),
    // exportValues: getExportValues(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    // TODO uncomment this after selectors are in place
    // setActiveExportEntry: (uuid: string) => dispatch(activeRowsActions.setActiveExportEntry(uuid)),
    // navigateToExportEntry: () => dispatch(navActions.navigateTo(Route.EXPORT_ENTRY_DETAILS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportPage);
