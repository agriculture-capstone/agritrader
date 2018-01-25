import * as React from 'react';
import { Content, Text, Grid, Row, Col, H2, H3 } from 'native-base';

interface OwnPropsType {
  farmerFirstName: string;
  farmerLastName: string;
  // date: Date;
  amount: number;
  quality: number;
  rate: number;
  mode: PageMode;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Modes to determine how to render DetailsPage component
 */
type PageMode = 'details' | 'edit' | 'add';

/**
 * Component for DetailsPage
 * Modes: 'details' | 'edit' | 'add'
 */
export default class DetailsPage extends React.Component<PropsType, OwnStateType> {
  constructor(props: PropsType) {
    super(props);
  }

  private renderDetail() {
    return (
      <Grid>
        <Row>
          <H2>Name: </H2>
          <H3>{this.props.farmerFirstName} {this.props.farmerLastName}</H3>
        </Row>
        <Row>
          <H2>Date: </H2>
          {/* <H3>{this.props.date}</H3> */}
        </Row>
        <Row>
          <H2>Amount: </H2>
          <H3>{this.props.amount}</H3>
        </Row>
        <Row>
          <H2>Quality: </H2>
          <H3>{this.props.quality}</H3>
        </Row>
        <Row>
          <H2>Rate: </H2>
          <H3>{this.props.rate}</H3>
        </Row>
      </Grid>
    );
  }

  private renderEdit() {

  }

  private renderAdd() {

  }

  /**
   * Render method for DetailsPage
   */
  public render() {
    switch (this.props.mode) {
      case 'details': {
        return(
          <Content>
            {this.renderDetail}
          </Content>
        );
      }
      case 'edit': {
        return(
          <Content>
            {this.renderEdit}
          </Content>
        );
      } 
      case 'add': {
        return(
          <Content>
            {this.renderAdd}
          </Content>
        );
      }
    }
  }
}
