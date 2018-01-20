import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker }
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import ViewFarmer from './viewFarmer';
import EditFarmer from './editFarmer';
import AddFarmer from './addFarmer';

import styles from './style';
import createPage from '../../../../generators/Page/index';

interface OwnState {
  mode?: string;
}

export interface OwnProps {
  // farmerFirstName: string;
  // farmerLastName: string;
  // farmerPhoneNumber: string;
  // farmerBusinessName: string;
  // farmerNotes: string;
  // selectedPaymentCycle: string;
  // selectedPaymentMethod: string;
  // modeHandler?: Function;
}

export const modes = {
  add: 'add',
  edit: 'edit',
  view: 'view',
};

/**
 * Container for application
 */
class FarmerInformation extends React.Component<OwnProps, OwnState> {

  private initialProps: any;

  public static defaultProps = {
    mode: 'view',
  };

  constructor(props: OwnProps) {
    super(props);
    this.state = { 
      mode: 'view',
    };
    
    this.initialProps = {
      farmerFirstName: 'Patrick',
      farmerLastName: 'Keenan',
      farmerPhoneNumber: '123-456-7890',
      farmerBusinessName: 'Farmer with coolest hat',
      farmerNotes: 'Doctor from village A',
      selectedPaymentCycle: 'Weekly',
      selectedPaymentMethod: 'Mobile',
      // modeHandler:
    };

    this.changeMode.bind(this);
  }

  private changeMode = (newMode: string) => {
    this.setState(() => ({ mode: newMode }));
  }

  private updatePaymentCycle = (value: string) => {
    // this.setState(() => ({ selectedPaymentCycle: value }));
  }

  private updatePaymentMethod = (value: string) => {
    // this.setState(() => ({ selectedPaymentMethod: value }));
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    if (this.state.mode === modes.view) {
      return <ViewFarmer {...this.initialProps} modeHandler={this.changeMode} />;
    } else if (this.state.mode === modes.add) {
      return <AddFarmer {...this.initialProps} modeHandler={this.changeMode} updatePaymentCycle={this.updatePaymentCycle} updatePaymentMethod={this.updatePaymentMethod} />;
    } else if (this.state.mode === modes.edit) {
      return <EditFarmer {...this.initialProps} modeHandler={this.changeMode} />;
    }
  }
}

export default createPage(FarmerInformation);
