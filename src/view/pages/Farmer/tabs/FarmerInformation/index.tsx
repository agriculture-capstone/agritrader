import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker }
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import ViewFarmer from './viewFarmer';
import EditFarmer from './editFarmer';
import AddFarmer from './addFarmer';

import styles from './style';

interface OwnProps {
  mode?: string;
}

export interface OwnState {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerBusinessName: string;
  farmerNotes: string;
  selectedPaymentCycle: string;
  selectedPaymentMethod: string;
}


/**
 * Container for application
 */
export default class FarmerInformation extends React.Component<OwnProps, OwnState> {

  private static defaultProps = {
    mode: 'view',
  };

  constructor(props: OwnProps) {
    super(props);
    this.state = {
      farmerFirstName: 'Patrick',
      farmerLastName: 'Keenan',
      farmerPhoneNumber: '123-456-7890',
      farmerBusinessName: 'Farmer with coolest hat',
      farmerNotes: 'Doctor from village A',
      selectedPaymentCycle: 'Weekly',
      selectedPaymentMethod: 'Mobile',
    };
  }

  private updatePaymentCycle = (value: string) => {
    this.setState(() => ({ selectedPaymentCycle: value }));
  }

  private updatePaymentMethod = (value: string) => {
    this.setState(() => ({ selectedPaymentMethod: value }));
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    const page = 'view';

    if (page === modes.view) {
      return <ViewFarmer {...this.state} />;
    } else if (page === modes.add) {
      return <AddFarmer {...this.state} updatePaymentCycle={this.updatePaymentCycle} updatePaymentMethod={this.updatePaymentMethod} />;
    } else if (page === modes.edit) {
      return <EditFarmer {...this.state} />;
    }
  }
}

export const modes = {
  add: 'add',
  edit: 'edit',
  view: 'view',
};
