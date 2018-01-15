import * as React from 'react';
import { Container, Header, H1, H2, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

interface FarmerInformationPropsType {
  mode: string;
}

/**
 * Container for application
 */
export class FarmerInformation extends React.Component<FarmerInformationPropsType, {}> {
  
  public state = {
    selectedPaymentCycle: 'Weekly',
    selectedPaymentMethod: 'Mobile',
  };

  private updatePaymentCycle = (value: string) => {
    this.setState({ selectedPaymentCycle: value });
  }

  private updatePaymentMethod = (value: string) => {
    this.setState({ selectedPaymentMethod: value });
  }

  /**
   * Render method for Farmer
   */
  public render() {
    if (this.props.mode === modes.view) {
      return (
        <Container>
          <Content padder>
          <Grid>
            <Row style={styles.name}>
              <H1>Patrick Keenan</H1>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Phone Number</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>123-456-7890</H2>
            </Row>
            <Row style={styles.infoLabel}>
              <Col>
                <Label>Payment Cycle</Label>
              </Col> 
              <Col>
                <Label>Payment Method</Label>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Col>
                <H2>Weekly</H2>
              </Col> 
              <Col>
                <H2>Cash</H2>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Notes</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>Doctor from village A</H2>
            </Row>
          </Grid>
          </Content>
        </Container>
      );
    } else if (this.props.mode === modes.add) {
      return (
        <Container>
          <Content>
            <Form>
              <Grid>
                <Row>
                  <Col>
                      <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input />
                      </Item>
                  </Col>
                  <Col>
                      <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input />
                      </Item>
                  </Col>
                </Row>
  
                <Row>
                  <Col>
                      <Item floatingLabel>
                        <Label>Phone Number</Label>
                        <Input keyboardType={'numeric'}/>
                      </Item>
                  </Col>
                </Row>
  
                <Row>
                  <Col>
                      <Item floatingLabel>
                        <Label>Business Name</Label>
                        <Input />
                      </Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label style={{ color: 'black', paddingTop: 28, paddingLeft: 14 }}>Payment Cycle</Label>
                  </Col>
                  <Col>
                    <Picker
                      style={{ paddingTop: 77 }}
                      iosHeader="Select payment cycle"
                      mode="dropdown"
                      selectedValue={this.state.selectedPaymentCycle}
                      onValueChange={this.updatePaymentCycle}
                    >
                        <Picker.Item label="Weekly" value="Weekly" />
                        <Picker.Item label="Bi-Weekly" value="Bi-weekly" />
                        <Picker.Item label="Monthly" value="Monthly" />
                    </Picker>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label style={{ color: 'black', paddingTop: 28, paddingLeft: 14 }}>Payment Method</Label>
                  </Col>
                  <Col>
                    <Picker
                      style={{ paddingTop: 77 }}
                      iosHeader="Select payment method"
                      mode="dropdown"
                      selectedValue={this.state.selectedPaymentMethod}
                      onValueChange={this.updatePaymentMethod}
                    >
                        <Picker.Item label="Mobile" value="Mobile" />
                        <Picker.Item label="Cash" value="Cash" />
                    </Picker>
                  </Col>
                  </Row>
                <Row>
                  <Col>
                      <Item floatingLabel>
                        <Label>Notes</Label>
                        <Input />
                      </Item>
                  </Col>
                </Row>
                <Row style={{ paddingTop: 77 }}>
                <Col style={{ paddingLeft: 7 , paddingRight: 7 }}>
                    <Button block danger>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>CANCEL</Text>
                    </Button>
                  </Col>
                  <Col style={{ paddingLeft: 7 , paddingRight: 7 }}>
                    <Button block success>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>ADD</Text>
                    </Button>
                  </Col>
                  </Row>
              </Grid> 
            </Form>
          </Content>
          </Container>
      );
    } else if (this.props.mode === modes.edit) {
      return (
        <Container>
          <Content padder>
          <Grid>
            <Row style={styles.name}>
              <H1>Patrick Keenan</H1>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Phone Number</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>123-456-7890</H2>
            </Row>
            <Row style={styles.infoLabel}>
              <Col>
                <Label>Payment Cycle</Label>
              </Col> 
              <Col>
                <Label>Payment Method</Label>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Col>
                <H2>Weekly</H2>
              </Col> 
              <Col>
                <H2>Cash</H2>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Notes</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>Doctor from village A</H2>
            </Row>
          </Grid>
          </Content>
        </Container>
      );
    }
  }
}

export const modes = {
  add: 'add',
  edit: 'edit',
  view: 'view',
};

const styles = StyleSheet.create({
  name: {
    alignSelf: 'center',
    paddingTop: 14,
    paddingBottom: 14,
  },
  infoLabel: {
    paddingLeft: 21,
    paddingTop: 14,
  },
});
