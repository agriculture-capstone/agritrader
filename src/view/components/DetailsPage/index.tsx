import * as React from 'react';
import { Text, Grid, Row, Col } from 'native-base';

interface OwnPropsType {
  farmerFirstName: string;
  farmerLastName: string;
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

  /**
   * Render method for DetailsPage
   */
  public render() {
    switch (this.props.mode) {
      case 'details': {
        return(
          <Text>Hi</Text>
        );
      }
      case 'edit': {
        return(
          <Text>Hi</Text>
        );
      } 
      case 'add': {
        return(
          <Text>Hi</Text>
        );
      }
    }
  }
}
