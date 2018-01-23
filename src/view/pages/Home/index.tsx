import * as React from 'react';
import { Grid, Row, Col, Content, Text } from 'native-base';
import { View } from 'react-native';
import CardButton from '../../components/CardButton';
import Panel from '../../components/Panel';
import StatisicsBlock from './components/StatisticsBlock';
import { Route } from '../../navigation/navigator';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { State } from '../../../store/types';
import navActions from '../../../store/modules/nav/actions';
import Composer from '../../hoc/PageComposer';
import styles from './style';

interface OwnPropsType { }

interface StorePropsType { }

interface DispatchPropsType {
  navigate(route: Route): void;
}

type HomePropsType = OwnPropsType & StorePropsType & DispatchPropsType;

/**
* Home Page Component
*/
class Home extends React.Component<HomePropsType, {}> {

  public constructor(props: HomePropsType) {
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
        <Panel title="Trader Joe" expandable={false}>
          <Grid>
            <Row>
              <Col><Text style={styles.label}> {'Friday, January 19, 2018'.toUpperCase()}</Text></Col>
            </Row>
            <Row>
              <StatisicsBlock value="1,175" units="L" label="Today" />
              <StatisicsBlock value="2,250" units="L" label="Average Daily" />

            </Row>
            <Row>
              <StatisicsBlock value="7.4M" units="UGX" label="All Farmers Balance" />
              <StatisicsBlock value="1.1M" units="UGX" label="Farmer Debts" />
            </Row>
          </Grid>
        </Panel>
        <View style={styles.menuButtons} >
          <CardButton title="Farmer Manager" iconName="people" iconColor="#383838" route={Route.SEARCH_FARMER} onPress={this.onCardPress} />
          <CardButton title="Exports" iconName="car" iconColor="#383838" route={Route.EXPORTS} onPress={this.onCardPress} />
          <CardButton title="Warehouse Products" iconName="cart" iconColor="#383838" route={Route.HOME} onPress={this.onCardPress} />
          <CardButton title="View Records" iconName="stats" iconColor="#383838" route={Route.HOME} onPress={this.onCardPress} />
        </View>
      </Content>
    );
  }
}

const HomePage = new Composer(Home).finalize;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = () => {
  return {};
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
