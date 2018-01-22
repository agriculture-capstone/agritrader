import * as React from 'react';

import ViewFarmer from './viewFarmer';
import EditFarmer from './editFarmer';
import AddFarmer from './addFarmer';
import createPage from '../../../../generators/Page/index';

interface OwnStateType {
  mode?: string;
}

/**
 * Modes to determine how to render farmer information
 */
export const modes = {
  edit: 'edit',
  view: 'view',
};

/**
 * Container for application
 */
class FarmerInformation extends React.Component<{}, OwnStateType> {

  private initialProps: any;

  public static defaultProps = {
    mode: 'view',
  };

  constructor(props: any) {
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
    };

    this.changeMode.bind(this);
  }

  private changeMode = (newMode: string) => {
    this.setState(() => ({ mode: newMode }));
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    if (this.state.mode === modes.view) {
      return <ViewFarmer {...this.initialProps} modeHandler={this.changeMode} />;
    } else if (this.state.mode === modes.edit) {
      return <EditFarmer {...this.initialProps} modeHandler={this.changeMode} />;
    }
  }
}

export default createPage(FarmerInformation);
