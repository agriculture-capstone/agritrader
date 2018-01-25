import * as React from 'react';
import { Grid, Row, Col, Content, Text, Card, CardItem, Body } from 'native-base';
import { View } from 'react-native';
import CardButton from '../../components/CardButton';
import Panel from '../../components/Panel';
import StatisicsBlock from '../../components/StatisticsBlock';
import { Route } from '../../navigation/navigator';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { State } from '../../../store/types';
import navActions from '../../../store/modules/nav/actions';
import createPage from '../../generators/Page/index';
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
        <View style={styles.menuButtons} >
        <Card style={styles.betaNotice}>
          <CardItem style={styles.betaNotice}>
            <Body >
          <Text style={[styles.betaContents, styles.betaTitle]}>
            Welcome to the Beta Version of Agritrader!
          </Text>
          <Text style={styles.betaContents}>
            This application is continuously being developed to provide users 
            like you with rich features to ease your workflow. 
          </Text>
          </Body>
          </CardItem>
          </Card>
        <Panel title="Quality Milk" expandable={false}>
          <Grid>
            <Row>
              <Col><Text style={styles.label}> {'Friday, January 19, 2018'.toUpperCase()}</Text></Col>
            </Row>
            <Row>
              <StatisicsBlock value="1,175" units="L" label="Today" />
              <StatisicsBlock value="2,250" units="L" label="Average Daily" />

            </Row>
          </Grid>
        </Panel>
          <CardButton title="Farmers" iconName="people" iconColor="#383838" route={Route.SEARCH_FARMER} onPress={this.onCardPress} />
          <CardButton title="Exports" iconName="car" iconColor="#383838" route={Route.EXPORTS} onPress={this.onCardPress} />
          <CardButton title="Warehouse Products" iconName="cart" iconColor="#383838" route={Route.HOME} onPress={this.onCardPress} />
          <CardButton title="View Records" iconName="stats" iconColor="#383838" route={Route.HOME} onPress={this.onCardPress} />
        </View>
      </Content>
    );
  }
}

const HomePage = createPage<HomePropsType>(Home);

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
