import * as React from 'react';
import { Grid, Row, Col, Content, Text, Card, CardItem, Body } from 'native-base';
import { View } from 'react-native';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import CardButton from '../../components/CardButton';
import Panel from '../../components/Panel';
import StatisicsBlock from '../../components/StatisticsBlock';
import { Route } from '../../navigation/routes';
import { State } from '../../../store/types';
import navActions from '../../../store/modules/nav/actions';
import { getAvgDaysMilkTotal, getDaysMilkTotal } from '../../../store/modules/milk/selectors';
import Composer from '../../hoc/PageComposer';
import styles from './style';
import * as moment from 'moment';


interface OwnPropsType { }

interface StorePropsType {
  dayTotal: string;
  avgDayTotal: string;
}

interface DispatchPropsType {
  navigate(route: Route): void;
}

type PropsType = OwnPropsType & StorePropsType & DispatchPropsType;

/**
* Home Page Component
*/
class Home extends React.Component<PropsType, {}> {

  public constructor(props: PropsType) {
    super(props);
    this.onCardPress = this.onCardPress.bind(this);
  }

  private onCardPress(route: Route) {
    this.props.navigate(route);
  }
  /**
  * Render method for Home page
  */
  public render() {
    return (
      <Content>
        <View style={styles.menuButtons} >
        <Card style={styles.betaNotice}>
          <CardItem style={styles.betaNotice}>
            <Body >
          <Text style={[styles.betaContents, styles.betaTitle]}>
            Welcome to the Beta Version of Agritrader!
          </Text>
          </Body>
          </CardItem>
          </Card>
        <Panel title="Quality Milk" expandable={false}>
          <Grid>
            <Row>
              <Col><Text style={styles.label}> {moment().local().format('dddd, MMMM DD, YYYY').toUpperCase()}</Text></Col>
            </Row>
            <Row>
              <StatisicsBlock value={this.props.dayTotal} units="L" label="Today" />
              <StatisicsBlock value={this.props.avgDayTotal} units="L" label="Average Daily" />
            </Row>
          </Grid>
        </Panel>
          <CardButton title="Farmers" iconName="people" iconColor="#383838" route={Route.SEARCH_FARMER} onPress={this.onCardPress} />
          <CardButton title="Deliveries" iconName="car" iconColor="#383838" route={Route.EXPORTS} onPress={this.onCardPress} />
          <CardButton title="Warehouse Products" iconName="cart" iconColor="#383838" route={Route.HOME} onPress={this.onCardPress} />
          <CardButton title="View Records" iconName="stats" iconColor="#383838" route={Route.HOME} onPress={this.onCardPress} />
        </View>
      </Content>
    );
  }
}

const HomePage = new Composer<PropsType>(Home).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    dayTotal: getDaysMilkTotal(state),
    avgDayTotal: getAvgDaysMilkTotal(state),
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
)(HomePage);
