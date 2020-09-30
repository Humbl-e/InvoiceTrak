import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { windowWidth } from '../../utilities/Dimensions';
import { Container, Form, Item, Input, Label, Separator } from 'native-base';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  footer: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 35,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  textFooter: {
    fontSize: 18,
    color: 'white',
  },
  textSwitch: {
    fontSize: 18,
    color: 'black',
  },
});

const placeholderColor = '#c8c8c8';

export default function ItemScreen({ navigation, route }) {
  // console.log('nav', route.params);
  const [description, setDescription] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [qty, setQty] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // const isValid = Boolean(description && unitCost && qty);
  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       if (isValid) {
  //         // If we don't have unsaved changes, then we don't need to do anything
  //         return;
  //       }
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();
  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         'Discard changes?',
  //         'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //         [
  //           { text: "Don't leave", style: 'cancel', onPress: () => {} },
  //           {
  //             text: 'Discard',
  //             style: 'destructive',
  //             onPress: () => navigation.dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   [navigation, isValid]
  // );

  return (
    <Container style={styles.container}>
      <Separator style={{ flex: 0.05 }}>
        <Text>Individual Item </Text>
      </Separator>
      <Form>
        <Item inlineLabel>
          <Label>Description:</Label>
          <Input placeholder="Description" placeholderTextColor={placeholderColor} onChangeText={setDescription} value={description} />
        </Item>
        <Item inlineLabel>
          <Label>Unit Cost:</Label>
          <Input
            placeholder="£0.00"
            placeholderTextColor={placeholderColor}
            onChangeText={setUnitCost}
            value={unitCost}
            keyboardType="numeric"
          />
        </Item>
        <Item inlineLabel last>
          <Label>Quantity:</Label>
          <Input placeholder="1" placeholderTextColor={placeholderColor} onChangeText={setQty} value={qty} keyboardType="number-pad" />
        </Item>
      </Form>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>Total:</Text>
        <Text style={styles.textFooter}>£52.50</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textSwitch}>Save Item: </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#00a09da4' }}
          thumbColor={isEnabled ? '#00a09d' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </Container>
  );
}
