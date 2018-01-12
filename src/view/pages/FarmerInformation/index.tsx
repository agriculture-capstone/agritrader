import * as React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Radio, Right, ListItem, InputGroup, Picker } from 'native-base';
import { View, Text } from 'react-native';

/**
 * Container for application
 */
export default class FarmerInformation extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input />
            </Item>
            
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input />
            </Item>
            
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input />
            </Item>

            <Item>
              <Label>Payment Method</Label>
            </Item>
            <ListItem>
                  <Text>Mobile</Text>
                  <Right>
                    <Radio selected={false} />
                  </Right>
                </ListItem>
                <ListItem>
                  <Text>Cash</Text>
                  <Right>
                    <Radio selected={true} />
                  </Right>
            </ListItem>
              
            <Item>
              <Label>Payment Cycle</Label>
            </Item>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={() => {}}
              onValueChange={() => {}}
            >
              <Item label="Weekly" value="key0" />
              <Item label="Bi-Weekly" value="key1" />
              <Item label="Monthly" value="key2" />
            </Picker>
            
            <Item floatingLabel>
              <Label>Notes</Label>
              <Input />
            </Item>
          </Form>
        </Content>
    );
  }
}
