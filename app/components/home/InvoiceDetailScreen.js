import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { windowWidth } from '../../utilities/Dimensions';
import { Container, Form, Item, Input, Label, Separator } from 'native-base';
import FormButton from '../global/FormButton';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../styles/Colors';

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
});

const placeholderColor = '#c8c8c8';

export default function InvoiceDetailScreen({ navigation, route, footer }) {
  // console.log('nav', route.params);
  const [description, setDescription] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [qty, setQty] = useState(1);
  const [subtotal, setSubtotal] = useState(0);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const done = () => {
    const invoiceDetailItem = {
      description,
      unitCost,
      qty,
    };
    navigation.navigate('Add Invoice', { invoiceDetailItem: invoiceDetailItem });
  };
  const isValid = () => {
    return description && unitCost && qty;
  };

  useEffect(() => {
    if (unitCost) {
      setSubtotal(unitCost * qty);
    } else {
      setSubtotal('0.00');
    }
  }, [unitCost, qty]);

  return (
    <Container style={styles.container}>
      <ScrollView>
        <View style={{ backgroundColor: Colors.smokeGrey, padding: 10 }}>
          <Text>Individual Item </Text>
        </View>
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
            <Input
              placeholder="1"
              placeholderTextColor={placeholderColor}
              onChangeText={(e) => (e > 0 ? setQty(e) : setQty(1))}
              value={qty}
              keyboardType="number-pad"
            />
          </Item>
        </Form>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>SubTotal:</Text>
          <Text style={styles.textFooter}>{`£${subtotal || '0.00'}`}</Text>
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
        <View style={styles.button}>
          <FormButton title="Done" onPress={done} disabled={!isValid} />
        </View>
      </ScrollView>
    </Container>
  );
}
