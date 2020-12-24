import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label } from 'native-base';
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
    marginTop: 10,
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
    margin: 50,
  },
});

export default function InvoiceDetailScreen({ navigation, route }) {
  const { item, index } = route.params;
  const [description, setDescription] = useState(item?.description ?? '');
  const [receivedDesc, setReceivedDesc] = useState(item ? true : false);
  const [receivedUc, setReceivedUc] = useState(item ? true : false);

  const [unitCost, setUnitCost] = useState(item?.unitCost ?? '');
  const [qty, setQty] = useState(item?.qty ?? '');
  const [subTotal, setSubtotal] = useState(item?.subTotal ?? 0);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const done = () => {
    const isValid = Boolean(description && Number.parseFloat(unitCost) && Number.parseFloat(qty));
    if (!isValid) {
      if (!(receivedDesc && receivedUc)) {
        setReceivedDesc(true);
        setReceivedUc(true);
      } else if (!qty) {
        setQty('0');
      }
    }
    const cost = Number.parseFloat(unitCost).toFixed(2);

    const invoiceDetailItem = {
      description,
      unitCost: cost,
      qty,
      subTotal,
    };
    if (isValid) {
      if (item) {
        invoiceDetailItem.index = index;
        route.params.editDetails(invoiceDetailItem);
      } else {
        route.params.addDetails(invoiceDetailItem);
      }
      navigation.goBack();
    }
  };

  useEffect(() => {
    const formatted = unitCost * qty;
    const price = formatted.toFixed(2);
    if (unitCost) {
      setSubtotal(price);
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
            <Input
              placeholder="Description"
              placeholderTextColor={Colors.lightGrey}
              onChangeText={setDescription}
              maxLength={60}
              value={description}
              onBlur={setReceivedDesc}
            />
          </Item>
          {!description && receivedDesc && (
            <Text style={{ color: Colors.red, fontSize: 12, paddingStart: 10 }}>Description is required</Text>
          )}

          <Item inlineLabel>
            <Label>Unit Cost:</Label>
            <Input
              placeholder="£0.00"
              placeholderTextColor={Colors.lightGrey}
              onChangeText={setUnitCost}
              value={unitCost}
              keyboardType="numeric"
              onBlur={setReceivedUc}
            />
          </Item>
          {(!unitCost || Number.parseFloat(unitCost) <= 0) && receivedUc && (
            <Text style={{ color: Colors.red, fontSize: 12, paddingStart: 10 }}>Unit Cost is required</Text>
          )}
          <Item inlineLabel>
            <Label>Quantity:</Label>
            <Input placeholder="0" placeholderTextColor={Colors.lightGrey} onChangeText={setQty} value={qty} keyboardType="decimal-pad" />
          </Item>
          {Number.parseFloat(qty) <= 0 && (
            <Text style={{ color: Colors.red, fontSize: 12, paddingStart: 10 }}>Quantity must be a valid number</Text>
          )}
        </Form>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>Total:</Text>
          <Text style={styles.textFooter}>{`£${subTotal}`}</Text>
        </View>
        {/* <View style={styles.row}>
          <Text style={styles.textSwitch}>Save Item: </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#00a09da4' }}
            thumbColor={isEnabled ? '#00a09d' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View> */}
        <View style={styles.button}>
          <FormButton title="Done" onPress={done} />
        </View>
      </ScrollView>
    </Container>
  );
}
